class TimedValueModifier {

    constructor(startValue, endValue, interval) {
        this.currentValue = startValue;
        this.startValue = startValue;
        this.endValue = endValue;
        this.interval = interval;
        this.paused = false;
        this.start();
    }

    start() {
        this.startedAt = new Date();
        this._finished = false;
        this.paused = false;
        this.elapsed = 0;
    }

    get current() {
        if (!this.paused) {
            this.elapsed = new Date() - this.startedAt;
            if (this.elapsed > this.interval) {
                this._finished = true;
                this.currentValue = this.endValue;
            }
            else {
                this.currentValue = this.startValue + (this.endValue - this.startValue) * (this.elapsed / this.interval); 
            }
        }
        return this.currentValue;
    }

    get finished() {
        return this._finished;
    }

    pause() {
        this.paused = true;
    }

    unpause() {
        this.startValue = this.currentValue;
        this.interval = this.interval - this.elapsed;
        this.start();
    }
}
