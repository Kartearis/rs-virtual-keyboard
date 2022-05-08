import createState from './reactive-state.js';

export default class VirtualKey {
  element = null;

  config = null;

  state = null;

  constructor(element, config, lang = 'en') {
    this.element = element;
    this.config = config;
    this.state = createState(
      {
        pressed: false,
        language: lang,
      },
      {
        language: () => this.#drawText(),
      },
    );
    this.#setUpKey();
    this.#drawText();
  }

  #setUpKey() {
    if (this.config.classList) {
      this.config.classList.forEach(c => this.element.classList.add(c));
    }
  }

  #drawText() {
    let innerMarkup = `
        <div class="key__up">${this.config.text[this.state.language][1]}</div>
        <div class="key__down">${this.config.text[this.state.language][0]}</div>
    `;
    this.element.innerHTML = innerMarkup;
  }
}
