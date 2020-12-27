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
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
      }
      .actions {
        position: absolute;
        width: 100vw;
        display: flex;
        justify-content: space-between;
        top: 50%;
        transform: translateY(-50%);
      }
      .arrow {
        background: #ddd;
        border-radius: 50%;
        padding: 6px 12px;
        border: none;
        cursor: pointer;
      }
      .prev {
        margin-left: 20px;
      }
      .next {
        margin-right: 20px;
      }
      ::slotted(.slide) {
        display: none;
      }
      ::slotted(.slide.showing) {
        display: block;
      }
    `;
  }

  static get properties() {
    return {
      showButtons: { type: Boolean },
      circularButtons: { type: Boolean },
    };
  }

  constructor() {
    super();
    // init
    this._slidePosition = 0;
    this._totalSlides;

    // default config
    this.showButtons = true;
    this.circularButtons = true;

    // config attr
    if (this.hasAttribute('hideButtons')) {
      this.showButtons = false;
    }
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

  changeSlidePosition(e) {
    if (e.target.classList.contains('next')) {
      // next slide
      this._slidePosition === this._totalSlides - 1
        ? (this._slidePosition = 0)
        : (this._slidePosition += 1);
    } else {
      // prev slide
      this._slidePosition === 0
        ? (this._slidePosition = this._totalSlides - 1)
        : (this._slidePosition -= 1);
    }
    this.updateNewSlide();
  }

  updateNewSlide() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(ele => {
      if (ele.classList.contains('showing')) ele.classList.remove('showing');
    });

    slides[this._slidePosition].classList.add('showing');
  }

  render() {
    return html`
      <section class="carousel">
        <slot @slotchange="${this.handleSlotChange}"
          >Promotion Message Fallback</slot
        >
        ${this.showButtons
          ? html`
              <div class="actions">
                <button
                  @click="${this.changeSlidePosition}"
                  aria-label="Previous Slide"
                  class="prev arrow"
                >
                  &#10094;
                </button>
                <button
                  @click="${this.changeSlidePosition}"
                  aria-label="Next Slide"
                  class="next arrow"
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
