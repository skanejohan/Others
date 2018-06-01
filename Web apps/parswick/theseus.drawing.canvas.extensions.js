var THESEUS = THESEUS || {};

THESEUS.DRAWING = THESEUS.DRAWING || {};

THESEUS.DRAWING.CANVASEXTENSIONS = {};

THESEUS.DRAWING.CANVASEXTENSIONS.ExtendWithStackFunctions = function(canvas) {
    var fillStyleStack = ["white"];
    var strokeStyleStack = ["white"];
    var fontNameStack = ["Arial"];
    var fontSizeStack = [10];

    function peek(array) {
        if (array.length == 0) {
            return undefined;
        }
        return array[array.length-1];
    }
    
    canvas.applyFont = function(adjusted = true) {
        if (adjusted) {
            canvas.font = canvas.adjustFontSize(canvas.peekFontSize()) + "px " + canvas.peekFontName();
        }
        else {
            canvas.font = canvas.peekFontSize() + "px " + canvas.peekFontName();
        }
    }

    canvas.pushFillStyle = function(style) {
        fillStyleStack.push(style);
        canvas.fillStyle = style;
    }

    canvas.peekFillStyle = function() {
        return peek(fillStyleStack);
    }

    canvas.popFillStyle = function(style) {
        fillStyleStack.pop();
        canvas.fillStyle = peek(fillStyleStack);
    }

    canvas.pushStrokeStyle = function(style) {
        strokeStyleStack.push(style);
        canvas.strokeStyle = style;
    }

    canvas.peekStrokeStyle = function() {
        return peek(strokeStyleStack);
    }

    canvas.popStrokeStyle = function(style) {
        canvas.strokeStyle = strokeStyleStack.pop();
    }

    canvas.pushFontName = function(name) {
        fontNameStack.push(name);
        this.applyFont();
    }

    canvas.peekFontName = function() {
        return peek(fontNameStack);
    }

    canvas.popFontName = function(name) {
        fontNameStack.pop(name);
        this.applyFont();
    }

    canvas.pushFontSize = function(size) {
        fontSizeStack.push(size);
        this.applyFont();
    }

    canvas.peekFontSize = function() {
        return peek(fontSizeStack);
    }

    canvas.popFontSize = function(size) {
        fontSizeStack.pop(name);
        this.applyFont();
    }

    canvas.pushAll = function(fillStyle, strokeStyle, fontName, fontSize) {
        this.pushFillStyle(fillStyle);
        this.pushStrokeStyle(strokeStyle);
        this.pushFontName(fontName);
        this.pushFontSize(fontSize);
    }

    canvas.popAll = function() {
        this.popFillStyle();
        this.popStrokeStyle();
        this.popFontName();
        this.popFontSize();
    }
}

THESEUS.DRAWING.CANVASEXTENSIONS.ExtendWithComplexDrawingFunctions = function(canvas) {

    function traceRoundRect(canvas, left, top, width, height, radius) {
        var ctx = canvas.get2dContext();
        var adjustLeft = canvas.protected.adjustLeft;
        var adjustTop = canvas.protected.adjustTop;
        
        ctx.beginPath();
        ctx.moveTo(adjustLeft(left + radius), adjustTop(top));
        ctx.lineTo(adjustLeft(left + width - radius), adjustTop(top));
        ctx.quadraticCurveTo(adjustLeft(left + width), adjustTop(top), adjustLeft(left + width), adjustTop(top + radius));
        ctx.lineTo(adjustLeft(left + width), adjustTop(top + height - radius));
        ctx.quadraticCurveTo(adjustLeft(left + width), adjustTop(top + height), adjustLeft(left + width - radius), adjustTop(top + height));
        ctx.lineTo(adjustLeft(left + radius), adjustTop(top + height));
        ctx.quadraticCurveTo(adjustLeft(left), adjustTop(top + height), adjustLeft(left), adjustTop(top + height - radius));
        ctx.lineTo(adjustLeft(left), adjustTop(top + radius));
        ctx.quadraticCurveTo(adjustLeft(left), adjustTop(top), adjustLeft(left + radius), adjustTop(top));
        ctx.closePath();
    }

    canvas.textHeight = function() {
        return canvas.peekFontSize();
    }

    canvas.textWidth = function(text) {
        canvas.applyFont(false);
        var w = canvas.get2dContext().measureText(text).width;
        canvas.applyFont(true);
        return w;
    }

    canvas.alignText = function(x, y, w, text) {
        var texts = THESEUS.DRAWING.UTILS.calcTextPositions(text, w, canvas.textWidth);
        texts.forEach(t => this.fillText(t.text, x + t.x, y));
    }

    canvas.textRect = function(x, y, w, h, xOffset, yOffset, text) {
        this.strokeRect(x, y, w, h); 
        this.fillText(text, x+xOffset, y+this.textHeight()+yOffset);
    }

    canvas.alignedTextRect = function(x, y, w, h, xMargin, yMargin, text) {
        this.strokeRect(x, y, w, h); 
        this.alignText(x+xMargin, y+yMargin+this.textHeight(), w-2*xMargin, text);
    }

    canvas.centeredText = function(x, y, w, h, text, allowOverflow = false) {
        var textX = x + (w - this.textWidth(text)) / 2;
        var textY = y + (h + this.textHeight()) / 2;
        if ((this.textWidth(text) < w && this.textHeight() < h) || allowOverflow) {
            this.fillText(text, textX, textY);
        }
    }

    canvas.leftAlignedText = function(x, y, w, h, text, allowOverflow = false) {
        var textX = x;
        var textY = y + (h + this.textHeight()) / 2;
        if ((this.textWidth(text) < w && this.textHeight() < h) || allowOverflow) {
            this.fillText(text, textX, textY);
        }
    }

    canvas.centeredTextRect = function(x, y, w, h, text, allowOverflow = false) {
        this.strokeRect(x, y, w, h);
        this.centeredText(x, y, w, h, text, allowOverflow);
    }

    canvas.leftAlignedTextRect = function(x, y, w, h, text, allowOverflow = false) {
        this.strokeRect(x, y, w, h);
        this.leftAlignedText(x, y, w, h, text, allowOverflow);
    }

    canvas.alignedTextBox = function(x, y, w, xMargin, yMargin, text, bgColor) {
        
        var drawBackground = function(x, y, w, h, c) {
            if (bgColor != undefined) {
                c.pushFillStyle(bgColor);
                c.fillRect(x, y, w, h);
                c.popFillStyle();
            }
        };

        var lines = THESEUS.DRAWING.UTILS.splitUpInLines(text, w-2*xMargin, canvas.textWidth);
        var height = 0;
        drawBackground(x, y, w, yMargin+1, this);
        lines.forEach((line, index) => {
            drawBackground(x, y+yMargin+height, w, this.textHeight()+1, this);
            if (index == lines.length-1) {
                this.fillText(line, x+xMargin, y+yMargin+this.textHeight()+height);
            }
            else {
                this.alignText(x+xMargin, y+yMargin+this.textHeight()+height, w-2*xMargin, line);
            }
            height += this.textHeight();
        });
        drawBackground(x, y+yMargin+height, w, yMargin+1, this);
        return height;
    }

    canvas.fillCircle = function(cx, cy, radius) {
        this.get2dContext().beginPath();
        this.get2dContext().arc(adjustLeft(cx), adjustTop(cy), adjustRadius(radius), 0, Math.PI*2, true);
        this.get2dContext().fill();
    }

    canvas.fillRoundRect = function(left, top, width, height, radius) {
        traceRoundRect(this, left, top, width, height, radius);
        this.get2dContext().fill();
    }

    canvas.strokeRoundRect = function(left, top, width, height, radius) {
        traceRoundRect(this, left, top, width, height, radius);
        this.get2dContext().stroke();
    }

}
