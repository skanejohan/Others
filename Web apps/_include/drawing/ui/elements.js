// TODO: figure out why the popups flash weirdly (seen when fillrect is a popup)

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
    set popup(elem) { this._popup = elem; }

    get onModalLayer() { return this._onModalLayer; }
    set onModalLayer(b) { this._onModalLayer = b; }
    
    get finished() { return this._finished; };

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
        ElementBase.context.globalAlpha = this._alpha;

        if (!this.finished) {
            this._doDraw();
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
ElementBase.context = undefined;

// ---------- Base class for composite elements -----------------------------------------------------------------------------------------

class CompositeElementBase extends ElementBase {

    constructor(x, y, w, h, fn) {
        super(x, y, w, h, fn);
        this.elements = [];
    }

    get x() { return this._x; }

    set x(value) { 
        var delta = value - this._x;
        this._x = value; 
        this.elements.forEach(e => e.x = e.x + delta);
    }

    get y() { return this._y; }

    set y(value) { 
        var delta = value - this._y;
        this._y = value; 
        this.elements.forEach(e => e.y = e.y + delta);
    }

    fadeIn(ms, doneFn) {
        super.fadeIn(ms, doneFn);
        this.elements.forEach(t => t.fadeIn(ms));
    }

    fadeOut(ms, doneFn) {
        super.fadeOut(ms, doneFn);
        this.elements.forEach(t => t.fadeOut(ms));
    }

    translateX(dist, ms, doneFn) {
        super.translateX(dist, ms, doneFn);
        this.elements.forEach(t => t.translateX(dist, ms));
    }

    translateY(dist, ms, doneFn) {
        super.translateY(dist, ms, doneFn);
        this.elements.forEach(t => t.translateY(dist, ms));
    }

    addElement(e) {
        this.elements.push(e);
    }

    _doDraw() {
        this.elements.forEach(e => e.draw());
    }
}

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

    _doDraw() {
        ElementBase.context.strokeStyle = this.style;
        ElementBase.context.beginPath();
        ElementBase.context.moveTo(this.x + this.r, this.y);
        ElementBase.context.lineTo(this.x + this.w - this.r, this.y);
        ElementBase.context.quadraticCurveTo(this.x + this.w, this.y, this.x + this.w, this.y + this.r);
        ElementBase.context.lineTo(this.x + this.w, this.y + this.h - this.r);
        ElementBase.context.quadraticCurveTo(this.x + this.w, this.y + this.h, this.x + this.w - this.r, this.y + this.h);
        ElementBase.context.lineTo(this.x + this.r, this.y + this.h);
        ElementBase.context.quadraticCurveTo(this.x, this.y + this.h, this.x, this.y + this.h - this.r);
        ElementBase.context.lineTo(this.x, this.y + this.r);
        ElementBase.context.quadraticCurveTo(this.x, this.y, this.x + this.r, this.y);
        ElementBase.context.closePath();
    }
}

// ---------- Implementation of Specific elements -----------------------------------------------------------------------

class Rect extends RectBase {
    _doDraw() {
        ElementBase.context.strokeStyle = this.style;
        ElementBase.context.strokeRect(this.x, this.y, this.w, this.h);
    }
}

class FillRect extends RectBase {
    _doDraw() {
        ElementBase.context.fillStyle = this.style;
        ElementBase.context.fillRect(this.x, this.y, this.w, this.h);
    }
}

class RoundRect extends RoundRectBase {
    _doDraw() {
        super._doDraw();
        ElementBase.context.strokeStyle = this.style;
        ElementBase.context.stroke();
    }
}

class FillRoundRect extends RoundRectBase {
    _doDraw() {
        super._doDraw();
        ElementBase.context.fillStyle = this.style;
        ElementBase.context.fill();
    }
}

class TextSegment extends ElementBase {

    constructor(x, y, w, h, text, font, style, fn) {
        super(x, y, w, h, fn);
        this.text = text;
        this.font = font;
        this.style = style;
    }

    _doDraw() {
        ElementBase.context.font = this.font;
        ElementBase.context.fillStyle = this.style;
        ElementBase.context.fillText(this.text, this.x, this.y);
    }
}

class Text extends CompositeElementBase {

    constructor(x, y, w, h, text, font, style, h_align, v_align, fn) {
        super(x, y, w, h, fn);
        this._setupTexts(text, font, style, h_align, v_align, fn);
    }

    _setupTexts(text, font, style, h_align, v_align, fn) {
        var positionedTexts = [];
        ElementBase.context.font = font;
        var th = ElementBase.context.getScaledFontSize();
        var tw = ElementBase.context.measureText(text).width;

        var yh = getYandH(this);
        if (h_align == HorizontalAlignment.JUSTIFY) {
            positionedTexts = TextUtils.justifyText(text, this.w, t => ElementBase.context.measureText(t).width);
        }
        else {
            var xw = getXandW(this);
            positionedTexts.push({ x : xw.x, w : xw.w, text: text }); 
        }

        positionedTexts.forEach(t => this.addElement(new TextSegment(this.x + t.x, yh.y + yh.h, t.w, yh.h, t.text, font, style, fn)));

        function getXandW(obj) {
            switch (h_align) {
                case HorizontalAlignment.LEFT: return { x : 0, w : tw };
                case HorizontalAlignment.CENTER: return { x : (obj.w - tw) / 2, w : tw };
                case HorizontalAlignment.RIGHT: return { x : 0 + obj.w - tw, w : tw };
            }
        }

        function getYandH(obj) {
            switch (v_align) {
                case VerticalAlignment.TOP: return { y : obj.y, h : th };
                case VerticalAlignment.MIDDLE: return { y : obj.y + (obj.h - th) / 2, h : th };
                case VerticalAlignment.BOTTOM: return { y : obj.y + obj.h - th, h : th };
            }
        }
    }
}

class TextBox extends CompositeElementBase {

    constructor(x, y, w, h, text, font, style, fn) {
        super(x, y, w, h, fn);
        this.font = font;
        this.style = style;
        this._setupTexts(text);
    }

    _setupTexts(text) {
        var yOffset = 0;
        ElementBase.context.font = this.font;
        var textHeight = ElementBase.context.getScaledFontSize();
        var lines = TextUtils.splitUpInLines(text, this.w, t => ElementBase.context.measureText(t).width);
        lines.forEach((line, index) => {
            var ha = index == lines.length-1 ? HorizontalAlignment.LEFT : HorizontalAlignment.JUSTIFY;
            this.addElement(new Text(this.x, this.y + yOffset, this.w, textHeight, line, 
                this.font, this.style, ha, VerticalAlignment.MIDDLE, this.fn));
            yOffset += textHeight;
        });
    }
}

class TextRect extends CompositeElementBase {

    constructor(x, y, w, h, text, margin, font, fontStyle, bgStyle, h_align, v_align, fn) {
        super(x, y, w, h, fn);
        this.addElement(new FillRect(x, y, w, h, bgStyle, fn));
        this.addElement(new Text(x + margin, y + margin, w - 2 * margin, h - 2 * margin, text, font, fontStyle, h_align, v_align, fn));
    }
}

class Menu extends CompositeElementBase {

    constructor(x, y, w, font, fontStyle, bgStyle, itemHeight, margin) {
        super(x, y, w, 0, () => this.elements.forEach(e => { if (e.hovering) { e.fn(); }}));
        this.font = font;
        this.fontStyle = fontStyle;
        this.bgStyle = bgStyle;
        this.itemHeight = itemHeight;
        this.margin = margin;
    }

    addItem(text, fn) {
        this.addElement(new TextRect(this.x, this.y + this.itemHeight * this.elements.length, this.w, this.itemHeight, text, 
            this.margin, this.font, this.fontStyle, this.bgStyle, HorizontalAlignment.LEFT, VerticalAlignment.TOP, fn));
        this.h += this.itemHeight;
    }
}
