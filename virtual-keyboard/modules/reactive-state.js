/**
 * Creates a proxy object which will call handlers based on data change.
 *
 * @param object Reference to object which should become reactive
 * @param handlers Reference to object with handlers (may be changed freely later). Keys are properynames of object,
 * values - handlers or arrays of handlers. Handler will get new value on call.
 */
function createState(object, handlers) {
    return new Proxy(object, {
        set: (target, property, value) => {
            target[property] = value;
            if (handlers[property] !== undefined)
                if (Array.isArray(handlers[property]))
                    handlers[property].forEach(h => h(value));
                else handlers[property](value);
            return true;
        }
    });
}

export default createState;