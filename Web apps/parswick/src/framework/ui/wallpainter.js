import { BasePainter } from "./basepainter.js";
import { ArrowPainter } from "./arrowpainter.js";

export { WallPainter };

const L = 50, T = 50, R = 450, B = 400;
const WallDimensions = {
    "N": { x1: L, y1: T, x2: R, y2: T },
    "E": { x1: R, y1: T, x2: R, y2: B },
    "S": { x1: L, y1: B, x2: R, y2: B },
    "W": { x1: L, y1: T, x2: L, y2: B },
}

class WallPainter extends BasePainter {

    register(location, direction) {
        this.location = location;
        this.direction = direction;

        this.openings = OpeningCalculator.getOpenings(this.location, this.direction);

        var x = WallDimensions[this.direction].x1;
        var y = WallDimensions[this.direction].y1;
        var lineCounter = 0;
        var line, oStartX, oStartY, oEndX, oEndY;

        this.openings.forEach(o => {
            if (this.direction == "N" || this.direction == "S") {
                oStartX = o.start;
                oStartY = WallDimensions[this.direction].y1;
                oEndX = o.start + o.length;
                oEndY = WallDimensions[this.direction].y1;
            }
            else {
                oStartX = WallDimensions[this.direction].x1;
                oStartY = o.start;
                oEndX = WallDimensions[this.direction].x1;
                oEndY = o.start + o.length;
            }

            line = new Line(x, y, oStartX, oStartY, COLOR);
            this.elements[`location.${this.direction}.line${lineCounter}`] = line;
            this.engine.add(line);
            lineCounter += 1;

            if (o.type == "window") {
                var desc = this.context.allItems[o.name].description;
                this._addDoorOrWindow(oStartX, oStartY, oEndX, oEndY, false, o.name, desc);
            }
            else if (o.type == "closeddoor") {
                // TODO
            }
            else {
                new ArrowPainter(this.engine, this.elements, this.context).register(
                    oStartX + (oEndX-oStartX) / 2, oStartY + (oEndY-oStartY) / 2, 
                    this.direction, this.location.exits[this.direction].target);
                if (o.type == "opendoor") {
                    // TODO
                }
            }

            x = oEndX;
            y = oEndY;
        });
        line = new Line(x, y, WallDimensions[this.direction].x2, WallDimensions[this.direction].y2, COLOR);
        this.elements[`location.${this.direction}.line${lineCounter}`] = line;
        this.engine.add(line);
    }

    _getDoorOrWindowCoordinates(startX, startY, endX, endY, open) {
        let DOOR_WINDOW_DEPTH = 10;
        switch(this.direction) {
            case "N":
                if(open) return undefined; // TODO
                else return { x : startX + 1, y : startY, w : endX - startX - 2, h : DOOR_WINDOW_DEPTH }
            case "E":
                if (open) return undefined; // TODO
                else return { x : startX - DOOR_WINDOW_DEPTH, y : startY + 1, w : DOOR_WINDOW_DEPTH, h : endY - startY - 2 }
            case "S":
                if (open) return { x : startX + 1, y : startY - (endX - startX - 2), w : DOOR_WINDOW_DEPTH, h : endX - startX - 2 }
                else return { x : startX + 1, y : startY - DOOR_WINDOW_DEPTH, w : endX - startx - 2, h : DOOR_WINDOW_DEPTH }
            case "W":
                if (open) return undefined; // TODO
                else return { x : startX, y : startY + 1, w : DOOR_WINDOW_DEPTH, h : endY - startY - 2 }
        }
    }

    _addDoorOrWindow(startX, startY, endX, endY, open, name, description) {
        var coords = this._getDoorOrWindowCoordinates(startX, startY, endX, endY, open);
        super._addRectWithHint(coords.x, coords.y, coords.w, coords.h, name, description);
    }
}

class OpeningCalculator {

    static getOpenings(location, direction) {
        let exit = this._getExit(location, direction);
        let door = this._getDoor(location, direction);
        let windows = this._getWindows(location, direction);

        var openings = [];
        if (door) { openings.push(door); }
        else if (exit) { openings.push(exit); }
        openings = openings.concat(windows);

        openings.sort((a, b) => a.start - b.start);
        return openings;
    }

    static _getDoor(location, direction) {
        let key = Object.keys(location.doorPositions).find(k => location.doorPositions[k].type == direction);
        if (key) {
            return {
                start: location.doorPositions[key].start,
                length: location.doorPositions[key].length,
                type: "closeddoor",
                name: key,
            };
        }
        return undefined;
    }

    static _getExit(location, direction) {
        let exit = location.exits[direction];
        if (exit) {
            return {
                start: { N : 210, E : 190, S : 210, W: 190 }[direction],
                length: 80,
                type: "",
                name: "",
            };
        }
        return undefined;
    }

    static _getWindows(location, direction) {
        let keys = Object.keys(location.windowPositions).filter(k => location.windowPositions[k].type == direction);
        var windows = [];
        keys.forEach(key => {
            windows.push({ 
                start: location.windowPositions[key].start, 
                length: location.windowPositions[key].length, 
                type: "window",
                name: key, 
            });
        });
        return windows;
    }
}