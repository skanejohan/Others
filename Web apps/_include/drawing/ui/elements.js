// ---------- Enums used by the element classes -----------------------------------------------------------------------------------

var HorizontalAlignment = {
    LEFT: 1,
    CENTER: 2,
    RIGHT: 3,
    JUSTIFY: 4,
};

var VerticalAlignment = {
    TOP: 1,
    MIDDLE: 2,
    BOTTOM: 3,
};

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
        this._paused = false;
        this._finished = false;
        this._context = undefined;
        this._animations = [];
        this._onModalLayer = true;
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

    get onModalLayer() { return this._onModalLayer; }
    set onModalLayer(b) { this._onModalLayer = b; }
    
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

    pause() {
        this._animations.forEach(a => a.pause());
        this._paused = true;
    }

    unpause() {
        this._animations.forEach(a => a.unpause());
        this._paused = false;
    }
  
    isPaused() {
        return this._paused;
    }

    draw() {
        this._animations.forEach(a => a.update());
        this._animations = this._animations.filter(a => !a.finished);
        if (this._animations.length === 0 && this._finishAfterAnimations) {
            this._finished = true;
        }
        this.context.globalAlpha = this._alpha;

        if (!this.finished) {
            this.doDraw();
        }

        if (this._finished || this.isPaused()) {
            return;
        }

        // If we hover over this element, it has a popup, no popup is visible, and no other popup
        // is waiting to be shown, activate the "show popup" timer.  
        if (this.hovering() && this._popup !== undefined && ElementBase.currentPopup === undefined && !ElementBase.showPopupTimer.isActive()) {
            ElementBase.pendingPopup = this._popup;
            ElementBase.showPopupTimer.activate(200, () => {
                // Set the popup's coordinates, make the popup visible and tell the system 
                // that this is the only allowed popup.
                ElementBase.currentPopup = this._popup;
                ElementBase.pendingPopup = undefined;
                this.setPopupCoordinates();
                this._popup.fadeIn(300); 
            });
        }

        // If we hover over this element, or its visible popup, deactivate the "hide 
        // popup" timer if it is active.
        if ((this.hovering() || this.popupHovering()) && this.popupVisible() && ElementBase.hidePopupTimer.isActive()) {
            ElementBase.hidePopupTimer.deactivate();
        }

        // If we don't hover over this element or its popup, but the popup is visible, 
        // and the "hide popup" timer is not active, activate it.
        if (!this.hovering() && !this.popupHovering() && this.popupVisible() && !ElementBase.hidePopupTimer.isActive()) {
            ElementBase.hidePopupTimer.activate(300, () => {
                // If the "hide popup" timer reaches 0, make the popup invisible.
                this.popup.fadeOut(100, () => ElementBase.currentPopup = undefined);
            });
        }

        // If we don't hover over this element, but its "show popup" timer is active, deactivate it.
        if (!this.hovering() && ElementBase.showPopupTimer.isActive() && ElementBase.pendingPopup === this._popup) {
            ElementBase.showPopupTimer.deactivate();
            ElementBase.pendingPopup = undefined;
        }
    }

    setPopupCoordinates() {
        this._popup.x = Math.max(ElementBase.canvasRect.left + 5, Math.min(ElementBase.mousePos.x, ElementBase.canvasRect.right - this._popup.w - 5));
        this._popup.y = Math.max(ElementBase.canvasRect.top + 5, Math.min(ElementBase.mousePos.y, ElementBase.canvasRect.bottom - this._popup.h - 5));
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
ElementBase.pendingPopup = undefined;
ElementBase.currentPopup = undefined;
ElementBase.showPopupTimer = new Timer();
ElementBase.hidePopupTimer = new Timer();
ElementBase.canvasRect = { left : 0, top : 0, right : 0, bottom : 0 };

// ---------- Base classes for specific elements ------------------------------------------------------------------------

class RectBase extends ElementBase {
    constructor(x, y, w, h, style, fn) {
        super(x, y, w, h, fn);
        this.style = style;
    }
}

class RoundRectBase extends ElementBase {
    constructor(x, y, w, h, r, style, fn) {
        super(x, y, w, h, fn);
        this.style = style;
        this.r = r;
    }

    doDraw() {
        this.context.strokeStyle = this.style;
        this.context.beginPath();
        this.context.moveTo(this.x + this.r, this.y);
        this.context.lineTo(this.x + this.w - this.r, this.y);
        this.context.quadraticCurveTo(this.x + this.w, this.y, this.x + this.w, this.y + this.r);
        this.context.lineTo(this.x + this.w, this.y + this.h - this.r);
        this.context.quadraticCurveTo(this.x + this.w, this.y + this.h, this.x + this.w - this.r, this.y + this.h);
        this.context.lineTo(this.x + this.r, this.y + this.h);
        this.context.quadraticCurveTo(this.x, this.y + this.h, this.x, this.y + this.h - this.r);
        this.context.lineTo(this.x, this.y + this.r);
        this.context.quadraticCurveTo(this.x, this.y, this.x + this.r, this.y);
        this.context.closePath();
    }
}

// ---------- Implementation of Specific elements -----------------------------------------------------------------------

class Rect extends RectBase {
    doDraw() {
        this.context.strokeStyle = this.style;
        this.context.strokeRect(this.x, this.y, this.w, this.h);
    }
}

class FillRect extends RectBase {
    doDraw() {
        this.context.fillStyle = this.style;
        this.context.fillRect(this.x, this.y, this.w, this.h);
    }
}

class RoundRect extends RoundRectBase {
    doDraw() {
        super.doDraw();
        this.context.strokeStyle = this.style;
        this.context.stroke();
    }
}

class FillRoundRect extends RoundRectBase {
    doDraw() {
        super.doDraw();
        this.context.fillStyle = this.style;
        this.context.fill();
    }
}

class Text extends ElementBase {
    constructor(x, y, w, h, text, font, style, h_align, v_align, fn) {
        super(x, y, w, h, fn);
        this.font = font;
        this.style = style;
        this.text = text;
        this.h_align = h_align || HorizontalAlignment.LEFT; 
        this.v_align = v_align || VerticalAlignment.MIDDLE;
        this.xOriginal = x;
        this.yOriginal = y;
        this.wOriginal = w;
        this.hOriginal = h;
    }

    doDraw() {
        this.context.font = this.font;
        this.context.fillStyle = this.style;

        var positionedTexts = [];
        var textWidth = this.context.measureText(this.text).width;
        switch (this.h_align) {
            case HorizontalAlignment.LEFT:
                this.x = xOriginal;
                this.w = textWidth; 
                positionedTexts.push({ x : 0, text: this.text }); 
                break;
            case HorizontalAlignment.CENTER:
                this.x = this.xOriginal + (this.wOriginal - textWidth) / 2;
                this.w = textWidth; 
                positionedTexts.push({ x : 0, text: this.text }); 
                break;
            case HorizontalAlignment.RIGHT:
                this.x = this.xOriginal + this.wOriginal - textWidth;
                this.w = textWidth; 
                positionedTexts.push({ x : 0, text: this.text }); 
                break;
            case HorizontalAlignment.JUSTIFY:
                positionedTexts = TextUtils.justifyText(this.text, this.w, t => this.context.measureText(t).width);
                break;
        }

        var textHeight = this.context.getScaledFontSize();
        switch (this.v_align) {
            case VerticalAlignment.TOP:
                this.y = this.yOriginal;
                this.h = textHeight;
                break;
            case VerticalAlignment.MIDDLE:
                this.y = this.yOriginal + (this.hOriginal - textHeight) / 2;
                this.h = textHeight;
                break;
            case VerticalAlignment.BOTTOM:
                this.y = this.yOriginal + this.hOriginal - textHeight;
                this.h = textHeight;
                break;
        }
               
        positionedTexts.forEach(t => this.context.fillText(t.text, this.x + t.x, this.y + textHeight));
    }
}

class Popup extends ElementBase {

}
