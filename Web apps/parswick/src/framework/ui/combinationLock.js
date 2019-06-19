import { ButtonElement } from "./elements/button.js"

export { CombinationLockUI };

class CombinationLockUI {
    constructor(engine, x, y, w, h, radius, bgColor, fgColor) {
        this.engine = engine;
        this.dimensions = { x: x, y: y, w: w, h: h };
        this.lockElements = [
            new FillRoundRect(x, y, w, h, radius, fgColor), 
            new FillRoundRect(x+3, y+3, w-6, h-6, radius, bgColor),
            this._createButton(0.25, 0.10, "1"),
            this._createButton(0.50, 0.10, "2"),
            this._createButton(0.75, 0.10, "3"),
            this._createButton(0.25, 0.30, "4"),
            this._createButton(0.50, 0.30, "5"),
            this._createButton(0.75, 0.30, "6"),
            this._createButton(0.25, 0.50, "7"),
            this._createButton(0.50, 0.50, "8"),
            this._createButton(0.75, 0.50, "9"),
            this._createButton(0.50, 0.70, "0"),
        ];
    }

    askForCombination(combination, fn) {
        this.expectedCombination = combination;
        this.currentCombination = "";
        this.fn = fn;
        this._activate();
    }

    _createButton(col, row, digit) {
        var b = this.dimensions;
        var width = b.w / 4;
        var height = b.h / 5;
        var left = b.x + col * b.w - width / 2;
        var top = b.y + row * b.h;
        return new ButtonElement(left, top, width, height, digit, () => {
            this.currentCombination += digit;
            if (this.currentCombination.length == this.expectedCombination.length) {
                this.fn(this.currentCombination);
                this._deactivate();
            }
        });
    }

    _activate() {
        this.lockElements.forEach(e => this.engine.addModal(e));
    }

    _deactivate() {
        this.lockElements.forEach(e => this.engine.remove(e));
    }

}
