

export default class Textarea {
    element = null;
    textarea = null;

    constructor(element) {
        this.element = element;
        this.#create();
    }

    #create() {
        this.textarea = document.createElement('textarea');
        this.textarea.classList.add('textarea');
        this.textarea.readOnly = true;
        this.element.appendChild(this.textarea);
    }
}