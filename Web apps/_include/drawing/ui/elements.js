/*
    Drawing simple and composite objects:
        draw() gets called by the engine
            draw() for ElementBase 
                - calls this.doDraw(context)
            draw() for CompositeElement 
                - clears the buffer
                - calls this.doDraw() which calls doDraw(bufferContext) for all contained stuff
                - draws the buffer onto the main context
        doDraw() draws itself on the supplied canvas
*/

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

var PopupState = {
    HIDDEN: "HIDDEN",
    SHOWPENDING: "SHOWPENDING",
    SHOWING: "SHOWING",
    VISIBLE: "VISIBLE",
    HIDEPENDING: "HIDEPENDING",
    HIDING: "HIDING",
}

// ---------- Base class for all elements -----------------------------------------------------------------------------------------

class ElementBase {

    constructor(x, y, w, h, onclick) {
        this._x = x;
        this._y = y;
        this._w = w;
        this._h = h;
        this._onclick = onclick;
        this._onenter = undefined;
        this._onhover = undefined;
        this._onleave = undefined;
        this._alpha = 1;
        this._popup = undefined;
        this._paused = false;
        this._finished = false;
        this._animations = [];
        this._onModalLayer = true;
        this._finishAfterAnimations = false;
        this._state = PopupState.HIDDEN;
        this._previouslyHovering = false;
    }

    get state() { return this._state; }
    set state(value) { this._state = value; }

    get x() { return this._x; }
    set x(value) { this._x = value; }

    get y() { return this._y; }
    set y(value) { this._y = value; }

    get w() { return this._w; }
    set w(value) { this._w = value; }

    get h() { return this._h; }
    set h(value) { this._h = value; }

    get onclick() { return this._onclick; }
    set onclick(value) { this._onclick = value; }

    get onenter() { return this._onenter; }
    set onenter(value) { this._onenter = value; }

    get onhover() { return this._onhover; }
    set onhover(value) { this._onhover = value; }

    get onleave() { return this._onleave; }
    set onleave(value) { this._onleave = value; }

    get alpha() { return this._alpha; };
    set alpha(value) { this._alpha = value; }

    get popup() { return this._popup; }
    set popup(elem) { this._popup = elem; this._popup.state = PopupState.HIDDEN; }

    get onModalLayer() { return this._onModalLayer; }
    set onModalLayer(b) { this._onModalLayer = b; }
    
    get finished() { return this._finished; };

    set finishAfterAnimations(value) { this._finishAfterAnimations = value; }

    wait(ms, doneFn) {
        this._animations.push(new NoAnimation(this, ms, doneFn));
    }

    animate(ms, animFn, doneFn) {
        this._animations.push(new AnimationBase(this, 0, 1, ms, animFn, doneFn));
    }

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
        this._beforeDraw();
        if (!this.finished) { this._doDraw(ElementBase.context); }
        this._afterDraw();
    }

    _beforeDraw() {
        this._animations.forEach(a => a.update());
        this._animations = this._animations.filter(a => !a.finished);
        if (this._animations.length === 0 && this._finishAfterAnimations) {
            this._finished = true;
        }
        ElementBase.context.globalAlpha = this._alpha;
    }

    _afterDraw() {
        if (!this._previouslyHovering && this.hovering() && this._onenter != undefined) {
            this.onenter();
        }

        if (this.hovering() && this._onhover != undefined) {
            this.onhover();
        }

        if (this._previouslyHovering && !this.hovering() && this._onleave != undefined) {
            this.onleave();
        }

        this._previouslyHovering = this.hovering();

        if (this._finished || this.isPaused() || this.popup == undefined) {
            return;
        }

        // If we hover over this element and it has a hidden popup, activate the "show popup" timer.  
        if (this.hovering() && ElementBase.currentPopup === undefined && this.popup.state == PopupState.HIDDEN) {
            ElementBase.currentPopup = this.popup;
            this.popup.state = PopupState.SHOWPENDING;
            ElementBase.showPopupTimer.activate(200, () => {
                this.setPopupCoordinates();
            this.popup.state = PopupState.SHOWING;
                this.popup.fadeIn(300, () => {
                    this.popup.state = PopupState.VISIBLE;
                });
            });
        }

        // If we hover over this element, or its visible popup, deactivate the "hide 
        // popup" timer if it is active.
        if ((this.hovering() || this.popupHovering()) && this.popup.state == PopupState.HIDEPENDING) {
            this.popup.state = PopupState.VISIBLE;
            ElementBase.hidePopupTimer.deactivate();
        }

        // If we don't hover over this element or its popup, but the popup is visible, 
        // and the "hide popup" timer is not active, activate it.
        if (!this.hovering() && !this.popupHovering() && this.popup.state == PopupState.VISIBLE) {
            this.popup.state = PopupState.HIDEPENDING;
            ElementBase.hidePopupTimer.activate(300, () => {
                this.popup.state = PopupState.HIDING;
                this.popup.fadeOut(100, () => {
                    this.popup.state = PopupState.HIDDEN;
                    ElementBase.currentPopup = undefined;
                });
            });
        }

        // If we don't hover over this element, but its "show popup" timer is active, deactivate it.
        if (!this.hovering() && this.popup.state == PopupState.SHOWPENDING) {
            this.popup.state = PopupState.HIDDEN;
            ElementBase.showPopupTimer.deactivate();
            ElementBase.currentPopup = undefined;
        }
    }

    setPopupCoordinates() {
        this.popup.x = Math.max(ElementBase.canvasRect.left + 5, Math.min(ElementBase.mousePos.x, ElementBase.canvasRect.right - this.popup.w - 5));
        this.popup.y = Math.max(ElementBase.canvasRect.top + 5, Math.min(ElementBase.mousePos.y, ElementBase.canvasRect.bottom - this.popup.h - 5));
    }

    hovering() {
        return this.x < ElementBase.mousePos.x && 
               this.x + this.w > ElementBase.mousePos.x && 
               this.y < ElementBase.mousePos.y && 
               this.y + this.h > ElementBase.mousePos.y;
    }

    popupHovering() {
        return this.popup !== undefined && this.popup.state == PopupState.VISIBLE && this.popup.hovering();
    }
};

ElementBase.mousePos = { x : 0, y : 0 };
ElementBase.currentPopup = undefined;
ElementBase.showPopupTimer = new Timer();
ElementBase.hidePopupTimer = new Timer();
ElementBase.canvasRect = { left : 0, top : 0, right : 0, bottom : 0 };
ElementBase.context = undefined;

// ---------- Base class for composite elements -----------------------------------------------------------------------------------------

class CompositeElementBase extends ElementBase {

    constructor(x, y, w, h, onclick) {
        super(x, y, w, h, onclick);
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

    get state() { return this._state }
    set state(value) { 
        this._state = value; 
        this.elements.forEach(e => e.state = value);
    }

    get style() { return this._style; }
    set style(value) { 
        this._style = value; 
        this.elements.forEach(e => { 
            if ("style" in e) { 
                e.style = value; 
            } 
        });
    }

    animate(ms, animFn, doneFn) {
        super.animate(ms, animFn, doneFn);
        this.elements.forEach(t => t.animate(ms, animFn));
    }

    fadeIn(ms, doneFn) {
        super.fadeIn(ms, doneFn);
        // Do not transfer fading animations to owned objects. These are handled on the top level.
    }

    fadeOut(ms, doneFn) {
        super.fadeOut(ms, doneFn);
        // Do not transfer fading animations to owned objects. These are handled on the top level.
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
        return e;
    }

    draw() {
        this._beforeDraw();
        if (!this.finished) { 
            ElementBase.bufferContext.clearRect(this._x-5, this._y-5, this._w+10, this._h+10);
            this._doDraw();
            if (ElementBase.context.__proto__.hasOwnProperty("copyImageFromAnotherScalingCanvasWithSameDimensions")) {
                ElementBase.context.copyImageFromAnotherScalingCanvasWithSameDimensions(
                    ElementBase.bufferCanvas._underlyingCanvas, 
                    this._x-5, this._y-5, this._w+10, this._h+10, 
                    this._x-5, this._y-5, this._w+10, this._h+10);
            }
            else {
                ElementBase.context.drawImage(ElementBase.bufferCanvas, 
                    this._x-5, this._y-5, this._w+10, this._h+10, 
                    this._x-5, this._y-5, this._w+10, this._h+10);
            }
        }
        this._afterDraw();
    }

    _doDraw() {
        this.elements.forEach(e => { e._doDraw(ElementBase.bufferContext); });
    }
}

// ---------- Base classes for specific elements ------------------------------------------------------------------------

class RectBase extends ElementBase {
    constructor(x, y, w, h, style, onclick) {
        super(x, y, w, h, onclick);
        this._style = style;
    }

    get style() { return this._style; }
    set style(value) { this._style = value; }
}

class RoundRectBase extends ElementBase {
    constructor(x, y, w, h, r, style, onclick) {
        super(x, y, w, h, onclick);
        this._style = style;
        this._r = r;
    }

    get style() { return this._style; }
    set style(value) { this._style = value; }

    get r() { return this._r; }
    set r(value) { this._r = value; }

    _doDraw(ctx) {
        ctx.strokeStyle = this.style;
        ctx.beginPath();
        ctx.moveTo(this.x + this.r, this.y);
        ctx.lineTo(this.x + this.w - this.r, this.y);
        ctx.quadraticCurveTo(this.x + this.w, this.y, this.x + this.w, this.y + this.r);
        ctx.lineTo(this.x + this.w, this.y + this.h - this.r);
        ctx.quadraticCurveTo(this.x + this.w, this.y + this.h, this.x + this.w - this.r, this.y + this.h);
        ctx.lineTo(this.x + this.r, this.y + this.h);
        ctx.quadraticCurveTo(this.x, this.y + this.h, this.x, this.y + this.h - this.r);
        ctx.lineTo(this.x, this.y + this.r);
        ctx.quadraticCurveTo(this.x, this.y, this.x + this.r, this.y);
        ctx.closePath();
    }
}

// ---------- Polygons ----------------------------------------------------------------------

class PolygonBase extends ElementBase {
    constructor(positions, style, onclick) {
        var xs = positions.map(p => p.x);
        var ys = positions.map(p => p.y);
        var minX = xs.reduce((a,b) => Math.min(a,b));
        var minY = ys.reduce((a,b) => Math.min(a,b));
        var maxX = xs.reduce((a,b) => Math.max(a,b));
        var maxY = ys.reduce((a,b) => Math.max(a,b));

        super(minX, minY, maxX-minX, maxY-minY, onclick);
        this._positions = positions;
        this._style = style;
    }
}

class Polygon extends PolygonBase {
    _doDraw(ctx) {
        ctx.strokeStyle = this._style;
        ctx.beginPath();
        ctx.moveTo(this._positions[0].x, this._positions[0].y);
        for (var i = 1; i < this._positions.length; i++) {
            ctx.lineTo(this._positions[i].x, this._positions[i].y); 
        }
        ctx.closePath();
        ctx.stroke();
    }
}

// ---------- Lines -----------------------------------------------------------------------

class Line extends ElementBase {
    constructor(x1, y1, x2, y2, style) {
        super(x1, y1, x2-x1, y2-y1);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this._style = style;
    }

    _doDraw(ctx) {
        ctx.strokeStyle = this._style;
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.closePath();
        ctx.stroke();
    }
}

// ---------- Rectangles -----------------------------------------------------------------------

class Rect extends RectBase {
    _doDraw(ctx) {
        ctx.strokeStyle = this.style;
        ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
}

class FillRect extends RectBase {
    _doDraw(ctx) {
        ctx.fillStyle = this.style;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

class RoundRect extends RoundRectBase {
    _doDraw(ctx) {
        super._doDraw(ctx);
        ctx.strokeStyle = this.style;
        ctx.stroke();
    }
}

class FillRoundRect extends RoundRectBase {
    _doDraw(ctx) {
        super._doDraw(ctx);
        ctx.fillStyle = this.style;
        ctx.fill();
    }
}

// ---------- Text elements -----------------------------------------------------------------------

class TextSegment extends ElementBase {

    constructor(x, y, w, h, text, font, style, onclick) {
        super(x, y, w, h, onclick);
        this.text = text;
        this.font = font;
        this.style = style;
    }

    _doDraw(ctx) {
        ctx.font = this.font;
        ctx.fillStyle = this.style;
        ctx.fillText(this.text, this.x, this.y);
    }
}

class Text extends CompositeElementBase {

    constructor(x, y, w, h, text, font, style, h_align, v_align, onclick) {
        super(x, y, w, h, onclick);
        this._setupTexts(text, font, style, h_align, v_align, onclick);
    }

    _setupTexts(text, font, style, h_align, v_align, onclick) {
        var positionedTexts = [];
        var hAlign = h_align || HorizontalAlignment.LEFT;
        var vAlign = v_align || VerticalAlignment.TOP;
        ElementBase.context.font = font;
        var th;
        if (ElementBase.context.hasOwnProperty("getScaledFontSize")) {
            th = ElementBase.context.getScaledFontSize();
        }
        else {
            th = TextUtils.getFontSize(font, 1)
        }
        var tw = ElementBase.context.measureText(text).width;

        var yh = getYandH(this);
        if (hAlign == HorizontalAlignment.JUSTIFY) {
            positionedTexts = TextUtils.justifyText(text, this.w, t => ElementBase.context.measureText(t).width);
        }
        else {
            var xw = getXandW(this);
            positionedTexts.push({ x : xw.x, w : xw.w, text: text }); 
        }

        positionedTexts.forEach(t => this.addElement(new TextSegment(this.x + t.x, yh.y + yh.h, t.w, yh.h, t.text, font, style, onclick)));

        function getXandW(obj) {
            switch (hAlign) {
                case HorizontalAlignment.LEFT: return { x : 0, w : tw };
                case HorizontalAlignment.CENTER: return { x : (obj.w - tw) / 2, w : tw };
                case HorizontalAlignment.RIGHT: return { x : 0 + obj.w - tw, w : tw };
            }
        }

        function getYandH(obj) {
            switch (vAlign) {
                case VerticalAlignment.TOP: return { y : obj.y, h : th };
                case VerticalAlignment.MIDDLE: return { y : obj.y + (obj.h - th) / 2, h : th };
                case VerticalAlignment.BOTTOM: return { y : obj.y + obj.h - th, h : th };
            }
        }
    }
}

class TextBox extends CompositeElementBase {

    constructor(x, y, w, h, text, font, style, bgStyle, onclick) {
        super(x, y, w, h, onclick);
        this.font = font;
        this.style = style;
        this.bgStyle = bgStyle;
        this._setupTexts(text);
    }

    _setupTexts(text) {
        var yOffset = 0, texts = [];
        ElementBase.context.font = this.font;
        var textHeight;
        if (ElementBase.context.hasOwnProperty("getScaledFontSize")) {
            textHeight = ElementBase.context.getScaledFontSize();
        }
        else {
            textHeight = TextUtils.getFontSize(this.font, 1)
        }

        var lines = TextUtils.splitUpInLines(text, this.w, t => ElementBase.context.measureText(t).width);
        lines.forEach((line, index) => {
            var ha = index == lines.length-1 ? HorizontalAlignment.LEFT : HorizontalAlignment.JUSTIFY;
            texts.push(new Text(this.x+10, this.y + yOffset, this.w-20, textHeight, line, 
                this.font, this.style, ha, VerticalAlignment.MIDDLE));
            yOffset += textHeight;
        });
        yOffset += 0.3 * textHeight;
        this.addElement(new FillRect(this.x, this.y, this.w, yOffset, this.bgStyle, this.onclick))
        texts.forEach(t => this.addElement(t));
        this.h = yOffset;
    }
}

class TextRect extends CompositeElementBase {

    constructor(x, y, w, h, text, margin, font, fontStyle, rectStyle, h_align, v_align, onclick) {
        super(x, y, w, h, onclick);
        this.addElement(new Rect(x, y, w, h, rectStyle, onclick));
        this.addElement(new Text(x + margin, y + margin, w - 2 * margin, h - 2 * margin, text, font, fontStyle, h_align, v_align, onclick));
    }
}

class FillTextRect extends CompositeElementBase {

    constructor(x, y, w, h, text, margin, font, fontStyle, bgStyle, h_align, v_align, onclick) {
        super(x, y, w, h, onclick);
        this.addElement(new FillRect(x, y, w, h, bgStyle, onclick));
        this.addElement(new Text(x + margin, y + margin, w - 2 * margin, h - 2 * margin, text, font, fontStyle, h_align, v_align, onclick));
    }
}

// ---------- Menu -----------------------------------------------------------------------

class Menu extends CompositeElementBase {

    constructor(x, y, w, font, fontStyle, bgStyle, itemHeight, margin) {
        super(x, y, w, 0, () => this.elements.forEach(e => { if (e.hovering()) { e.onclick(); }}));
        this.font = font;
        this.fontStyle = fontStyle;
        this.bgStyle = bgStyle;
        this.itemHeight = itemHeight;
        this.margin = margin;
    }

    addItem(text, onclick) {
        this.addElement(new FillTextRect(this.x, this.y + this.itemHeight * this.elements.length, this.w, this.itemHeight, text, 
            this.margin, this.font, this.fontStyle, this.bgStyle, HorizontalAlignment.LEFT, VerticalAlignment.TOP, onclick));
        this.h += this.itemHeight;
    }

    clear() {
        this.elements = [];
        this.h = 0;
    }
}

// ---------- Buttons -----------------------------------------------------------------------

class ButtonBase extends CompositeElementBase {
    constructor(x, y, w, h, text) {
        super(x, y, w, h);
        this._pressed = false;
        this._frameColor =          "gray"; 
        this._frameColorHighlight = "lightgray";
        this._frameColorClicked =   "lightgray";
        this._bgColor =             "lightGray";
        this._bgColorHighlight =    "white";
        this._bgColorClicked =      "yellow";
        this._fontColor =           "black";
        this._fontColorHighlight =  "black";
        this._fontColorClicked =    "black";
        this._font = "18px arial";
        this._margin = 3;           

        this._frameElement = this.addElement(new FillRect(x, y, w, h, this._frameColor));
        this._bgElement = this.addElement(new FillRect(x + this._margin, y + this._margin, w - 2 * this._margin, h - 2 * this._margin, this._bgColor));
        this._textElement = this.addElement(new Text(x + this._margin, y, w - 2 * this._margin, h - 2 * this._margin, text, this._font, this._fontColor, HorizontalAlignment.CENTER, VerticalAlignment.MIDDLE));
    }

    _doDraw(ctx) {
        if (this._pressed) {
            this._frameElement.style = this._frameColorClicked;
            this._bgElement.style = this._bgColorClicked;
            this._textElement.style = this._fontColorClicked;
        }
        else if (this.hovering()) {
            this._frameElement.style = this._frameColorHighlight;
            this._bgElement.style = this._bgColorHighlight;
            this._textElement.style = this._fontColorHighlight;
        }
        else {
            this._frameElement.style = this._frameColor;
            this._bgElement.style = this._bgColor;
            this._textElement.style = this._fontColor;
        }
        super._doDraw(ctx);
    }
}

class Button extends ButtonBase {
    constructor(x, y, w, h, text, fn) {
        super(x, y, w, h, text);

        this.onclick = () => {
            if (!this._pressed) {
                fn();
                this._pressed = true;
                this.wait(50, () => {
                    this._pressed = false;
                });
            }
        }
    }
}

class TogglableButton extends ButtonBase {
    constructor(x, y, w, h, text, onFn, offFn) {
        super(x, y, w, h, text);

        this.onclick = () => {
            if (!this._pressed) {
                onFn();
                this._pressed = true;
            } else {
                offFn();
                this._pressed = false;
            }
        }
    }

    deToggle() {
        this._pressed = false;
    }
}

