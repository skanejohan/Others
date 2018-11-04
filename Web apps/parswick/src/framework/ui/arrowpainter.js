export { ArrowPainter } ;

import { BasePainter } from "./basepainter.js";

class ArrowPainter extends BasePainter {

    register(cx, cy, direction, target) {
        var x, y, factors;
        switch(direction) {
            case "E": 
                x = cx - 0.3 * _arrowWidth;
                y = cy - 0.5 * _arrowHeight;
                break;
            case "S": 
                x = cx - 0.5 * _arrowWidth;
                y = cy - 0.3 * _arrowHeight;
                break;
            case "W": 
                x = cx - 0.7 * _arrowWidth;
                y = cy - 0.5 * _arrowHeight;
                break;
            case "N": 
                x = cx - 0.5 * _arrowWidth;
                y = cy - 0.7 * _arrowHeight;
                break;
        }
        var arrow = new Arrow(x, y, _arrowWidth, _arrowHeight, "#ecd9c6", direction, () => {
            this.context.moveTo(target)
        });
        this.elements[`arrow.${this.direction}`] = arrow;
        this.engine.add(arrow);
    }
}

const _arrowWidth = 50;
const _arrowHeight = 50;
const _factors = {
    "E": [[0.0,0.2],[0.6,0.2],[0.6,0.0],[1.0,0.5],[0.6,1.0],[0.6,0.8],[0.0,0.8],[0.0,0.2]],
    "S": [[0.2,0.0],[0.2,0.6],[0.0,0.6],[0.5,1.0],[1.0,0.6],[0.8,0.6],[0.8,0.0],[0.2,0.0]],
    "W": [[1.0,0.2],[0.4,0.2],[0.4,0.0],[0.0,0.5],[0.4,1.0],[0.4,0.8],[1.0,0.8],[1.0,0.2]],
    "N": [[0.2,1.0],[0.2,0.4],[0.0,0.4],[0.5,0.0],[1.0,0.4],[0.8,0.4],[0.8,1.0],[0.2,1.0]],
}

class Arrow extends ElementBase {
    constructor(x, y, w, h, style, direction, onclick) {
        super(x, y, w, h, onclick);
        this._direction = direction;
        this._style = style;
    }

    _doDraw() {
        var factors = _factors[this._direction];
        ElementBase.context.strokeStyle = this.style;
        ElementBase.context.beginPath();
        ElementBase.context.moveTo(
            this.x + factors[0][0] * _arrowWidth, 
            this.y + factors[0][1] * _arrowHeight);
        for (var i = 0; i < factors.length; i++) {
            ElementBase.context.lineTo(
                this.x + factors[i][0] * _arrowWidth, 
                this.y + factors[i][1] * _arrowHeight);
        }
        ElementBase.context.closePath();
        ElementBase.context.stroke();
    }
}
