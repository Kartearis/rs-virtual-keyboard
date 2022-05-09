import VirtualKeyboard from './modules/virtual-keyboard.js';
import Textarea from './modules/textarea.js';
import Tip from './modules/Tip.js';

window.addEventListener('DOMContentLoaded', () => {
  const textarea = new Textarea(document.body);
  /* eslint-disable no-unused-vars */
  const tip = new Tip(document.body, 'This is Windows qwerty keyboard.<br>To switch language press SHIFT+ALT.');
  /* eslint-disable no-unused-vars */
  const keyBoard = new VirtualKeyboard(document.body, 'load', textarea);
});
