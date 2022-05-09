
import createState from "./reactive-state.js";
import schema from "./keyboard-schema.js";
import VirtualKey from "./virtual-key.js";
import Storage from "./storage.js";

export default class VirtualKeyboard {
    element = null;
    target = null;
    state = null;
    schema = schema;
    keys = null;
    container = null;
    lockedKeys = null;
    langStorage = null;

    constructor(element, lang = 'en', targetElement) {
        this.element = element;
        this.target = targetElement;
        this.langStorage = new Storage('language');
        this.lockedKeys = [];
        let lang_ = lang;
        if (lang === 'load') {
            let l = this.langStorage.read();
            if (l)
                lang_ = l;
            else {
                lang_ = 'en';
                this.langStorage.write(lang_);
            }
        }
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
            language: [(value) => this.#changeLangOnAllKeys(value), (value) => this.langStorage.write(value)],
            capslock: (value) => this.keys.find(x => x.config.special?.toggle === 'capslock')?.toggleIndicator(value)
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
        this.keys.forEach(key => {
            key.registerHandlers({
                mouseDown: (event) => this.#onMouseDown(event, key),
                mouseUp: (event) => this.#onMouseUp(event, key),
                mouseOut: (event) => this.#onMouseUp(event, key)
            });
        });
    }

    // Locked key remains pressed until any other key is pressed or it is pressed again
    #lockKey(key) {
        if (this.lockedKeys.includes(key)) {
            this.#unlockKeys();
            return;
        }
        key.togglePress(true);
        this.lockedKeys.push(key);
        if (key.config.special && key.config.special.state)
            this.state[key.config.special.state] = true;
    }

    #unlockKeys() {
        if (this.lockedKeys.length === 0) return;
        for (let key of this.lockedKeys) {
            key.togglePress(false);
            if (key.config.special && key.config.special.state)
                this.state[key.config.special.state] = false;
        }
        this.lockedKeys = [];
    }

    #onMouseDown(event, key) {
        this.#generalKeyDown(key);
        // Lock the key on click if required AFTER click is processed
        if (key.config.special && key.config.special.clicklock === true)
            this.#lockKey(key);
    }

    #onMouseUp(event, key) {
        if (key.state.pressed)
            this.#generalKeyUp(key);
    }

    #onKeyDown(event) {
        let code = event.code;
        let key = this.keys.find(k => k.config.id === code);
        if (!key) return;
        event.preventDefault();
        event.stopPropagation();
        this.#generalKeyDown(key);
    }

    #generalKeyDown(key) {
        key.togglePress(true);
        if (key.config.special && key.config.special.state)
            this.state[key.config.special.state] = true;
        else if (key.config.special && key.config.special.action)
            this.target[key.config.special.action]();
        else if (!(key.config.special && key.config.special.toggle))
            this.target.addText(key.getValueToPrint(this.state));
        // Any key press unlocks keys, but AFTER the press is processed
        this.#unlockKeys();
    }

    #generalKeyUp(key) {
        // If the key is locked it is not released on up
        if (!this.lockedKeys.includes(key)){
            if (key.config.special && key.config.special.state)
                this.state[key.config.special.state] = false;
            key.togglePress(false);
        }
        if (key.config.special && key.config.special.toggle)
            this.state[key.config.special.toggle] = !this.state[key.config.special.toggle];
    }

    #onKeyUp(event) {
        let code = event.code;
        let key = this.keys.find(k => k.config.id === code);
        if (!key) return;
        event.preventDefault();
        event.stopPropagation();
        this.#generalKeyUp(key);
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