class TextUtils {

    // ---------- Public functions ----------------------------------------------------------------

    static scaledStyle(style, scale) {
        return TextUtils._objectToString(TextUtils._styleToObject(style), scale)[0];
    }

    static scaledFont(font, scale) {
        return this._rescale(font, scale)[0];
    }

    static getFontSize(font, scale) {
        return this._rescale(font, scale)[1];
    }

    static justifyText(text, width, widthMeasurer) {
        var currentX = 0;
        var remainingText = text.replace(/\s/g, "");
        var subTexts = text.trim().split(" ");
        var result = [];
    
        while (subTexts.length > 0) {
            var txt = subTexts.shift();
            remainingText = remainingText.slice(txt.length);
    
            var txtWidth = widthMeasurer(txt);
            var remainingTextWidth = widthMeasurer(remainingText);
    
            result.push({ x : currentX, w : txtWidth, text: txt });
    
            var spaceWidth = (width - currentX - txtWidth - remainingTextWidth) / subTexts.length;
            currentX += (txtWidth + spaceWidth);
        }
    
        return result;
    }

    static splitUpInLines(text, width, widthMeasurer) {
        var words = text.split(' ');
        var lines = [];
        var line = "";
    
        if (widthMeasurer(text) < width) {
            return [text];
        }
        
        while (words.length > 0) {
            while (widthMeasurer(words[0]) >= width) {
                var tmp = words[0];
                words[0] = tmp.slice(0, -1);
                if (words.length > 1) {
                    words[1] = tmp.slice(-1) + words[1];
                } else {
                    words.push(tmp.slice(-1));
                }
            }
            if (widthMeasurer(line + words[0]) < width) {
                line += words.shift() + " ";
            } else {
                lines.push(line);
                line = "";
            }
            if (words.length === 0) {
                lines.push(line);
            }
        }
        return lines;
    }

    // ---------- Private members --------------------------------------------------------------

    static _styleToObject(s) {
        var match;
        var obj = {};
        var regex = /([\w-]*)\s*:\s*([^;]*)/g;
        while (match = regex.exec(s)) {
            obj[match[1]] = match[2].trim();
        }    
        return obj;
    }

    static _objectToString(o, scaleFactor) {
        var params = [];
        for (var key in o) {
            if (o.hasOwnProperty(key)) {
                var value = o[key];
                if (scaleFactor != undefined) {
                    var result = TextUtils._rescale(value, scaleFactor);
                    value = result[0];
                }
                params.push(key + ":" + value);
            }
        }
        return [params.join(";"), result[1]];
    }

    static _rescale(s, f) {
        var match;
        var newVal;
        var regex = /(\d+)(cm|mm|in|px|pt|pc)/g;
        if (match = regex.exec(s)) {
            newVal = Math.round(parseFloat(match[1]) * f);
            s = s.replace(match[1], newVal);
        }    
        return [s, newVal];
    }
}

