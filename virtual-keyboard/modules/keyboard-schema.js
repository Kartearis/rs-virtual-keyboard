/**
 * Keyboard layout config
 */

const schema = {
    keys: [
        key('Backquote', 'ё', 'Ё', '`', '~'),
        key('Digit1', '1', '!', '1', '!'),
        key('Digit2', '2', '\"', '2', '@'),
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
        key('Backspace', 'Backspace', '', 'Backspace', '', ['key--double']),

        key('Tab', 'Tab', '', 'Tab', ''),
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
        key('Delete', 'Del', '', 'Del', ''),

        key('CapsLock', 'CapsLock', '', 'CapsLock', '', ['key--double']),
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
        key('Enter', 'Enter', '', 'Enter', '', ['key--double']),

        key('ShiftLeft', 'Shift', '', 'Shift', '', ['key--double']),
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
        key('ArrowUp', '↑', '', '↑', ''),
        key('ShiftRight', 'Shift', '', 'Shift', '', ['key--double']),

        key('ControlLeft', 'Ctrl', '', 'Ctrl', ''),
        key('MetaLeft', '⊞', '', '⊞', ''),
        key('AltLeft', 'Alt', '', 'Alt', ''),
        key('Space', '', '', '', '', ['key--space']),
        key('AltRight', 'Alt', '', 'Alt', ''),
        key('ControlRight', 'Ctrl', '', 'Ctrl', ''),
        key('ArrowLeft', '←', '', '←', ''),
        key('ArrowDown', '↓', '', '↓', ''),
        key('ArrowRight', '→', '', '→', ''),
    ]
};

function key(id, ru, ruUp, en, enUp, classList = undefined, special = undefined) {
    return {
        id: id,
        text: {
            ru: [ru, ruUp],
            en: [en, enUp]
        },
        special: special,
        classList: classList
    };
}

export default schema;