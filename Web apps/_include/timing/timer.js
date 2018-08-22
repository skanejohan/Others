class Timer {
    constructor() {
        this.timeOut = undefined;
    }

    isActive() {
        return this.timeOut !== undefined;
    }

    activate(ms, fn) {
        this.timeOut = setTimeout(fn, ms);
    }

    deactivate() {
        clearTimeout(this.timeOut);
        this.timeOut = undefined;
    }
}
