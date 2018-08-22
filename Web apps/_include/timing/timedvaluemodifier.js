class TimedValueModifier {

    constructor(startValue, endValue, interval) {
        this.startValue = startValue;
        this.endValue = endValue;
        this.interval = interval;
        this.start();
    }

    start() {
        this.startedAt = new Date();
        this._finished = false;
    }

    get current() {
        let elapsedMs = new Date() - this.startedAt;
        if (elapsedMs > this.interval) {
            this._finished = true;
            return this.endValue;
        }
        return this.startValue + (this.endValue - this.startValue) * (elapsedMs / this.interval); 
    }

    get finished() {
        return this._finished;
    }
}
