class AnimationBase {

    constructor(element, from, to, ms, updateFn, doneFn) {
        this.element = element;
        this.valueModifier = new TimedValueModifier(from, to, ms);
        this.updateFn = updateFn;
        this.doneFn = doneFn;
        this.finished = false;
    }

    update() {
        this.updateFn(this.element, this.valueModifier.current);
        this.finished = this.valueModifier.finished;
        if (this.finished && this.doneFn != undefined) {
            this.doneFn();
        }
    }

    pause() {
        this.valueModifier.pause();
    }

    unpause() {
        this.valueModifier.unpause();
    }
}

class NoAnimation extends AnimationBase {
    constructor(element, ms, doneFn) {
        super(element, 0, 1, ms, () => {}, doneFn);
    }
}

class FadeInAnimation extends AnimationBase {
    constructor(element, ms, doneFn) {
        super(element, 0, 1, ms, (_, value) => this.element.alpha = value, doneFn);
    }
}

class FadeOutAnimation extends AnimationBase {
    constructor(element, ms, doneFn) {
        super(element, 1, 0, ms, (_, value) => this.element.alpha = value, doneFn);
    }
}

class HorizontalTranslateAnimation extends AnimationBase {
    constructor(element, delta, ms, doneFn) {
        super(element, element.x, element.x + delta, ms, (_, value) => this.element.x = value, doneFn);
    }
}

class VerticalTranslateAnimation extends AnimationBase {
    constructor(element, delta, ms, doneFn) {
        super(element, element.y, element.y + delta, ms, (_, value) => this.element.y = value, doneFn);
    }
}

class RotateAnimation extends AnimationBase {
    constructor(element, startAngle, endAngle, ms, doneFn) {
        super(element, startAngle, endAngle, ms, (_, value) => this.element._angle = value, doneFn);
    }
}
