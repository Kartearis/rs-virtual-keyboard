

export default class Storage {
    storage = window.localStorage;
    label = "020498bc-0a65-43fb-9801-9f5e33c94e06-default";

    constructor(label, uuid = '020498bc-0a65-43fb-9801-9f5e33c94e06') {
        this.label = uuid + '-' + label;
    }

    write(value) {
        this.storage.setItem(this.label, JSON.stringify(value));
    }

    read() {
        let val = this.storage.getItem(this.label);
        if (val) return JSON.parse(val);
        else return undefined;
    }
}