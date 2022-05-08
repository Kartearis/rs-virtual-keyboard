
import createState from "./reactive-state.js";
import schema from "./keyboard-schema.js";
import VirtualKey from "./virtual-key.js";

export default class VirtualKeyboard {
    element = null;
    target = null;
    state = null;
    schema = schema;
    keys = null;
    container = null;

    constructor(element, lang = 'en', targetElement) {
        this.element = element;
        this.target = targetElement;
        let lang_ = lang;
        if (lang === 'load') {
            // Load lang from storage
        }
        else lang_ = lang;
        this.state = createState({
            'language': lang_,
            'shift': false,
            'capslock': false,
            'control': false,
            'alt': false
        },
        {
            shift: () => this.#checkLangChange(),
            alt: () => this.#checkLangChange(),
            language: (value) => this.#changeLangOnAllKeys(value),
        });
        this.#createKeys();
        this.registerHandlers();
    }

    #createKeys() {
        this.keys = [];
        let keyboardContainerMarkup = '<div class="keyboard"></div>';
        this.element.insertAdjacentHTML('beforeend', keyboardContainerMarkup);
        this.container = this.element.querySelector('.keyboard');
        for (let keyData of this.schema.keys)
        {
            let button = document.createElement('button');
            button.type = 'button';
            button.classList.add('key');
            this.container.appendChild(button);
            this.keys.push(new VirtualKey(button, keyData, this.state.language));
        }
    }

    registerHandlers() {
        document.addEventListener('keydown', (event) => this.#onKeyDown(event));
        document.addEventListener('keyup', (event) => this.#onKeyUp(event));
    }

    #onKeyDown(event) {
        let code = event.code;
        let key = this.keys.find(k => k.config.id === code);
        if (!key) return;
        event.preventDefault();
        event.stopPropagation();
        key.togglePress(true);
        if (key.config.special && key.config.special.state)
            this.state[key.config.special.state] = true;
        else if (key.config.special && key.config.special.action)
            this.target[key.config.special.action]();
        else if (!(key.config.special && key.config.special.toggle))
            this.target.addText(key.getValueToPrint(this.state));
    }

    #onKeyUp(event) {
        let code = event.code;
        let key = this.keys.find(k => k.config.id === code);
        if (!key) return;
        event.preventDefault();
        event.stopPropagation();
        key.togglePress(false);
        if (key.config.special && key.config.special.state)
            this.state[key.config.special.state] = false;
        if (key.config.special && key.config.special.toggle)
            this.state[key.config.special.toggle] = !this.state[key.config.special.toggle];
    }

    #checkLangChange() {
        if (this.state.shift && this.state.alt) {
            let currentId = this.schema.languages.indexOf(this.state.language);
            currentId = (currentId + 1) % this.schema.languages.length;
            this.state.language = this.schema.languages[currentId];
        }
    }

    #changeLangOnAllKeys(value) {
        this.keys.forEach(key => key.changeLanguage(value));
    }
}