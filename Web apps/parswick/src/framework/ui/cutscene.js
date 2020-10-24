import { ButtonElement } from "./elements/button.js"

export { CutsceneUI };

class CutsceneUI {
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

    display(text) {
        var paragraphDistance = 10;
        var totalHeight = 0;
        this.textBoxes = [];

        text.split("<br>").forEach(t => {
            var textBox = new TextBox(
                this.dimensions.x + 20, this.dimensions.y + 20, 
                this.dimensions.w - 40, 0, t, FONT, 
                LAYER1FRAMECOLOR, "black"); 
            totalHeight += textBox.h;
            this.textBoxes.push(textBox);
        });
        totalHeight += (this.textBoxes.length-1) * paragraphDistance;

        var top = (this.dimensions.h - totalHeight) / 2;
        this.textBoxes.forEach(tb => {
            tb.y = top;
            top += tb.h + paragraphDistance;
        });

        this.engine.addModal(this.frame);
        this.engine.addModal(this.background);
        this.textBoxes.forEach(tb => this.engine.addModal(tb));
        this.engine.addModal(this.btn);
    }

    hide() {
        this.engine.remove(this.frame);
        this.engine.remove(this.background);
        this.textBoxes.forEach(tb => this.engine.remove(tb));
        this.engine.remove(this.btn);
        this.onHide();
    }
}

