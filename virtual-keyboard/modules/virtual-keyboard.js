
import createState from "./reactive-state.js";
import schema from "./keyboard-schema.js";
import VirtualKey from "./virtual-key.js";

export default class VirtualKeyboard {
    element = null;
    state = null;
    schema = schema;
    keys = null;
    container = null;

    constructor(element, lang = 'en') {
        this.element = element;
        let lang_ = lang;
        if (lang === 'load') {
            // Load lang from storage
        }
        else lang_ = lang;
        this.state = createState({
            'language': lang_
        },
        {});
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
    }

    #onKeyUp(event) {
        let code = event.code;
        let key = this.keys.find(k => k.config.id === code);
        if (!key) return;
        event.preventDefault();
        event.stopPropagation();
        key.togglePress(false);
    }
}