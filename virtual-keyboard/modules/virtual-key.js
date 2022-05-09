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
        locked: false,
        language: lang,
      },
      {
        pressed: (value) => this.#onPressedChange(value),
        language: () => this.#drawText(),
      },
    );
    this.#setUpKey();
    this.#drawText();
  }

  changeLanguage(language) {
    this.state.language = language;
  }

  togglePress(newValue = undefined) {
    if (newValue !== undefined) this.state.pressed = newValue;
    else this.state.pressed = !this.state.pressed;
  }

  getValueToPrint(state) {
    if (this.config.special && this.config.special.replace) return this.config.special.replace;
    if (state.shift || state.capslock) return this.config.text[this.state.language][1];
    return this.config.text[this.state.language][0];
  }

  registerHandlers(handlers) {
    this.element.addEventListener('mousedown', handlers.mouseDown);
    this.element.addEventListener('mouseup', handlers.mouseUp);
    this.element.addEventListener('mouseout', handlers.mouseOut);
  }

  #setUpKey() {
    if (this.config.special?.toggle !== undefined) {
      this.config.text.keys().forEach((lang) => {
        this.config.text[lang][1] = '<div class="key__indicator"></div>';
      });
    }
    if (this.config.classList) {
      this.config.classList.forEach((c) => this.element.classList.add(c));
    }
  }

  #drawText() {
    const innerMarkup = `
        <div class="key__up">${this.config.text[this.state.language][1]}</div>
        <div class="key__down">${this.config.text[this.state.language][0]}</div>
    `;
    this.element.innerHTML = innerMarkup;
  }

  #onPressedChange(value) {
    if (value) this.element.classList.add('key--pressed');
    else this.element.classList.remove('key--pressed');
  }

  toggleIndicator(value) {
    this.element.querySelector('.key__indicator')?.classList[value ? 'add' : 'remove']('active');
  }
}
