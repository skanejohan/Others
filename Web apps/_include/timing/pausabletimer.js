class PausableTimer {
    constructor() {
        this.timeOut = undefined;
    }

    isActive() {
        return this.timeOut !== undefined;
    }

    activate(ms, fn) {
        this.fn = fn;
        this.elapsed = 0;
        this.intervalMs = ms;
        this.startedAt = new Date();
        this._startTimer();
    }

    pause() {
        this.elapsed = this.elapsed + (new Date() - this.startedAt);
        clearTimeout(this.timeOut);
    }

    resume() {
        this.startedAt = new Date();
        this._startTimer();
    }

    deactivate() {
        clearTimeout(this.timeOut);
        this.timeOut = undefined;
    }

    _startTimer() {
        this.timeOut = setTimeout(() => {
            this.timeOut = undefined;    
            this.fn();
        }, this.intervalMs-this.elapsed);
    }

}
