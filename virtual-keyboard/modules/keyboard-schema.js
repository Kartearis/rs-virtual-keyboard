/**
 * Keyboard layout config
 *
 * Each key has an id (event.code) and up to 4 values (displayed on key): l1 lower, l1 upper,
 * l2 lower, l2 upper.
 * Optionally key may have additional css class and/or special meaning.
 * Special is an object with possible fields:
 * - replace => value of this key is always this
 * - action => this key calls this action on target element
 * - state => this key sets this state to true on keydown and false on keyup
 * - toggle => this key sets this state to true on first press and false on second.
 * Keys with toggle will ignore upper
 * values and display indicator instead
 */
function key(id, ru, ruUp, en, enUp, classList = undefined, special = undefined) {
  return {
    id,
    text: {
      ru: [ru, ruUp],
      en: [en, enUp],
    },
    special,
    classList,
  };
}

const schema = {
  languages: ['ru', 'en'],
  keys: [
    key('Backquote', 'ё', 'Ё', '`', '~'),
    key('Digit1', '1', '!', '1', '!'),
    key('Digit2', '2', '"', '2', '@'),
    key('Digit3', '3', '№', '3', '#'),
    key('Digit4', '4', ';', '4', '$'),
    key('Digit5', '5', '%', '5', '%'),
    key('Digit6', '6', ':', '6', '^'),
    key('Digit7', '7', '?', '7', '&'),
    key('Digit8', '8', '*', '8', '*'),
    key('Digit9', '9', '(', '9', '('),
    key('Digit0', '0', ')', '0', ')'),
    key('Minus', '-', '_', '-', '_'),
    key('Equal', '=', '+', '=', '+'),
    key('Backspace', 'Backspace', '', 'Backspace', '', ['key--double'], { action: 'backspace' }),

    key('Tab', 'Tab', '', 'Tab', '', undefined, { replace: '\t' }),
    key('KeyQ', 'й', 'Й', 'q', 'Q'),
    key('KeyW', 'ц', 'Ц', 'w', 'W'),
    key('KeyE', 'у', 'У', 'e', 'E'),
    key('KeyR', 'к', 'К', 'r', 'R'),
    key('KeyT', 'е', 'Е', 't', 'T'),
    key('KeyY', 'н', 'Н', 'y', 'Y'),
    key('KeyU', 'г', 'Г', 'u', 'U'),
    key('KeyI', 'ш', 'Ш', 'i', 'I'),
    key('KeyO', 'щ', 'Щ', 'o', 'O'),
    key('KeyP', 'з', 'З', 'p', 'P'),
    key('BracketLeft', 'х', 'Х', '[', '{'),
    key('BracketRight', 'ъ', 'Ъ', ']', '}'),
    key('Backslash', '\\', '/', '\\', '|'),
    key('Delete', 'Del', '', 'Del', '', undefined, { action: 'delete' }),

    key('CapsLock', 'CapsLock', '', 'CapsLock', '', ['key--double'], { toggle: 'capslock' }),
    key('KeyA', 'ф', 'Ф', 'a', 'A'),
    key('KeyS', 'ы', 'Ы', 's', 'S'),
    key('KeyD', 'в', 'В', 'd', 'D'),
    key('KeyF', 'а', 'А', 'f', 'F'),
    key('KeyG', 'п', 'П', 'g', 'G'),
    key('KeyH', 'р', 'Р', 'h', 'H'),
    key('KeyJ', 'о', 'О', 'j', 'J'),
    key('KeyK', 'л', 'Л', 'k', 'K'),
    key('KeyL', 'д', 'Д', 'l', 'L'),
    key('Semicolon', 'ж', 'Ж', ';', ':'),
    key('Quote', 'э', 'Э', '\'', '"'),
    key('Enter', 'Enter', '', 'Enter', '', ['key--double'], { replace: '\n' }),

    key('ShiftLeft', 'Shift', '', 'Shift', '', ['key--double'], { state: 'shift', clicklock: true }),
    key('KeyZ', 'я', 'Я', 'z', 'Z'),
    key('KeyX', 'ч', 'Ч', 'x', 'X'),
    key('KeyC', 'с', 'С', 'c', 'C'),
    key('KeyV', 'м', 'М', 'v', 'V'),
    key('KeyB', 'и', 'И', 'b', 'B'),
    key('KeyN', 'т', 'Т', 'n', 'N'),
    key('KeyM', 'ь', 'Ь', 'm', 'M'),
    key('Comma', 'б', 'Б', ',', '<'),
    key('Period', 'ю', 'Ю', '.', '>'),
    key('Slash', '.', ',', '/', '?'),
    key('ArrowUp', '↑', '', '↑', '', undefined, { action: 'nav_up' }),
    key('ShiftRight', 'Shift', '', 'Shift', '', ['key--double'], { state: 'shift', clicklock: true }),

    key('ControlLeft', 'Ctrl', '', 'Ctrl', '', undefined, { state: 'control' }),
    key('MetaLeft', '⊞', '', '⊞', '', undefined, { state: 'meta' }),
    key('AltLeft', 'Alt', '', 'Alt', '', undefined, { state: 'alt' }),
    key('Space', '', '', '', '', ['key--space'], { replace: ' ' }),
    key('AltRight', 'Alt', '', 'Alt', '', undefined, { state: 'alt' }),
    key('ControlRight', 'Ctrl', '', 'Ctrl', '', undefined, { state: 'control' }),
    key('ArrowLeft', '←', '', '←', '', undefined, { action: 'nav_left' }),
    key('ArrowDown', '↓', '', '↓', '', undefined, { action: 'nav_down' }),
    key('ArrowRight', '→', '', '→', '', undefined, { action: 'nav_right' }),
  ],
};

export default schema;
