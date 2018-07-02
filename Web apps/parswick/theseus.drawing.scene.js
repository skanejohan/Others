var THESEUS = THESEUS || {};

THESEUS.DRAWING = THESEUS.DRAWING || {};

THESEUS.DRAWING.SCENE = (function() {

    var message = "";

    var drawState = {
        clickFunction : undefined,
        activeItem : undefined,
        activeHint : undefined,
        modalLayer : undefined,
        combinationLockItem : undefined,
        combination : "",
    }

    function getDrawState() {
        return drawState;
    }

    function combinationLockVisible() {
        return drawState.combinationLockItem != undefined;
    }

    function drawWall(location, dir, exitTo) {
        var wall = THESEUS.DRAWING.GAMEOBJECTS[dir + "Wall"]();
        THESEUS.DRAWING.UTILS.getWindows(location, dir).map(
            window => {
                var c = window.getDrawCoords();
                wall.addOpening({ 
                    type: "window", 
                    start: c.start, 
                    length: c.length, 
                    item : window,
                });
            });

        var door = THESEUS.DRAWING.UTILS.getDoor(location, dir);
        if (door != undefined) {
            var c = door.getDrawCoords();
            if (door.isOpen()) {
                wall.addOpening({
                    type: "openDoor",
                    start: c.start, 
                    length: c.length,
                    exitTo : exitTo,
                    item: door,
                });
            }
            else {
                wall.addOpening({
                    type: "closedDoor", 
                    start: c.start, 
                    length: c.length,
                    item: door,
                });
            }
        }
        else if (exitTo != undefined) {
            wall.addOpening({
                type: "opening", 
                start: 40, 
                length: 20, 
                exitTo : exitTo,
            });
        }
        wall.draw();
    }

    function itemCanBeDrawn(location, item) {
        return typeof item.getDrawCoords == "function";
    }

    function draw() {
        drawState.clickFunction = undefined;
        if (drawState.activeItem) {
            var b = drawState.activeItem.bounds;
            if (!THESEUS.DRAWING.UTILS.insideRect(THESEUS.DRAWING.GAMEOBJECTS.getMousePos(), b.x, b.y, b.w, b.h)) {
                drawState.activeItem = undefined;
            }
        }
        if (drawState.activeHint) {
            var b = drawState.activeHint.bounds;
            if (!THESEUS.DRAWING.UTILS.insideRect(THESEUS.DRAWING.GAMEOBJECTS.getMousePos(), b.x, b.y, b.w, b.h)) {
                drawState.activeHint = undefined;
            }
        }
        
        var location = THESEUS.context.location();

        // if (combinationLockVisible()) {
        //     canvasContext.filter = 'blur(5px)';
        // }

        THESEUS.DRAWING.GAMEOBJECTS.background().draw();
        THESEUS.DRAWING.GAMEOBJECTS.roomCaption(location.caption).draw();

        drawWall(location, "top", location.getExits().N);
        drawWall(location, "right", location.getExits().E);
        drawWall(location, "bottom", location.getExits().S);
        drawWall(location, "left", location.getExits().W);

        var locationItems = THESEUS.DRAWING.GAMEOBJECTS.locationItems();
        THESEUS.context.location().items.forEachOpen(i => {
            if (itemCanBeDrawn(location, i)) {
                var c = i.getDrawCoords();
                if (c.type === undefined) {
                    THESEUS.DRAWING.GAMEOBJECTS.item(i, 
                        THESEUS.DRAWING.UTILS.roomX(c.x), THESEUS.DRAWING.UTILS.roomY(c.y), 
                        THESEUS.DRAWING.UTILS.lengthX(c.w), THESEUS.DRAWING.UTILS.lengthY(c.h)
                    ).draw();
                }
            } 
            else {
                locationItems.add(i);
            }
        });
        locationItems.draw();

        var inventory = THESEUS.DRAWING.GAMEOBJECTS.inventory();
        THESEUS.context.inventory().forEachOpen(i => inventory.add(i));
        inventory.draw();

        if (combinationLockVisible()) {
            THESEUS.DRAWING.GAMEOBJECTS.combinationLock(255, 25, 290, 400).draw();
        }

        THESEUS.DRAWING.GAMEOBJECTS.message(message).draw();
    }
    
    function click() {
        if (drawState.clickFunction != undefined) {
            drawState.clickFunction(THESEUS.context);
            message = THESEUS.context.message();
        }
    }

    return { 
        draw : draw,
        click : click,
        getDrawState : getDrawState,
    }
})();
