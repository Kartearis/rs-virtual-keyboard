
import createState from "./reactive-state.js";

export default class VirtualKeyboard {
    element = null;
    state = null;

    constructor(element, lang = 'en') {
        let lang_ = lang;
        if (lang === 'load') {
            // Load lang from storage
        }
        else lang_ = lang;
        this.state = createState({
            'language': lang_
        },
        {});

    }
}