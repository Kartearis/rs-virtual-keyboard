

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
        // this.#makeCustomReadonly();
        this.#addCursor();
        this.element.appendChild(this.textarea);
    }

    #addCursor() {
        this.textarea.value += '|';
    }

    #removeCursor() {
        this.textarea.value = this.textarea.value.slice(0, -1);
    }

    // #makeCustomReadonly() {
    //     this.textarea.addEventHandler('keydown', (e) => {
    //         e.preventDefault();
    //     });
    // }

    addText(text) {
        this.#removeCursor();
        this.textarea.value += text;
        this.#addCursor();
    }

    backspace() {
        if (this.textarea.value.length > 0)
            this.textarea.value = this.textarea.value.slice(0, -1);
    }

    delete() {

    }

    nav_left() {
        let currentPosition = this.textarea.selectionStart;
        console.log(currentPosition);
        if (currentPosition > 0)
            this.textarea.setSelectionRange(currentPosition - 1, currentPosition - 1);
    }
}