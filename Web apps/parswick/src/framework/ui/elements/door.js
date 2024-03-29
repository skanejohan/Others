import { ItemElement } from "./item.js";
import { ArrowElement } from "./arrow.js";
import { ELEMENTBASELAYERINDEX } from "../utils.js";

export { DoorElement };

class DoorElement extends ItemElement {
    constructor(engine, x1, y1, x2, y2, direction, isOpen, onArrowClick, onUpdateMenu) {
        let coords = _getDoorOrWindowCoordinates(x1, y1, x2, y2, direction);
        super(coords.closed.x, coords.closed.y, coords.closed.w, coords.closed.h, "");
        this._pivotPoint = coords.pivotPoint;
        this.coords = coords;
        this.engine = engine;
        this.isOpen = isOpen;

        let cs = coords.openingCoordinates; 
        let x = cs.x1 + (cs.x2-cs.x1) / 2;
        let y = cs.y1 + (cs.y2-cs.y1) / 2;
        this.arrowElement = new ArrowElement(x, y, direction, onArrowClick);
        this.arrowElement.alpha = 0;

        if (isOpen) {
            this._angle = this.coords.openAngle;
            this._showArrow();
        }
        else {
            this._angle = 0;
        }

        this.onUpdateMenu = onUpdateMenu;

        this.setClickRect();
    }

    setClickRect() {
        let cs = this.isOpen ? this.coords.open : this.coords.closed;
        this.clickRect = { x: cs.x, y: cs.y, w: cs.w, h: cs.h };
    }

    open() {
        this.popup.clear();
        this.rotate(0, this.coords.openAngle, 300, () => {
            this.setClickRect();
            this.onUpdateMenu();
        });
        this._showArrow();
        this.isOpen = true;
    }

    close() {
        this.popup.clear();
        this.rotate(this.coords.openAngle, 0, 300, () => {
            this.setClickRect();
            this.onUpdateMenu();
        });
        this._hideArrow();
        this.isOpen = false;
    }

    translateX(d, t) {
        super.translateX(d,t);
        this.arrowElement.translateX(d,t);
    }

    translateY(d, t) {
        super.translateY(d,t);
        this.arrowElement.translateY(d,t);
    }

    fadeIn(t) {
        super.fadeIn(t);
        if (this.isOpen) {
            this.arrowElement.fadeIn(t);
        }
    }

    fadeOut(t) {
        super.fadeOut(t);
        if (this.isOpen) {
            this.arrowElement.fadeOut(t);
        }
    }

    get x() { return super.x; }

    set x(value) { 
        var delta = value - this.x;
        super.x = value; 
        this.arrowElement.x += delta;
    }

    get y() { return super.y; }

    set y(value) { 
        var delta = value - this.y;
        super.y = value; 
        this.arrowElement.y += delta;
    }

    _showArrow() {
        this.engine.add(this.arrowElement, ELEMENTBASELAYERINDEX);
        this.arrowElement.fadeIn(FADETIME);
    }

    _hideArrow() {
        this.arrowElement.fadeOut(FADETIME, () => this.engine.remove(this.arrowElement));
    }
}

function _getDoorOrWindowCoordinates(startX, startY, endX, endY, direction) {
    switch(direction) {
        case "N":
            return {
                openingCoordinates: { x1: startX, y1: startY, x2: endX, y2: endY },
                open : {},
                closed : { x : startX + 1, y : startY, w : endX - startX - 2, h : DOOR_WINDOW_DEPTH },
                openAngle: -Math.PI / 2,
                pivotPoint : { x : startX + 1, y : startY },
                arrow: {}, 
            }   
        case "E":
            return {
                openingCoordinates: { x1: startX, y1: startY, x2: endX, y2: endY },
                open : {},
                closed : { x : startX - DOOR_WINDOW_DEPTH, y : startY + 1, w : DOOR_WINDOW_DEPTH, h : endY - startY - 2 },
                openAngle: -Math.PI / 2,
                pivotPoint : { x : startX - DOOR_WINDOW_DEPTH, y : startY + 1 },
                arrow: {}, 
            }   
        case "S":
            return {
                openingCoordinates: { x1: startX, y1: startY, x2: endX, y2: endY },
                open : {x : startX + 1, y : startY - (endX - startX - 2), w : DOOR_WINDOW_DEPTH, h : endX - startX - 2},
                closed : { x : startX + 1, y : startY - DOOR_WINDOW_DEPTH, w : endX - startX - 2, h : DOOR_WINDOW_DEPTH },
                openAngle: -Math.PI / 2,
                pivotPoint : { x : startX + DOOR_WINDOW_DEPTH / 2, y : startY - DOOR_WINDOW_DEPTH / 2 },
                arrow: {}, 
            }   
        case "W":
            return {
                openingCoordinates: { x1: startX, y1: startY, x2: endX, y2: endY },
                open : {},
                closed : { x : startX, y : startY + 1, w : DOOR_WINDOW_DEPTH, h : endY - startY - 2 },
                openAngle: -Math.PI / 2,
                pivotPoint : {x : startX, y : startY + 1 },
                arrow: {}, 
            }   
    }
}    

const DOOR_WINDOW_DEPTH = 15;
