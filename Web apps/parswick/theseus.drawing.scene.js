var THESEUS = THESEUS || {};

THESEUS.DRAWING = THESEUS.DRAWING || {};

THESEUS.DRAWING.SCENE = (function() {

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
        if (exitTo != undefined) {
            var door = THESEUS.DRAWING.UTILS.getDoor(location, dir);
            if (door == undefined) {
                wall.addOpening({
                    type: "opening", 
                    start: 40, 
                    length: 20, 
                    exitTo : exitTo,
                });
            }
            else {
                var c = door.getDrawCoords();
                wall.addOpening({
                    type: "door", 
                    start: c.start, 
                    length: c.length,
                    item: door,
                });
            }
        }
        wall.draw();
    }

    function draw() {
        var location = THESEUS.context.location();

        THESEUS.DRAWING.GAMEOBJECTS.background().draw();
        THESEUS.DRAWING.GAMEOBJECTS.roomCaption(location.caption).draw();

        drawWall(location, "top", location.getExits().N);
        drawWall(location, "right", location.getExits().E);
        drawWall(location, "bottom", location.getExits().S);
        drawWall(location, "left", location.getExits().W);

        THESEUS.DRAWING.UTILS.getFixedVisibleDrawableItems(location).forEach(i => {
            var c = i.getDrawCoords();
            if (c.type === undefined) {
                THESEUS.DRAWING.GAMEOBJECTS.item(i, 
                    THESEUS.DRAWING.UTILS.roomX(c.x), THESEUS.DRAWING.UTILS.roomY(c.y), 
                    THESEUS.DRAWING.UTILS.lengthX(c.w), THESEUS.DRAWING.UTILS.lengthY(c.h)
                ).draw();
            }
        });

        var inventory = THESEUS.DRAWING.GAMEOBJECTS.inventory();
        inventory.draw();
    }
    
    return { 
        draw : draw,
    }
})();
