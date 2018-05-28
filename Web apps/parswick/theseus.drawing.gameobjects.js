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
    var _fgColor;
    var _bgColor;
    var _mousePos = { x : 0, y : 0 };

    function initialize(canvas, layers, fgColor, bgColor) {
        _canvas = canvas;
        _layers = layers;
        _fgColor = fgColor;
        _bgColor = bgColor;

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
            draw : () => layers.addToLayer(BASE_LAYER, () => { _canvas.fillRoundRect(10, 10, 780, 430, 30, _bgColor) })
        }
    }

// ---------- inventory --------------------------------------------------------

    function doDrawInventory() {
        _canvas.pushAll(_fgColor, _fgColor, "Caudex", 16);
        _canvas.strokeRect(500, 50, 250, 350);
        _canvas.fillText("You are carrying:", 520, 80);
        _canvas.popAll();
    }

    function drawInventory() {
        _layers.addToLayer(BASE_LAYER, () => doDrawInventory() );
    }

    function inventory() {
        return { 
            draw : drawInventory,
        }
    }

// ---------- item --------------------------------------------------------

    function doDrawItem(i, x, y, w, h) {
        _canvas.pushAll(_fgColor, _fgColor, "Caudex", 16);
        _canvas.centeredTextRect(x, y, w, h, i.caption);
        _canvas.popAll();
        i.mouseInsideItem = THESEUS.DRAWING.UTILS.insideRect(_mousePos, x, y, w, h);
    }
    
    function drawItem(i, x, y, w, h) {
        _layers.addToLayer(BASE_LAYER, () => doDrawItem(i, x, y, w, h) );
    }
    
    function doDrawItemHint(i, x, y, w) {
        let MARGIN = 10;
        let VERB_HEIGHT = 15;
        let VERB_OFFSET = 20;
        _canvas.pushAll(_fgColor, _fgColor, "Caudex", 12);
        var h = _canvas.alignedTextBox(x, y, w, MARGIN, MARGIN, THESEUS.DRAWING.UTILS.description(i), _bgColor);
        i.getVerbs(THESEUS.context).forEach(
            (name, fn) => {
                if (name != "Examine") {
                    var verbBgColor;
                    var verbFgColor;
                    if (THESEUS.DRAWING.UTILS.insideRect(_mousePos, x, y+h+VERB_OFFSET, w, VERB_HEIGHT)) {
                        verbBgColor = "blue";  // TODO color
                        verbFgColor = "white"; // TODO color
                        currentItem = { act : fn }
                    }
                    else {
                        verbBgColor = _bgColor;
                        verbFgColor = _fgColor;
                    }
                    _canvas.pushFillStyle(verbBgColor);
                    _canvas.fillRect(x, y+h+VERB_OFFSET, w, VERB_HEIGHT+1);
                    _canvas.popFillStyle();
                    _canvas.pushFillStyle(_bgColor);
                    _canvas.fillRect(x, y+h+VERB_OFFSET+VERB_HEIGHT, w, VERB_OFFSET-VERB_HEIGHT+1);
                    _canvas.popFillStyle();
                    _canvas.pushFillStyle(verbFgColor);
                    _canvas.fillText(name, x+VERB_OFFSET, y+h+VERB_OFFSET+_canvas.textHeight());
                    _canvas.popFillStyle();
                    h += VERB_OFFSET;
                }
            });
        _canvas.pushFillStyle(_bgColor);
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
        return { 
            draw : function() {
                drawItem(i, x, y, w, h);
                if (i.mouseInsideItem || i.mouseInsideItemHint) {
                    var hintX = x + w - 10;
                    var hintY = y;
                    var hintW = 250;
                    drawItemHint(i, hintX, hintY, hintW);
                }
        }}
    }

// ---------- walls --------------------------------------------------------

    function getCoordinates(direction, startX, startY, endX, endY) {
        if (direction == "top") {
            return {
                x : THESEUS.DRAWING.UTILS.roomX(startX + 1),
                y : THESEUS.DRAWING.UTILS.roomY(startY),
                w : THESEUS.DRAWING.UTILS.lengthX(endX - startX - 2),
                h : THESEUS.DRAWING.UTILS.lengthY(DOOR_WINDOW_DEPTH),
            }
        }
        if (direction == "right") {
            return {
                x : THESEUS.DRAWING.UTILS.roomX(startX - DOOR_WINDOW_DEPTH),
                y : THESEUS.DRAWING.UTILS.roomY(startY),
                w : THESEUS.DRAWING.UTILS.lengthX(DOOR_WINDOW_DEPTH),
                h : THESEUS.DRAWING.UTILS.lengthY(endY - startY),
            }
        }
        if (direction == "bottom") {
            return {
                x : THESEUS.DRAWING.UTILS.roomX(startX),
                y : THESEUS.DRAWING.UTILS.roomY(startY - DOOR_WINDOW_DEPTH),
                w : THESEUS.DRAWING.UTILS.lengthX(endX - startX),
                h : THESEUS.DRAWING.UTILS.lengthY(DOOR_WINDOW_DEPTH),
            }
        }
        if (direction == "left") {
            return {
                x : THESEUS.DRAWING.UTILS.roomX(startX),
                y : THESEUS.DRAWING.UTILS.roomY(startY),
                w : THESEUS.DRAWING.UTILS.lengthX(DOOR_WINDOW_DEPTH),
                h : THESEUS.DRAWING.UTILS.lengthY(endY - startY),
            }
        }
    }
    
    function doDrawWindow(window, direction, startX, startY, endX, endY) {
        var coords = getCoordinates(direction, startX, startY, endX, endY);
        item(window, coords.x, coords.y, coords.w, coords.h).draw();
    }

    function doDrawDoor(door, direction, startX, startY, endX, endY) {
        var coords = getCoordinates(direction, startX, startY, endX, endY);
        item(door, coords.x, coords.y, coords.w, coords.h).draw();
    }

    function doDrawWall(direction, openings, startX, startY) {
        openings.sort((a, b) => a.start - b.start);

        _canvas.pushStrokeStyle(_fgColor);
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
            else if (o.type == "door") {
                doDrawDoor(o.item, direction, oStartX, oStartY, oEndX, oEndY);
            }
            else {
                THESEUS.DRAWING.GAMEOBJECTS[direction + "Arrow"](
                    THESEUS.DRAWING.UTILS.roomX(ARROW_DATA[direction].x), 
                    THESEUS.DRAWING.UTILS.roomY(ARROW_DATA[direction].y), 
                    () => THESEUS.context.setLocation(o.exitTo)).draw();
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
        _canvas.pushFillStyle(_fgColor);
        _canvas.beginPath();
        _canvas.moveTo(points[0].x, points[0].y);
        for (i = 1; i < points.length; i++) {
            _canvas.lineTo(points[i].x, points[i].y);
        }
        _canvas.closePath();
        _canvas.stroke();
        _canvas.popFillStyle();
        if (THESEUS.DRAWING.UTILS.insidePoints(_mousePos, points)) {
            currentItem = { act : f }
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
                    _canvas.pushAll(_fgColor, _fgColor, "Caudex", 16);
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
