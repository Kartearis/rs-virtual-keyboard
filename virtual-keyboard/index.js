import VirtualKeyboard from "./modules/virtual-keyboard.js";

window.addEventListener('DOMContentLoaded', () => {
    const keyBoard = new VirtualKeyboard(document.body, 'en');
});