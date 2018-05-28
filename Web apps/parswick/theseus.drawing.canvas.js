var THESEUS = THESEUS || {};

THESEUS.DRAWING = THESEUS.DRAWING || {};

THESEUS.DRAWING.Canvas = function(canvas, width, height) {
    var _w = width;
    var _h = height;
    var _canvas = canvas;
    var _canvasContext = canvas.getContext("2d");

    var object = {
        // Specific functions
        setScale : setScale,               // function(width, height)
        adjustFontSize : adjustFontSize,   // function(fontSize)
        get2dContext : get2dContext,       // function()
        getMousePos : getMousePos,         // function(x, y)

        // Standard canvas properties
        set strokeStyle(value)     { _canvasContext.strokeStyle = value; },
        set fillStyle(value)       { _canvasContext.fillStyle = value; },
        set font(value)            { _canvasContext.font = value; },
        set globalAlpha(value)     { _canvasContext.globalAlpha = value; },
        
        // Standard canvas functions
        beginPath : beginPath,             // function()
        moveTo : moveTo,                   // function(left, top)
        lineTo : lineTo,                   // function(left, top)
        stroke : stroke,                   // function()
        closePath : closePath,             // function()
        measureText : measureText,         // function(text)
        fill : fill,                       // function()
        fillRect : fillRect,               // function(left, top, width, height)
        strokeRect : strokeRect,           // function(left, top, width, height)
        fillText : fillText,               // function(text, left, top)
        save : save,                       // function()
        restore : restore,                 // function()

        // Protected functions, used by extension methods
        protected : {
            adjustLeft : adjustLeft,
            adjustTop : adjustTop,
        }
    }
    return object;

    var _w;
    var _h;
    var _scale;
    var _offsetX;
    var _offsetY;

    function setScale(width, height) {
        _canvas.width  = width;
        _canvas.height = height;
        var scaleX = width / _w;
        var scaleY = height / _h;
        if (scaleX > scaleY) {
            _scale = scaleY;
            _offsetX = (width - _w * _scale) / 2;
            _offsetY = 0;
        } else {
            _scale = scaleX;
            _offsetX = 0;
            _offsetY = (height - _h * _scale) / 2;
        }
    }

    function adjustLeft(x) {
        return _offsetX + x * _scale;
    }

    function adjustTop(y) {
        return _offsetY + y * _scale;
    }

    function adjustMouseX(x) {
        return (x - _offsetX) / _scale;
    }

    function adjustMouseY(y) {
        return (y - _offsetY) / _scale;
    }

    function adjustWidth(w) {
        return w * _scale;
    }

    function adjustHeight(h) {
        return h * _scale;
    }

    function adjustFontSize(s) {
        return s * _scale;
    }

    function adjustRadius(r) {
        return r * _scale;
    }

    function get2dContext() {
        return _canvasContext;
    }

    function beginPath() {
        _canvasContext.beginPath();
    }

    function moveTo(left, top) {
        _canvasContext.moveTo(adjustLeft(left), adjustTop(top));
    }

    function lineTo(left, top) {
        _canvasContext.lineTo(adjustLeft(left), adjustTop(top));
    }

    function stroke() {
        _canvasContext.stroke();
    }

    function closePath() {
        _canvasContext.closePath();
    }

    function measureText(text) {
        _canvasContext.measureText(text);
    }

    function fill() {
        _canvasContext.fill();
    }

    function fillRect(left, top, width, height) {
        _canvasContext.fillRect(adjustLeft(left), adjustTop(top), adjustWidth(width), adjustHeight(height));
    }

    function strokeRect(left, top, width, height) {
        _canvasContext.strokeRect(adjustLeft(left), adjustTop(top), adjustWidth(width), adjustHeight(height));
    }

    function fillText(text, left, top) {
        _canvasContext.fillText(text, adjustLeft(left), adjustTop(top))
    }

    function save() {
        _canvasContext.save();
    }

    function restore() {
        _canvasContext.restore();
    }

    function getMousePos(x, y) {
        return { 
            x : adjustMouseX(x), 
            y : adjustMouseY(y) 
        }
    }
}
