// TODO introduce a "show popup" timer, so that you have to remain above an element for a short while before the popup is shown

// ---------- Base class for all elements -----------------------------------------------------------------------------------------

class ElementBase {

    constructor(x, y, w, h, fn) {
        this._x = x;
        this._y = y;
        this._w = w;
        this._h = h;
        this._fn = fn;
        this._alpha = 1;
        this._popup = undefined;
        this._finished = false;
        this._context = undefined;
        this._animations = [];
        this._finishAfterAnimations = false;
    }

    get x() { return this._x; }
    set x(value) { this._x = value; }

    get y() { return this._y; }
    set y(value) { this._y = value; }

    get w() { return this._w; }
    set w(value) { this._w = value; }

    get h() { return this._h; }
    set h(value) { this._h = value; }

    get fn() { return this._fn; }

    get alpha() { return this._alpha; };
    set alpha(value) { this._alpha = value; }

    get popup() { return this._popup; }
    set popup(elem) {
        this._popup = elem;
        elem.context = this._context;
    }

    get finished() { return this._finished; };

    get context() { return this._context; }
    set context(value) { this._context = value; }
    
    set finishAfterAnimations(value) { this._finishAfterAnimations = value; }

    fadeIn(ms, doneFn) {
        this._animations.push(new FadeInAnimation(this, ms, doneFn));
    }

    fadeOut(ms, doneFn) {
        this._animations.push(new FadeOutAnimation(this, ms, doneFn));
    }

    translateX(dist, ms, doneFn) {
        this._animations.push(new HorizontalTranslateAnimation(this, dist, ms, doneFn));
    }

    translateY(dist, ms, doneFn) {
        this._animations.push(new VerticalTranslateAnimation(this, dist, ms, doneFn));
    }

    draw() {
        this._animations.map(a => a.update());
        this._animations = this._animations.filter(a => !a.finished);
        if (this._animations.length === 0 && this._finishAfterAnimations) {
            this._finished = true;
        }
        this._context.globalAlpha = this._alpha;

        if (this._finished) {
            return;
        }

        // If we hover over this element, it has a popup, and no popup is visible, 
        // set the popup's coordinates, make the popup visible and tell the system 
        // that this is the only allowed popup.
        if (this.hovering() && this._popup !== undefined && ElementBase.currentPopup === undefined) {
            ElementBase.currentPopup = this._popup;
            this.setPopupCoordinates();
            this._popup.fadeIn(300);
        }

        // If we hover over this element, or its visible popup, deactivate the "hide 
        // popup" timer if it is active.
        if ((this.hovering() || this.popupHovering()) && this.popupVisible() && ElementBase.popupTimer.isActive()) {
            ElementBase.popupTimer.deactivate();
        }

        // If we don't hover over this element or its popup, but the popup is visible, 
        // and the "hide popup" timer is not active, activate it.
        if (!this.hovering() && !this.popupHovering() && this.popupVisible() && !ElementBase.popupTimer.isActive()) {
            ElementBase.popupTimer.activate(300, () => {
                // If the "hide popup" timer reaches 0, make the popup invisible.
                this.popup.fadeOut(100, () => ElementBase.currentPopup = undefined);
            });
        }
    }

    setPopupCoordinates() {
        this._popup.x = this.x + (this.w / 3);
        this._popup.y = this.y + (this.h / 3);
        // TODO limit so that it always fits
        // TODO probably configurable if the popup should appear above, below, right, left etc. of the mouse cursor. Or?
    }

    hovering() {
        return this._x < ElementBase.mousePos.x && 
               this._x + this._w > ElementBase.mousePos.x && 
               this._y < ElementBase.mousePos.y && 
               this._y + this._h > ElementBase.mousePos.y;
    }

    popupVisible() {
        return this._popup !== undefined && this._popup === ElementBase.currentPopup;
    }

    popupHovering() {
        return this.popupVisible() && this._popup.hovering();
    }
};

ElementBase.mousePos = { x : 0, y : 0 };
ElementBase.currentPopup = undefined;
ElementBase.popupTimer = new Timer();

// ---------- Specific elements -----------------------------------------------------------------------------------------

class Rect extends ElementBase {
    constructor(x, y, w, h, style, fn) {
        super(x, y, w, h, fn);
        this.style = style;
    }

    draw() {
        super.draw();
        if (!this.finished) {
            this.context.strokeStyle = this.style;
            this.context.strokeRect(this.x, this.y, this.w, this.h);
        }
    }
}

class FillRect extends ElementBase {
    constructor(x, y, w, h, style, fn) {
        super(x, y, w, h, fn);
        this.style = style;
    }

    draw() {
        super.draw();
        if (!this.finished) {
            this.context.fillStyle = this.style;
            this.context.fillRect(this.x, this.y, this.w, this.h);
        }
    }
}

class Popup extends ElementBase {

}