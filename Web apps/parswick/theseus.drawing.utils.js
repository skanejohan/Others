var THESEUS = THESEUS || {};

THESEUS.DRAWING = THESEUS.DRAWING || {};

THESEUS.DRAWING.UTILS = (function() {

    var roomLeft = 50;
    var roomTop = 50;
    var roomWidth = 400;
    var roomHeight = 350;

    function roomX(percent) {
        return roomLeft + (roomWidth * percent / 100);
    }

    function roomY(percent) {
        return roomTop + (roomHeight * percent / 100);
    }

    function lengthX(percent) {
        return roomX(percent) - roomX(0);
    }

    function lengthY(percent) {
        return roomY(percent) - roomY(0);
    }

    function insideRect(p, x, y, w, h) {
        return p.x > x && p.x < x+w && p.y > y && p.y < y+h;
    }
    
    function insidePoints(pos, points) {
        var result = false;
        var x = pos.x, y = pos.y;
        for (var i = 0, j = points.length - 1; i < points.length; j = i++) {
            var xi = points[i].x, yi = points[i].y;
            var xj = points[j].x, yj = points[j].y;
    
            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) result = !result;
        }
        return result;
    }
    
    function calcTextPositions(text, width, widthMeasurer) {
        var currentX = 0;
        var remainingWidth = width;
        var remainingText = text.replace(/\s/g, "");
        var subTexts = text.trim().split(" ");
        var result = [];
    
        while (subTexts.length > 0) {
            var txt = subTexts.shift();
            remainingText = remainingText.slice(txt.length);
    
            var txtWidth = widthMeasurer(txt);
            var remainingTextWidth = widthMeasurer(remainingText);
    
            result.push({ x : currentX, text: txt });
    
            var spaceWidth = (width - currentX - txtWidth - remainingTextWidth) / subTexts.length;
            currentX += (txtWidth + spaceWidth);
        }
    
        return result;
    }
    
    function splitUpInLines(text, width, widthMeasurer) {
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
    
    function isFixed(item) {
        var verbs = item.getVerbs(THESEUS.context);
        return !(verbs.has("Drop") || verbs.has("Take"));
    }
    
    function isDrawable(item) {
        return typeof item.getDrawCoords == "function";
    }
    
    function isWindow(item, dir) {
        return (isDrawable(item) && item.getDrawCoords().type == dir + "Window");
    }
    
    function isDoor(item, dir) {
        return (isDrawable(item) && item.getDrawCoords().type == dir + "Door");
    }
    
    function getFixedItems(location) {
        return location.items.toArray().filter(isFixed);
    }
    
    function getVisibleItems(location) {
        return location.items.toArray().filter(i => i.isVisible());
    }
    
    function getFixedVisibleItems(location) {
        return getFixedItems(location).filter(i => i.isVisible());
    }
    
    function getFixedVisibleDrawableItems(location) {
        return getFixedVisibleItems(location).filter(isDrawable);
    };
    
    function getNormalItems(location) {
        return location.items.toArray().filter(i => !isFixed(i));
    }
    
    function getNormalVisibleItems(location) {
        return getNormalItems(location).filter(i => i.isVisible());
    }
    
    function getNormalVisibleDrawableItems(location) {
        return getNormalVisibleItems(location).filter(isDrawable);
    };
    
    function getWindows(location, dir) {
        return getFixedVisibleItems(location).filter(i => isWindow(i, dir));
    };
    
    function getDoor(location, dir) {
        var doors = getFixedVisibleItems(location).filter(i => isDoor(i, dir));
        if (doors.length == 0) {
            return undefined;
        }
        return doors[0];
    };
    
    function description(item) {
        var examine = item.getVerbs(THESEUS.context).value("Examine");
        if (typeof examine == "function") {
            examine(THESEUS.context);
            return THESEUS.context.message().replace(/&quot;/g, "\"").replace(/£/g, "\u00A3");
        }
        return "";
    }

    return {
        roomX : roomX,
        roomY : roomY,
        lengthX : lengthX,
        lengthY : lengthY,
        insideRect : insideRect,
        insidePoints : insidePoints,
        calcTextPositions : calcTextPositions,
        splitUpInLines : splitUpInLines,
        isFixed : isFixed,
        isDrawable : isDrawable,
        isWindow : isWindow,
        isDoor : isDoor,
        getVisibleItems : getVisibleItems,
        getFixedItems : getFixedItems,
        getFixedVisibleItems : getFixedVisibleItems,
        getFixedVisibleDrawableItems : getFixedVisibleDrawableItems,
        getNormalItems : getNormalItems,
        getNormalVisibleItems : getNormalVisibleItems,
        getNormalVisibleDrawableItems : getNormalVisibleDrawableItems,
        getWindows : getWindows,
        getDoor : getDoor,
        description : description,
    } 
})();
