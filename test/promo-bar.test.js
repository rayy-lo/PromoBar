import { html, fixture, expect } from '@open-wc/testing';

import '../promo-bar.js';

describe('PromoBar', () => {
  it('assigns the totalSlides variable equal to number of children elements', async () => {
    const el = await fixture(html`
      <promo-bar>
        <span>First Promo Message</span>
        <span>Second Promo Message</span>
      </promo-bar>
    `);

    expect(el._totalSlides).to.equal(2);
  });

  it('hideButtons attribute on component does not render arrow buttons', async () => {
    const el = await fixture(html`
      <promo-bar hideButtons>
        <span>Test Slot</span>
      </promo-bar>
    `);

    expect(el.showButtons).to.equal(false);
    expect(el.shadowRoot.querySelectorAll('.arrow')).not.to.exist;
  });

  it('autoCycleOff attribute on component turns off auto slide change', async () => {
    const el = await fixture(html`
      <promo-bar autoCycleOff>
        <span>Test Slot</span>
      </promo-bar>
    `);

    expect(el.autoCycle).to.equal(false);
    // setInterval should not be invoked, thus _intervalId should not exist
    expect(el._intervalId).to.equal(undefined);
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html` <promo-bar></promo-bar> `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
