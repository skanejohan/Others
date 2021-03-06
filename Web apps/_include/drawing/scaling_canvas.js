class ScalingCanvasContext {
    
    constructor(context) {
        this._underlyingContext = context;
        this._offsetX = 0;
        this._offsetY = 0;
        this._scale = 1;
        this._font = "";
    }

    // Public properties, corresponding to these in standard canvas context

    set strokeStyle(value) { 
        this._underlyingContext.strokeStyle = value; 
    }

    set fillStyle(value) {
        this._underlyingContext.fillStyle = value; 
    }

    get font() {
        return this.font;
    }

    set font(value) { 
        this._font = value;
        this._underlyingContext.font = TextUtils.scaledFont(value, this._scale); 
    }

    set globalAlpha(value) { 
        this._underlyingContext.globalAlpha = value;
    }

    // Public methods, corresponding to these in standard canvas context

    beginPath() {
        this._underlyingContext.beginPath();
    }

    moveTo(x, y) {
        this._underlyingContext.moveTo(
            this._virtualToActualX(x), 
            this._virtualToActualY(y));
    }

    lineTo(x, y) {
        this._underlyingContext.lineTo(
            this._virtualToActualX(x), 
            this._virtualToActualY(y));
    }

    quadraticCurveTo(cpx,cpy,x,y) {
        this._underlyingContext.quadraticCurveTo(
            this._virtualToActualX(cpx), 
            this._virtualToActualY(cpy),
            this._virtualToActualX(x), 
            this._virtualToActualY(y)
        );
    }

    stroke() {
        this._underlyingContext.stroke();
    }

    closePath() {
        this._underlyingContext.closePath();
    }

    measureText(text) {
        var obj = this._underlyingContext.measureText(text);
        return { width : obj.width / this._scale };
    }

    fill() {
        this._underlyingContext.fill();
    }

    fillRect(x, y, width, height) {
        this._underlyingContext.fillRect(
            this._virtualToActualX(x), 
            this._virtualToActualY(y), 
            this._virtualToActual(width), 
            this._virtualToActual(height));
    }

    strokeRect(x, y, width, height) {
        this._underlyingContext.strokeRect(
            this._virtualToActualX(x), 
            this._virtualToActualY(y), 
            this._virtualToActual(width), 
            this._virtualToActual(height));
    }

    fillText(text, x, y, maxWidth) {
        if (maxWidth === undefined) {
            this._underlyingContext.fillText(text, 
                this._virtualToActualX(x), 
                this._virtualToActualY(y)); 
        }
        else {
            this._underlyingContext.fillText(text, 
                this._virtualToActualX(x), 
                this._virtualToActualY(y), 
                this._virtualToActual(maxWidth));
        }
    }

    clearRect(x, y, w, h) {
        this._underlyingContext.clearRect(
            this._virtualToActualX(x),
            this._virtualToActualY(y),
            this._virtualToActual(w),
            this._virtualToActual(h));
    }

    arc(x, y, r, sAngle, eAngle, counterclockwise) {
        this._underlyingContext.arc(
            this._virtualToActualX(x),
            this._virtualToActualY(y),
            this._virtualToActual(r),
            sAngle, eAngle, counterclockwise);
    }

    drawImage(img, xSrc, ySrc, wSrc, hSrc, x, y, w, h) {
        this._underlyingContext.drawImage(img, xSrc, ySrc, wSrc, hSrc,
            this._virtualToActualX(x),
            this._virtualToActualY(y),
            this._virtualToActual(w),
            this._virtualToActual(h));
    }

    copyImageFromAnotherScalingCanvasWithSameDimensions(img, xSrc, ySrc, wSrc, hSrc, x, y, w, h) {
        this._underlyingContext.drawImage(img,  
            this._virtualToActualX(xSrc),
            this._virtualToActualY(ySrc),
            this._virtualToActual(wSrc),
            this._virtualToActual(hSrc),
            this._virtualToActualX(x),
            this._virtualToActualY(y),
            this._virtualToActual(w),
            this._virtualToActual(h));
    }

    translate(x, y) {
        let _x = x < 0 ? -this._virtualToActualX(Math.abs(x)) : this._virtualToActualX(x);
        let _y = y < 0 ? -this._virtualToActualY(Math.abs(y)) : this._virtualToActualY(y);        
        this._underlyingContext.translate(_x, _y);
    }

    rotate(angle) {
        this._underlyingContext.rotate(angle);
    }

    save() {
        this._underlyingContext.save();
    }

    restore() {
        this._underlyingContext.restore();
    }

    // Public methods, not present in standard canvas context

    getScaledFontSize() {
        return TextUtils.getFontSize(this._underlyingContext.font, 1) / this._scale;
    }

    // Private methods, and methods used by ScalingCanvas

    _setOffsetAndScale(offsetX, offsetY, scale) {
        this._offsetX = offsetX;
        this._offsetY = offsetY;
        this._scale = scale;
    }

    _virtualToActualX(x) {
        return this._offsetX + x * this._scale;
    }

    _virtualToActualY(y) {
        return this._offsetY + y * this._scale;
    }

    _virtualToActual(v) {
        return v * this._scale;
    }

    _actualToVirtualX(x) {
        return (x - this._offsetX) / this._scale;
    }

    _actualToVirtualY(y) {
        return (y - this._offsetY) / this._scale;
    }

}

class ScalingCanvas {

    constructor(canvas, virtualWidth, virtualHeight) {
        this._scale = 1;
        this._offsetX = 0;
        this._offsetY = 0;
        this._virtualWidth = virtualWidth;
        this._virtualHeight = virtualHeight;
        this._onclick = undefined;
        this._onmousemove = undefined;
        this._currentVirtualPosition = { x : 0, y : 0 };
        this._boundingVirtualRect = { left : 0, right : 0, top : 0, bottom : 0 };
        this._underlyingCanvas = canvas;
        this._context = new ScalingCanvasContext(canvas.getContext("2d"));
        this._underlyingCanvas.onclick = e => this._onclick == undefined || this._onclick(this._mouseEvent("onmouseclick"));
        this._underlyingCanvas.onmousemove = e => {
            this._calculateMousePos(e);
            this._onmousemove === undefined || this._onmousemove(this._mouseEvent("onmousemove"), this._boundingVirtualRect);
        };
    }

    // Public properties, corresponding to these in standard canvas

    set onclick(value) {
        this._onclick = value;
    }
    
    set onmousemove(value) {
        this._onmousemove = value;
    }
    
    // Public methods, corresponding to these in standard canvas

    getContext(s) {
        return this._context;
    }

    // Public methods not found in standard canvas

    setDimensions(width, height) {
        this._underlyingCanvas.width  = width;
        this._underlyingCanvas.height = height;
        var scaleX = width / this._virtualWidth;
        var scaleY = height / this._virtualHeight;
        if (scaleX > scaleY) {
            this._scale = scaleY;
            this._offsetX = (width - this._virtualWidth * this._scale) / 2;
            this._offsetY = 0;
        } else {
            this._scale = scaleX;
            this._offsetX = 0;
            this._offsetY = (height - this._virtualHeight * this._scale) / 2;
        }
        this._context._setOffsetAndScale(this._offsetX, this._offsetY, this._scale);
    }
    
    // Private methods

    _calculateMousePos(evt) {
        var root = document.documentElement;
        var rect = this._underlyingCanvas.getBoundingClientRect();
        this._currentVirtualPosition = { 
            x : this._context._actualToVirtualX(evt.clientX - rect.left - root.scrollLeft),
            y : this._context._actualToVirtualY(evt.clientY - rect.top - root.scrollTop),
        }
        this._boundingVirtualRect.left = this._context._actualToVirtualX(0 - rect.left - root.scrollLeft);
        this._boundingVirtualRect.top = this._context._actualToVirtualY(0 - rect.top - root.scrollTop);
        this._boundingVirtualRect.right = this._context._actualToVirtualX(this._underlyingCanvas.width - rect.left - root.scrollLeft);
        this._boundingVirtualRect.bottom = this._context._actualToVirtualY(this._underlyingCanvas.height - rect.top - root.scrollTop);
    }

    _mouseEvent(s) {
        return new MouseEvent(s, { 
            "clientX" : this._currentVirtualPosition.x,
            "clientY" : this._currentVirtualPosition.y,
        });
    }
}
