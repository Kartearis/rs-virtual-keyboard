import VirtualKeyboard from "./modules/virtual-keyboard.js";
import Textarea from "./modules/textarea.js";

window.addEventListener('DOMContentLoaded', () => {
    const textarea = new Textarea(document.body);
    const keyBoard = new VirtualKeyboard(document.body, 'en', textarea);
});