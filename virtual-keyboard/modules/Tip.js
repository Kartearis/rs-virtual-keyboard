

export default class Tip{
    element = null;
    text = "";

    constructor(element, text) {
        this.element = element;
        this.text = text;
        this.#create();
    }

    #create() {
        let tip = document.createElement('div');
        tip.classList.add('tip');
        tip.innerHTML = this.text;
        this.element.appendChild(tip);
    }
}