import { ButtonElement } from "./elements/button.js"

export { TitleUI };

class TitleUI {
    constructor(engine, context, x, y, w, h, radius, bgColor, fgColor, onHide) {
        this.engine = engine;
        this.context = context;
        this.dimensions = { x: x, y: y, w: w, h: h };
        this.frame = new FillRoundRect(x, y, w, h, radius, fgColor);
        this.background = new FillRoundRect(x+3, y+3, w-6, h-6, radius, bgColor);
        this.onHide = onHide;

        this.btn = new ButtonElement(
            this.dimensions.x + this.dimensions.w - 120, 
            this.dimensions.y + this.dimensions.h - 50, 
            100, 30, "Continue", () => { this.hide(); });
    }

    display(title) {
        this.title = new Text(title.x, title.y, 200, 40, title.text, FONT, LAYER1FRAMECOLOR);
        this.engine.addModal(this.frame);
        this.engine.addModal(this.background);
        this.engine.addModal(this.title);
        this.engine.addModal(this.btn);
    }

    hide() {
        this.engine.remove(this.frame);
        this.engine.remove(this.background);
        this.engine.remove(this.title);
        this.engine.remove(this.btn);
        this.onHide();
    }
}

