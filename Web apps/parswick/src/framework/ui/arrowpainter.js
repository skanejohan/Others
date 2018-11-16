export { ArrowPainter } ;

import { BasePainter } from "./basepainter.js";
import { ArrowElement } from "./elements/arrow.js";

class ArrowPainter extends BasePainter {

    register(cx, cy, direction, target) {
        var arrow = new ArrowElement(cx, cy, ARROWSIZE, "#ecd9c6", direction, () => {
            this.context.moveTo(target)
        });
        this._addElement(arrow);
    }
}

const ARROWSIZE = 50;
