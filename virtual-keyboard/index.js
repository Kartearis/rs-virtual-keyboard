import VirtualKeyboard from './modules/virtual-keyboard.js';
import Textarea from './modules/textarea.js';
import Tip from './modules/Tip.js';

/* eslint-disable no-console */
console.log(`
Локально отключены следующие правила:
- no-unused-vars в index.js, так как отдельные компоненты реализованы в виде классов и подразумевается 
возможность использования объектов в процессе работы приложения.
- no-param-reassign в reactive-state.js, так как без нарушения этого правила не может быть реализован прокси-объект.
- no-console для вывода этого сообщения.

На уровне проекта:
- import/extensions: проект собран на нативных модулях без использованя сборщика. 
В этом случае расширение должно быть указано по спецификации. На Chrome можно было бы использовать
importmap, но такое решение привело бы к неработоспособности приложения в Firefox, например.

CapsLock на macOS переключается не нажатием, а двумя нажатиями (особенность системы).
Для переключения языка мышкой нужно кликнуть любой shift (он останется нажат), после чего alt.
Аналогично используется shift и для других целей.
`);

window.addEventListener('DOMContentLoaded', () => {
  const textarea = new Textarea(document.body);
  /* eslint-disable no-unused-vars */
  const tip = new Tip(document.body, `This is Windows qwerty keyboard.
    <br>To switch language press SHIFT+ALT.
    <br>On mac CapsLock is toggled by pressing physical button twice (virtual button works normally)`);
  /* eslint-disable no-unused-vars */
  const keyBoard = new VirtualKeyboard(document.body, 'load', textarea);
});
