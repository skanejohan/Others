export { calculateWall };

function calculateWall(location, direction, addWall, addWindow, addDoor, addArrow) {
    var x = WALLDIMENSIONS[direction].x1;
    var y = WALLDIMENSIONS[direction].y1;
    var oStartX, oStartY, oEndX, oEndY;

    getOpenings(location, direction).forEach(o => {
        if (direction == "N" || direction == "S") {
            oStartX = o.start;
            oStartY = WALLDIMENSIONS[direction].y1;
            oEndX = o.start + o.length;
            oEndY = WALLDIMENSIONS[direction].y1;
        }
        else {
            oStartX = WALLDIMENSIONS[direction].x1;
            oStartY = o.start;
            oEndX = WALLDIMENSIONS[direction].x1;
            oEndY = o.start + o.length;
        }
        addWall(x, y, oStartX, oStartY);

        if (o.type == "window") {
            addWindow(oStartX, oStartY, oEndX, oEndY, o);
        }
        else if (o.type == "door") {
            addDoor(oStartX, oStartY, oEndX, oEndY, o);
        }
        else {
            addArrow(oStartX, oStartY, oEndX, oEndY);
        }
        x = oEndX;
        y = oEndY;
    });
    addWall(x, y, WALLDIMENSIONS[direction].x2, WALLDIMENSIONS[direction].y2);
}

const L = 50, T = 50, R = 450, B = 400;
const WALLDIMENSIONS = {
    "N": { x1: L, y1: T, x2: R, y2: T },
    "E": { x1: R, y1: T, x2: R, y2: B },
    "S": { x1: L, y1: B, x2: R, y2: B },
    "W": { x1: L, y1: T, x2: L, y2: B },
}

function getOpenings(location, direction) {
    let exit = _getExit(location, direction);
    let door = _getDoor(location, direction);
    let windows = _getWindows(location, direction);

    var openings = [];
    if (door) { openings.push(door); }
    else if (exit) { openings.push(exit); }
    openings = openings.concat(windows);

    openings.sort((a, b) => a.start - b.start);
    return openings;
}

function _getDoor(location, direction) {
    let key = Object.keys(location.positions).find(k => location.positions[k].door && location.positions[k].type == direction);
    if (key) {
        return {
            start: location.positions[key].start,
            length: location.positions[key].length,
            type: "door",
            name: key,
        };
    }
    return undefined;
}

function _getExit(location, direction) {
    let exit = location.exits[direction];
    if (exit) {
        return {
            start: { N : 210, E : 190, S : 210, W: 190 }[direction],
            length: 80,
            type: "exit",
            name: "",
        };
    }
    return undefined;
}

function _getWindows(location, direction) {
    let keys = Object.keys(location.positions).filter(k => location.positions[k].window && location.positions[k].type == direction);
    var windows = [];
    keys.forEach(key => {
        windows.push({ 
            start: location.positions[key].start, 
            length: location.positions[key].length, 
            type: "window",
            name: key, 
        });
    });
    return windows;
}
