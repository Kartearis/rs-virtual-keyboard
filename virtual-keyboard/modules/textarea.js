

export default class Textarea {
    element = null;
    textarea = null;
    currentPosition = 0;

    constructor(element) {
        this.element = element;
        this.#create();
    }

    #create() {
        this.textarea = document.createElement('textarea');
        this.textarea.classList.add('textarea');
        this.textarea.readOnly = true;
        this.currentPosition = 0;
        this.#addCursor();
        this.element.appendChild(this.textarea);
    }

    #insertToTextarea(index, value) {
        this.textarea.value = this.textarea.value.slice(0, index) + value + this.textarea.value.slice(index);
    }

    #removeFromTextarea(index) {
        this.textarea.value = this.textarea.value.slice(0, index - 1) + this.textarea.value.slice(index);
    }

    #addCursor() {
        this.#insertToTextarea(this.currentPosition, '╎');
    }

    #removeCursor() {
        this.textarea.value = this.textarea.value.slice(0, this.currentPosition) + this.textarea.value.slice(this.currentPosition+1);
    }

    addText(text) {
        this.#removeCursor();
        this.#insertToTextarea(this.currentPosition, text);
        this.currentPosition += text.length;
        this.#addCursor();
    }

    backspace() {
        if (this.currentPosition > 0)
        {
            this.#removeCursor();
            this.#removeFromTextarea(this.currentPosition);
            this.currentPosition--;
            this.#addCursor();
        }
    }

    delete() {
        if (this.currentPosition < this.textarea.value.length - 1)
        {
            this.#removeCursor();
            this.#removeFromTextarea(this.currentPosition + 1);
            this.#addCursor();
        }
    }

    nav_left() {
        if (this.currentPosition > 0)
        {
            this.#removeCursor();
            this.currentPosition--;
            this.#addCursor();
        }
    }

    nav_right() {
        if (this.currentPosition < this.textarea.value.length - 1)
        {
            this.#removeCursor();
            this.currentPosition++;
            this.#addCursor();
        }
    }
    // All row related methods could be optimized by storing cache of row-start positions
    #getCurrentCol() {
        let colNum = 0;
        for (let i = 0; i < this.currentPosition; i++) {
            if (this.textarea.value[i] === '\n')
                colNum = 0;
            else colNum++;
        }
        return colNum;
    }

    #getCurrentRow() {
        return (this.textarea.value.slice(0, this.currentPosition).match(/\n/g) || []).length;
    }

    #getNumRows() {
        return (this.textarea.value.match(/\n/g) || []).length + 1;
    }

    #calculatePosition(row, column) {
        let currentRow = 0;
        let rowPosition = 0;
        let length = this.textarea.value.length;
        for (let i = 0; i < length && currentRow < row; i++)
            if (this.textarea.value[i] === '\n')
            {
                currentRow++;
                rowPosition = i + 1;
            }
        let colPosition = rowPosition;
        for (let i = 0; i < column && rowPosition + i < length; i++)
            if (this.textarea.value[rowPosition + i] !== '\n') colPosition++;
            else break;
        if (colPosition >= length) return length;
        return colPosition;
    }

    nav_up() {
        let row = this.#getCurrentRow();
        if (row > 0)
        {
            this.#removeCursor();
            let col = this.#getCurrentCol();
            this.currentPosition = this.#calculatePosition(row - 1, col);
            this.#addCursor();
        }
    }

    nav_down() {
        let row = this.#getCurrentRow();
        if (row < this.#getNumRows() - 1)
        {
            this.#removeCursor();
            let col = this.#getCurrentCol();
            this.currentPosition = this.#calculatePosition(row + 1, col);
            this.#addCursor();
        }
    }
}