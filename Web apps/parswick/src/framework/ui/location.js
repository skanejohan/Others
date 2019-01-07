import { calculateWall } from "./wallcalculator.js";
import { addItemElements, removeItemElements } from "./itemcalculator.js";
import { ArrowElement } from "./elements/arrow.js";
import { AccessState } from "../content/item.js";
import { DoorElement } from "./elements/door.js";
import { Utils } from "./utils.js";

export { LocationUI };

class LocationUI {

    constructor(engine, context) {
        this.engine = engine;
        this.context = context;
        this.clearAllElements();
    }

    enter(location, doneFn) {
        this.location = location;
        this.leaveOldLocation(() => this.enterLocation(doneFn));
    }

    leaveOldLocation(doneFn) {
        let allElements = this.getAllElements();
        if (allElements.length == 0) {
            if (doneFn) { doneFn() }
            return;
        }

        allElements.forEach(elem => {
            elem.finishAfterAnimations = true;
            elem.fadeOut(FADETIME);
        });
        this.clearAllElements();
        if (doneFn) {
            setTimeout(doneFn, FADETIME);
        }
    }

    enterLocation(doneFn) {
        ["E", "S", "W", "N"].forEach(
            dir => calculateWall(
                this.location, dir, 
                (x1, y1, x2, y2) => this.addWall(x1, y1, x2, y2),
                (x1, y1, x2, y2, window) => this.addWindow(x1, y1, x2, y2, window, dir),
                (x1, y1, x2, y2, door) => this.addDoor(x1, y1, x2, y2, door, dir),
                (x1, y1, x2, y2) => this.addArrow(x1, y1, x2, y2, dir)));
        if (doneFn) {
            doneFn();
        }
    }

    clearAllElements() {
        this.doorElements = {};
        this.arrowElements = {};
        this.wallElements = [];
        this.itemElements = [];
    }

    getAllElements() {
        var allElements = [];
        ["E", "S", "W", "N"].forEach(d => { if (this.arrowElements[d]) { allElements.push(this.arrowElements[d]) }});
        for (var d in this.doorElements) { allElements.push(this.doorElements[d]) };
        Array.prototype.push.apply(allElements, this.wallElements);
        Array.prototype.push.apply(allElements, this.itemElements);
        return allElements;
    }

    removeElementsForNoLongerVisibleItems(items) {
        removeItemElements(items, this.itemElements);
    }

    addElementsForNowVisibleItems(items) {
        addItemElements(items, this.itemElements, 
            item => this.location.itemPositions[item.name], 
            this.engine, this.context);
    }

    openDoor(doorItem) {
        let doorElement = this.doorElements[doorItem.name];
        doorElement.popup.clear();
        doorElement.open(() => {
            Utils.setVerbs(doorElement, doorItem, this.context);
        });
    }

    closeDoor(doorItem) {
        let doorElement = this.doorElements[doorItem.name];
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
        this.doorElements[door.name] = elem;
        Utils.setVerbs(elem, _door, this.context);
        this.engine.add(elem);
        elem.fadeIn(FADETIME);
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
        this.arrowElements[direction] = arrowElement;
        this.engine.add(arrowElement);
        arrowElement.fadeIn(FADETIME);
        return arrowElement;
    }

    addWall(x1, y1, x2, y2, fadeInDirection) {
        let lineElement = new Line(x1, y1, x2, y2, COLOR);
        this.wallElements.push(lineElement);
        this.engine.add(lineElement);
        lineElement.fadeIn(FADETIME);
    }
}
