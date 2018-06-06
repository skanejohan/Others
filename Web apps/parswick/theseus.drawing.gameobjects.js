var THESEUS = THESEUS || {};

THESEUS.DRAWING = THESEUS.DRAWING || {};

const HORIZONTAL = 1;
const VERTICAL = 2;

const LEFT = 1;
const RIGHT = 2;
const ABOVE = 3;
const BELOW = 4;

const DOOR_WINDOW_DEPTH = 3;

const ARROW_WIDTH = 50;
const ARROW_HEIGHT = 50;
const ARROW_DATA = {
    "top" : { x : 50, y : 0 },
    "right" : { x : 100, y : 50 },
    "bottom" : { x : 50, y : 100 },
    "left" : { x : 0, y : 50 },
}

THESEUS.DRAWING.GAMEOBJECTS = (function() {

    var _canvas;
    var _layers;
    var _colors;
    var _setCurrentClickFunction;
    var _mousePos = { x : 0, y : 0 };

    function initialize(canvas, layers, colors, setCurrentClickFunction) {
        _canvas = canvas;
        _layers = layers;
        _colors = colors;
        _setCurrentClickFunction = setCurrentClickFunction;

        THESEUS.DRAWING.CANVASEXTENSIONS.ExtendWithStackFunctions(_canvas);
        THESEUS.DRAWING.CANVASEXTENSIONS.ExtendWithComplexDrawingFunctions(_canvas);
    }

    function setMousePos(pos) {
        var p = _canvas.getMousePos(pos.x, pos.y)
        _mousePos.x = p.x;
        _mousePos.y = p.y;
    }

    function getMousePos() {
        return _mousePos;
    }

// ---------- background --------------------------------------------------------

    function background() {
        return { 
            draw : () => layers.addToLayer(BASE_LAYER, () => { 
                _canvas.pushFillStyle(_colors.bg);
                _canvas.fillRoundRect(10, 10, 780, 430, 30);
                _canvas.popFillStyle();
            })
        }
    }

// ---------- item list --------------------------------------------------------

function doDrawItemList(items, x, y, w, h, header) {
    _canvas.pushAll(_colors.fg, _colors.fg, "Caudex", 16);
    _canvas.strokeRect(x, y, w, h);
    var _y = y + 10;
    _canvas.fillText(header, x + 20, _y+15);
    items.forEach(i => {
        _y += 20;
        item(i, x + 30, _y, _canvas.textWidth(i.caption) + 20, 20)
            .leftAlignText()
            .removeBorder()
            .draw();
    });
    _canvas.popAll();
}

function drawItemList(items, x, y, w, h, header) {
    _layers.addToLayer(BASE_LAYER, () => doDrawItemList(items, x, y, w, h, header) );
}

// ---------- inventory --------------------------------------------------------

    function inventory() {
        var _items = [];

        return { 
            draw : () => drawItemList(_items, 500, 50, 250, 150, "You are carrying:"),
            add : i => _items.push(i),
        }
    }

// ---------- location items --------------------------------------------------------

function locationItems() {
    var _items = [];
    return { 
        draw : () => drawItemList(_items, 500, 250, 250, 150, "You also see:"),
        add : i => _items.push(i),
    }
}

// ---------- item --------------------------------------------------------

    function doDrawItem(i, x, y, w, h, drawBorder, leftAlign) {
        _canvas.pushAll(_colors.fg, _colors.fg, "Caudex", 16);
        if (drawBorder) {
            if (leftAlign) {
                _canvas.leftAlignedTextRect(x, y, w, h, i.caption);
            }
            else {
                _canvas.centeredTextRect(x, y, w, h, i.caption);
            }
        }
        else {
            if (leftAlign) {
                _canvas.leftAlignedText(x, y, w, h, i.caption);
            }
            else {
                _canvas.centeredText(x, y, w, h, i.caption);
            }
        }
        _canvas.popAll();
        i.mouseInsideItem = THESEUS.DRAWING.UTILS.insideRect(_mousePos, x, y, w, h);
    }
    
    function drawItem(i, x, y, w, h, drawBorder, leftAlign) {
        _layers.addToLayer(BASE_LAYER, () => doDrawItem(i, x, y, w, h, drawBorder, leftAlign) );
    }
    
    function doDrawItemHint(i, x, y, w) {
        let MARGIN = 10;
        let VERB_HEIGHT = 15;
        let VERB_OFFSET = 20;
        _canvas.pushAll(_colors.hintFg, _colors.hintFg, "Caudex", 12);
        var h = _canvas.alignedTextBox(x, y, w, MARGIN, MARGIN, THESEUS.DRAWING.UTILS.description(i), _colors.hintBg);
        i.getVerbs(THESEUS.context).forEach(
            (name, fn) => {
                if (name != "Examine") {
                    var verbBgColor;
                    var verbFgColor;
                    if (THESEUS.DRAWING.UTILS.insideRect(_mousePos, x, y+h+VERB_OFFSET, w, VERB_HEIGHT)) {
                        verbBgColor = _colors.verbBg;
                        verbFgColor = _colors.verbFg;
                        _setCurrentClickFunction(context => {
                            if (name == "Take") {
                                i.getDrawCoords = undefined;
                            }
                            return fn(context);
                        });
                    }
                    else {
                        verbBgColor = _colors.hintBg;
                        verbFgColor = _colors.hintFg;
                    }
                    _canvas.pushFillStyle(verbBgColor);
                    _canvas.fillRect(x, y+h+VERB_OFFSET, w, VERB_HEIGHT+1);
                    _canvas.popFillStyle();
                    _canvas.pushFillStyle(_colors.hintBg);
                    _canvas.fillRect(x, y+h+VERB_OFFSET+VERB_HEIGHT, w, VERB_OFFSET-VERB_HEIGHT+1);
                    _canvas.popFillStyle();
                    _canvas.pushFillStyle(verbFgColor);
                    _canvas.fillText(name, x+VERB_OFFSET, y+h+VERB_OFFSET+_canvas.textHeight());
                    _canvas.popFillStyle();
                    h += VERB_OFFSET;
                }
            });
        _canvas.pushFillStyle(_colors.hintBg);
        _canvas.fillRect(x, y+h+VERB_OFFSET, w, MARGIN);
        _canvas.popFillStyle();
        h += VERB_OFFSET;

        i.mouseInsideItemHint = THESEUS.DRAWING.UTILS.insideRect(_mousePos, x, y, w, h+MARGIN);
        _canvas.popAll();
    }

    function drawItemHint(i, x, y, w) {
        _layers.addToLayer(HINT_LAYER, () => {
            doDrawItemHint(i, x, y, w);
        });
    }

    function item(i, x, y, w, h) {
        var drawBorder = true;
        var leftAlign = false;

        return { 
            draw : function() {
                drawItem(i, x, y, w, h, drawBorder, leftAlign);
                if (i.mouseInsideItem || i.mouseInsideItemHint) {
                    var hintX = x + w - 10;
                    var hintY = y;
                    var hintW = 250;
                    drawItemHint(i, hintX, hintY, hintW);
                }
            },
            leftAlignText : function() {
                leftAlign = true;
                return this;
            },
            removeBorder : function() {
                drawBorder = false;
                return this;
            }
        }
    }

// ---------- walls --------------------------------------------------------

    function getCoordinates(direction, startX, startY, endX, endY, open) {
        if (direction == "top" && !open) {
            return {
                x : THESEUS.DRAWING.UTILS.roomX(startX + 1),
                y : THESEUS.DRAWING.UTILS.roomY(startY),
                w : THESEUS.DRAWING.UTILS.lengthX(endX - startX - 2),
                h : THESEUS.DRAWING.UTILS.lengthY(DOOR_WINDOW_DEPTH),
            }
        }
        if (direction == "right" && !open) {
            return {
                x : THESEUS.DRAWING.UTILS.roomX(startX - DOOR_WINDOW_DEPTH),
                y : THESEUS.DRAWING.UTILS.roomY(startY + 1),
                w : THESEUS.DRAWING.UTILS.lengthX(DOOR_WINDOW_DEPTH),
                h : THESEUS.DRAWING.UTILS.lengthY(endY - startY - 2),
            }
        }
        if (direction == "bottom" && !open) {
            return {
                x : THESEUS.DRAWING.UTILS.roomX(startX + 1),
                y : THESEUS.DRAWING.UTILS.roomY(startY - DOOR_WINDOW_DEPTH),
                w : THESEUS.DRAWING.UTILS.lengthX(endX - startX - 2),
                h : THESEUS.DRAWING.UTILS.lengthY(DOOR_WINDOW_DEPTH),
            }
        }
        if (direction == "bottom" && open) {
            return {
                x : THESEUS.DRAWING.UTILS.roomX(startX + 1),
                y : THESEUS.DRAWING.UTILS.roomY(startY - (endX - startX - 2)),
                w : THESEUS.DRAWING.UTILS.lengthX(DOOR_WINDOW_DEPTH),
                h : THESEUS.DRAWING.UTILS.lengthY(endX - startX - 2),
            }
        }
        if (direction == "left" && !open) {
            return {
                x : THESEUS.DRAWING.UTILS.roomX(startX),
                y : THESEUS.DRAWING.UTILS.roomY(startY + 1),
                w : THESEUS.DRAWING.UTILS.lengthX(DOOR_WINDOW_DEPTH),
                h : THESEUS.DRAWING.UTILS.lengthY(endY - startY - 2),
            }
        }
    }
    
    function doDrawWindow(window, direction, startX, startY, endX, endY) {
        var coords = getCoordinates(direction, startX, startY, endX, endY);
        item(window, coords.x, coords.y, coords.w, coords.h).draw();
    }

    function doDrawDoor(door, direction, startX, startY, endX, endY, open) {
        var coords = getCoordinates(direction, startX, startY, endX, endY, open);
        item(door, coords.x, coords.y, coords.w, coords.h).draw();
    }

    function doDrawOpening(direction, exitTo) {
        THESEUS.DRAWING.GAMEOBJECTS[direction + "Arrow"](
            THESEUS.DRAWING.UTILS.roomX(ARROW_DATA[direction].x), 
            THESEUS.DRAWING.UTILS.roomY(ARROW_DATA[direction].y), 
            () => THESEUS.context.setLocation(exitTo)).draw();
    }

    function doDrawWall(direction, openings, startX, startY) {
        openings.sort((a, b) => a.start - b.start);

        _canvas.pushStrokeStyle(_colors.fg);
        _canvas.beginPath();
        _canvas.moveTo(THESEUS.DRAWING.UTILS.roomX(startX), THESEUS.DRAWING.UTILS.roomY(startY));
        openings.forEach(o => {
            if (direction == "top" || direction == "bottom") {
                oStartX = o.start;
                oStartY = startY;
                oEndX = o.start + o.length;
                oEndY = startY;
            }
            else {
                oStartX = startX;
                oStartY = o.start;
                oEndX = startX;
                oEndY = o.start + o.length;
            }
            _canvas.lineTo(THESEUS.DRAWING.UTILS.roomX(oStartX), THESEUS.DRAWING.UTILS.roomY(oStartY));
            _canvas.moveTo(THESEUS.DRAWING.UTILS.roomX(oEndX), THESEUS.DRAWING.UTILS.roomY(oEndY));

            if (o.type == "window") {
                doDrawWindow(o.item, direction, oStartX, oStartY, oEndX, oEndY);
            }
            else if (o.type == "closedDoor") {
                doDrawDoor(o.item, direction, oStartX, oStartY, oEndX, oEndY, false);
            }
            else if (o.type == "openDoor") {
                doDrawDoor(o.item, direction, oStartX, oStartY, oEndX, oEndY, true);
                doDrawOpening(direction, o.exitTo);
            }
            else {
                doDrawOpening(direction, o.exitTo);
            }
        });
        if (direction == "top" || direction == "bottom") {
            _canvas.lineTo(THESEUS.DRAWING.UTILS.roomX(100), THESEUS.DRAWING.UTILS.roomY(startY));
        }
        else {
            _canvas.lineTo(THESEUS.DRAWING.UTILS.roomX(startX), THESEUS.DRAWING.UTILS.roomY(100));
        }
        _canvas.stroke(); 
        _canvas.popStrokeStyle();
    }

    function drawWall(direction, openings, startX, startY) {
        _layers.addToLayer(BASE_LAYER, () => doDrawWall(direction, openings, startX, startY));
    }

    function wall(direction, startX, startY) {
        var openings = [];
        return {
            addOpening: function(opening) {
                openings.push(opening);
            },
            draw : () => drawWall(direction, openings, startX, startY), 
        }
    }

// ---------- arrows --------------------------------------------------------

    function calcArrowPoints(cx, cy, factors) {
        var points = [];
        factors.forEach(f => points.push({ x : cx + f[0] * ARROW_WIDTH, y : cy + f[1] * ARROW_HEIGHT}));
        return points;
    }

    function doDrawArrow(x, y, points, f) {
        _canvas.pushFillStyle(_colors.fg);
        _canvas.beginPath();
        _canvas.moveTo(points[0].x, points[0].y);
        for (i = 1; i < points.length; i++) {
            _canvas.lineTo(points[i].x, points[i].y);
        }
        _canvas.closePath();
        _canvas.stroke();
        _canvas.popFillStyle();
        if (THESEUS.DRAWING.UTILS.insidePoints(_mousePos, points)) {
            _setCurrentClickFunction(f);
        }
    }
    
    function drawArrow(x, y, points, f) {
        _layers.addToLayer(BASE_LAYER, () => doDrawArrow(x, y, points, f) );
    }
        
    function rightArrow(x, y, f) {
        let factors = [[0.0,0.2],[0.6,0.2],[0.6,0.0],[1.0,0.5],[0.6,1.0],[0.6,0.8],[0.0,0.8],[0.0,0.2]];
        return {
            draw : function() {
                drawArrow(x, y, calcArrowPoints(x - ARROW_WIDTH / 2, y - ARROW_HEIGHT / 2, factors), f);
            }
        }
    }        

    function bottomArrow(x, y, f) {
        let factors = [[0.2,0.0],[0.2,0.6],[0.0,0.6],[0.5,1.0],[1.0,0.6],[0.8,0.6],[0.8,0.0],[0.2,0.0]];
        return {
            draw : function() {
                drawArrow(x, y, calcArrowPoints(x - ARROW_WIDTH / 2, y - ARROW_HEIGHT / 2, factors), f);
            }
        }
    }

    function leftArrow(x, y, f) {
        let factors = [[-0.0,0.2],[-0.6,0.2],[-0.6,0.0],[-1.0,0.5],[-0.6,1.0],[-0.6,0.8],[-0.0,0.8],[-0.0,0.2]];
        return {
            draw : function() {
                drawArrow(x, y, calcArrowPoints(x + ARROW_WIDTH / 2, y - ARROW_HEIGHT / 2, factors), f);
            }
        }
    }

    function topArrow(x, y, f) {
        let factors = [[0.2,-0.0],[0.2,-0.6],[0.0,-0.6],[0.5,-1.0],[1.0,-0.6],[0.8,-0.6],[0.8,-0.0],[0.2,-0.0]];
        return {
            draw : function() {
                drawArrow(x, y, calcArrowPoints(x - ARROW_WIDTH / 2, y + ARROW_HEIGHT / 2, factors), f);
            }
        }
    }

// ---------- misc --------------------------------------------------------

    function roomCaption(text) {
        return {
            draw : function() {
                layers.addToLayer(BASE_LAYER, () => { 
                    _canvas.pushAll(_colors.fg, _colors.fg, "Caudex", 16);
                    _canvas.fillText(text, 70, 40);
                    _canvas.popAll();
                }); 
            }
        }
    }

// ---------- return --------------------------------------------------------

return { 
        initialize : initialize,
        getMousePos : getMousePos,
        setMousePos : setMousePos,

        background : background,
        locationItems : locationItems,
        inventory : inventory,
        item : item,
    
        topWall : () => wall("top", 0, 0),
        rightWall : () => wall("right", 100, 0),
        bottomWall : () => wall("bottom", 0, 100),
        leftWall : () => wall("left", 0, 0),

        rightArrow : rightArrow, 
        bottomArrow : bottomArrow, 
        leftArrow : leftArrow, 
        topArrow : topArrow, 

        roomCaption : roomCaption,
    }
})();
