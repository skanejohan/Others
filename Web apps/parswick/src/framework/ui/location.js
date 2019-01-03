import { calculateWall } from "./wallcalculator.js";
import { ItemElement } from "./elements/item.js";
import { ArrowElement } from "./elements/arrow.js";
import { AccessState } from "../content/item.js";
import { DoorElement } from "./elements/door.js";
import { Utils } from "./utils.js";

export { LocationUI };

class LocationUI {

    constructor(engine, context) {
        this.engine = engine;
        this.context = context;
        this.doors = {};
        this.arrows = {};
        this.walls = [];
        this.items = [];
    }

    enter(location, direction, doneFn) {
        this.location = location;
        this.fadeLocationOut(direction, () => this.fadeLocationIn(direction, doneFn));
    }

    fadeLocationOut(direction, doneFn) {
        ["E", "S", "W", "N"].forEach(dir => {
            if (this.arrows[dir] != undefined) {
                this.fadeOut(this.arrows[dir], direction);
                this.arrows[dir] = undefined;
            }
        });

        for (var key in this.doors) {
            this.fadeOut(this.doors[key], direction);
        }
        this.doors = {};

        this.items.forEach(item => {
            this.removeItem(item, direction);
        });
        this.items = [];

        this.walls.forEach(wall => {
            this.fadeOut(wall, direction);
        });
        this.walls = [];

        if (doneFn) {
            setTimeout(doneFn, CHANGELOCATIONTIME);
        }
    }

    fadeLocationIn(direction, doneFn) {
        ["E", "S", "W", "N"].forEach(dir => calculateWall(this.location, dir, 
            (x1, y1, x2, y2) => this.addWall(x1, y1, x2, y2, direction),
            (x1, y1, x2, y2, window) => this.addWindow(x1, y1, x2, y2, window, dir, direction),
            (x1, y1, x2, y2, door) => this.addDoor(x1, y1, x2, y2, door, dir, direction),
            (x1, y1, x2, y2) => this.addArrow(x1, y1, x2, y2, dir, direction)));
        
        this.addItems(this.context.getItems(this.location.containedItems), direction);

        if (doneFn) {
            setTimeout(doneFn, CHANGELOCATIONTIME);
        }
    }

    openDoor(doorItem) {
        let doorElement = this.doors[doorItem.name];
        doorElement.popup.clear();
        doorElement.open(() => {
            Utils.setVerbs(doorElement, doorItem, this.context);
        });
    }

    closeDoor(doorItem) {
        let doorElement = this.doors[doorItem.name];
        doorElement.arrow = undefined;
        doorElement.popup.clear();
        doorElement.close(() => Utils.setVerbs(doorElement, doorItem, this.context));
    }

    addDoor(x1, y1, x2, y2, door, direction, fadeInDirection) {
        let _door = this.context.item(door.name);
        let isOpen = _door.state == AccessState.OPEN;
        let elem = new DoorElement(this.engine, x1, y1, x2, y2, direction, isOpen, () => {
            this.context.moveTo(this.location.exits[direction].target, direction);
        });
        Utils.addMenuTo(elem);
        this.doors[door.name] = elem;
        Utils.setVerbs(elem, _door, this.context);
        this.engine.add(elem);
        this.fadeIn(elem, fadeInDirection);
    }

    addWindow(x1, y1, x2, y2, window, direction, fadeInDirection) {
        this.addDoor(x1, y1, x2, y2, window, direction, fadeInDirection);
    }

    addArrow(x1, y1, x2, y2, direction, fadeInDirection) {
        let x = x1 + (x2-x1) / 2;
        let y = y1 + (y2-y1) / 2;
        let arrowElement = new ArrowElement(x, y, direction, () => {
            this.context.moveTo(this.location.exits[direction].target, direction);
        });
        this.arrows[direction] = arrowElement;
        this.engine.add(arrowElement);
        this.fadeIn(arrowElement, fadeInDirection);
        return arrowElement;
    }

    addWall(x1, y1, x2, y2, fadeInDirection) {
        let lineElement = new Line(x1, y1, x2, y2, COLOR);
        this.walls.push(lineElement);
        this.engine.add(lineElement);
        this.fadeIn(lineElement, fadeInDirection);
    }

    addItem(item, position, fadeInDirection) {
        let itemElement = new ItemElement(position.x, position.y, position.w, position.h, item.caption);
        Utils.addMenuTo(itemElement);
        item.element = itemElement;
        Utils.setVerbs(itemElement, item, this.context);
        this.items.push(itemElement);
        this.engine.add(itemElement);
        this.fadeIn(itemElement, fadeInDirection);
    }

    addItems(items, fadeInDirection) {
        this.forEachPositionedItemIn(items, (i, p) => this.addItem(i, p, fadeInDirection));
    }

    removeItem(item, fadeOutDirection) {
        if (fadeOutDirection) {
            this.fadeOut(item, fadeOutDirection);
        }
        else {
            item.fadeOut(FADETIME);
        }
    }

    removeItems(items, fadeOutDirection) {
        this.forEachPositionedItemIn(items, (i, p) => this.removeItem(i.element, fadeOutDirection));
    }

    forEachPositionedItemIn(items, fn) {
        for (var item of items) {
            let position = this.location.itemPositions[item.name];
            if (item.isVisible && position) { 
                fn(item, position);
            }
        }
    }

    fadeOut(obj, dir) {
        obj.finishAfterAnimations = true;
        if (dir) {
            obj.translateX(-OFFSETS[dir].x, CHANGELOCATIONTIME);
            obj.translateY(-OFFSETS[dir].y, CHANGELOCATIONTIME);
        }
        obj.fadeOut(CHANGELOCATIONTIME);
    }

    fadeIn(obj, dir) {
        if (dir) {
            if (obj.x) obj.x += OFFSETS[dir].x;
            if (obj.x1) obj.x1 += OFFSETS[dir].x;
            if (obj.x2) obj.x2 += OFFSETS[dir].x;
            if (obj.y) obj.y += OFFSETS[dir].y;
            if (obj.y1) obj.y1 += OFFSETS[dir].y;
            if (obj.y2) obj.y2 += OFFSETS[dir].y;
            obj.translateX(-OFFSETS[dir].x, CHANGELOCATIONTIME);
            obj.translateY(-OFFSETS[dir].y, CHANGELOCATIONTIME);
        }
        obj.fadeIn(CHANGELOCATIONTIME);
    }
}

const OFFSETS = { 
    "E" : { x: 450, y: 0},
    "S" : { x: 0, y: 450},
    "W" : { x: -450, y: 0},
    "N" : { x: 0, y: -450},
}
