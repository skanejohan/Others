class ScalingCanvasContext {
    
    constructor(context) {
        this._underlyingContext = context;
        this._offsetX = 0;
        this._offsetY = 0;
        this._scale = 1;
    }

    // Public properties, corresponding to these in standard canvas context

    set strokeStyle(value) { 
        this._underlyingContext.strokeStyle = value; 
    }

    set fillStyle(value) {
        this._underlyingContext.fillStyle = value; 
    }

    set font(value) { 
        this._underlyingContext.font = value; 
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
            this.__virtualToActualY(y));
    }

    lineTo(x, y) {
        this._underlyingContext.lineTo(
            this._virtualToActualX(x), 
            this._virtualToActualY(y));
    }

    stroke() {
        this._underlyingContext.stroke();
    }

    closePath() {
        this._underlyingContext.closePath();
    }

    measureText(text) {
        this._underlyingContext.measureText(text);
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
        this._underlyingContext.fillText(text, 
            this._virtualToActualX(x), 
            this._virtualToActualY(y), 
            this._virtualToActual(maxWidth));
    }

    save() {
        this._underlyingContext.save();
    }

    restore() {
        this._underlyingContext.restore();
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

    constructor(canvas, virtualWidth, height) {
        this._scale = 1;
        this._offsetX = 0;
        this._offsetY = 0;
        this._virtualWidth = virtualWidth;
        this._height = height;
        this._onclick = undefined;
        this._onmousemove = undefined;
        this._currentPosition = { x : 0, y : 0 };
        this._underlyingCanvas = canvas;
        this._context = new ScalingCanvasContext(canvas.getContext("2d"));
        this._underlyingCanvas.onclick = e => this._onclick == undefined || this._onclick(this._mouseEvent("onmouseclick"));
        this._underlyingCanvas.onmousemove = e => {
            this._calculateMousePos(e);
            this._onmousemove == undefined || this._onmousemove(this._mouseEvent("onmousemove"));
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
        var scaleY = height / this._height;
        if (scaleX > scaleY) {
            this._scale = scaleY;
            this._offsetX = (width - this._virtualWidth * this._scale) / 2;
            this._offsetY = 0;
        } else {
            this._scale = scaleX;
            this._offsetX = 0;
            this._offsetY = (height - this._height * this._scale) / 2;
        }
        this._context._setOffsetAndScale(this._offsetX, this._offsetY, this._scale);
    }
    
    // Private methods

    _calculateMousePos(evt) {
        var root = document.documentElement;
        var rect = this._underlyingCanvas.getBoundingClientRect();
        this._currentPosition = { 
            x : this._context._actualToVirtualX(evt.clientX - rect.left - root.scrollLeft),
            y : this._context._actualToVirtualY(evt.clientY - rect.top - root.scrollTop),
        }
    }

    _mouseEvent(s) {
        return new MouseEvent(s, { 
            "clientX" : this._currentPosition.x,
            "clientY" : this._currentPosition.y,
        });
    }
}
