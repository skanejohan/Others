class AnimationBase {

    constructor(element, from, to, ms, updateFn, doneFn) {
        this.element = element;
        this.valueModifier = new TimedValueModifier(from, to, ms);
        this.updateFn = updateFn;
        this.doneFn = doneFn;
        this.finished = false;
    }

    update() {
        this.updateFn(this.valueModifier.current);
        this.finished = this.valueModifier.finished;
        if (this.finished && this.doneFn != undefined) {
            this.doneFn();
        }
    }
}

class FadeInAnimation extends AnimationBase {
    constructor(element, ms, doneFn) {
        super(element, 0, 1, ms, value => this.element.alpha = value, doneFn);
    }
}

class FadeOutAnimation extends AnimationBase {
    constructor(element, ms, doneFn) {
        super(element, 1, 0, ms, value => this.element.alpha = value, doneFn);
    }
}

class HorizontalTranslateAnimation extends AnimationBase {
    constructor(element, delta, ms, doneFn) {
        super(element, element.x, element.x + delta, ms, value => this.element.x = value, doneFn);
    }
}

class VerticalTranslateAnimation extends AnimationBase {
    constructor(element, delta, ms, doneFn) {
        super(element, element.y, element.y + delta, ms, value => this.element.y = value, doneFn);
    }
}
