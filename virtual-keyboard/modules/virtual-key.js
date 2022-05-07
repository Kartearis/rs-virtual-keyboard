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
    this.#drawText();
  }

  #drawText() {
    this.element.innerHTML = this.config.text[this.state.language];
  }
}
