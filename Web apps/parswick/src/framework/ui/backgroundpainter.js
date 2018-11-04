import { BasePainter } from "./basepainter.js";

export { BackgroundPainter };

class BackgroundPainter extends BasePainter {

    register() {
        let e = new FillRoundRect(10, 10, 780, 430, 30, "black");
        this.elements["background"] = e;
        this.engine.add(e);
    }

}