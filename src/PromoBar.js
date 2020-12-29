import { html, css, LitElement } from 'lit-element';

export class PromoBar extends LitElement {
  static get styles() {
    return css`
      :host {
        overflow: hidden;
        display: block;
        color: var(--text-color, white);
        background-color: var(--bg-color, #232323);
        font-family: var(--font, Arial, Roboto, sans-serif);
      }
      .carousel {
        position: relative;
        height: var(--promo-bar-height, 60px);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
      }
      .actions {
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: space-between;
        top: 50%;
        transform: translateY(-50%);
      }
      .arrow {
        background: transparent;
        border-radius: 50%;
        padding: 6px 12px;
        border: none;
        cursor: pointer;
        color: var(--arrow-color, white);
        font-size: 1.5rem;
      }
      .prev {
        margin-left: 20px;
        animation: slideArrowLeft 0.5s ease-in infinite alternate;
      }
      .next {
        margin-right: 20px;
        animation: slideArrowRight 0.5s ease-in infinite alternate;
      }
      ::slotted(.slide) {
        position: absolute;
        transition: all 0.5s ease;
        opacity: 0;
      }
      ::slotted(.slide.showing) {
        opacity: 1;
      }

      @keyframes slideArrowRight {
        from {
          transform: translateX(0);
        }

        to {
          transform: translateX(5px);
        }
      }

      @keyframes slideArrowLeft {
        from {
          transform: translateX(0);
        }

        to {
          transform: translateX(-5px);
        }
      }
    `;
  }

  static get properties() {
    return {
      showButtons: { type: Boolean },
    };
  }

  constructor() {
    super();
    // init
    this._slidePosition = 0;
    this._totalSlides;
    this._intervalId;

    console.log(this);

    // default config
    this.showButtons = true;
    this.autoCycle = true;

    // config attr
    if (this.hasAttribute('hideButtons')) {
      this.showButtons = false;
    }

    if (this.hasAttribute('autoCycleOff')) {
      this.autoCycle = false;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    const that = this;
    if (this.autoCycle) {
      this._intervalId = setInterval(function () {
        that.changeSlidePosition({}, 'next');
      }, 3000);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._intervalId);
  }

  handleSlotChange(e) {
    const { target } = e;
    const assignedElements = target.assignedElements();
    // total slides = length of slot children
    this._totalSlides = assignedElements.length;

    assignedElements.forEach((ele, index) => {
      if (index === 0) {
        ele.classList.add('showing');
      }
      ele.classList.add('slide');
    });
  }

  changeSlidePosition(e, direction) {
    //invoked from button click
    if (e.target) direction = e.target.getAttribute('data-direction');

    if (direction === 'next') {
      // next button clicked, increase slide position else set to 0 to restart
      this._slidePosition === this._totalSlides - 1
        ? (this._slidePosition = 0)
        : (this._slidePosition += 1);
    } else {
      this._slidePosition === 0
        ? (this._slidePosition = this._totalSlides - 1)
        : (this._slidePosition -= 1);
    }
    this.updateNewSlide();
  }

  updateNewSlide() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(ele => {
      if (ele.classList.contains('showing')) {
        ele.classList.remove('showing');
      }
    });

    slides[this._slidePosition].classList.add('showing');
  }

  render() {
    return html`
      <section class="carousel">
        <slot @slotchange="${this.handleSlotChange}"
          >No slot elements assigned</slot
        >
        ${this.showButtons
          ? html`
              <div class="actions">
                <button
                  @click="${this.changeSlidePosition}"
                  aria-label="Previous Slide"
                  class="prev arrow"
                  data-direction="prev"
                >
                  &#10094;
                </button>
                <button
                  @click="${this.changeSlidePosition}"
                  aria-label="Next Slide"
                  class="next arrow"
                  data-direction="next"
                >
                  &#10095;
                </button>
              </div>
            `
          : ''}
      </section>
    `;
  }
}
