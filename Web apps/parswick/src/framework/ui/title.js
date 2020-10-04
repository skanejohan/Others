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
    }

    display(title, app) {
        let x = this.dimensions.x;
        let w = this.dimensions.w;
        let c = x + w / 2;
        this.title = new Text(x, 100, w, 40, title.text, TITLEFONT, LAYER1FRAMECOLOR, HorizontalAlignment.CENTER);
        this.credits = new Text(x, 140, w, 40, title.creditsText, FONT, LAYER1FRAMECOLOR, HorizontalAlignment.CENTER);
        this.engine.addModal(this.frame);
        this.engine.addModal(this.background);
        this.engine.addModal(this.title);
        this.engine.addModal(this.credits);
        if (app.hasState(SAVESLOT)) {
            this.continueButton = new ButtonElement(c - 100, 200, 200, 30, "Continue game", () => { this.hide(true); });
            this.startNewButton = new ButtonElement(c - 100, 250, 200, 30, "Start new game", () => { this.hide(false); });
            this.engine.addModal(this.continueButton);
            this.engine.addModal(this.startNewButton);
        }
        else {
            this.startNewButton = new ButtonElement(c - 100, 200, 200, 30, "Start new game", () => { this.hide(false); });
            this.engine.addModal(this.startNewButton);
        }
    }

    hide(continuingGame) {
        this.engine.remove(this.frame);
        this.engine.remove(this.background);
        this.engine.remove(this.title);
        this.engine.remove(this.credits);
        this.engine.remove(this.startNewButton);
        if (this.continueButton) {
            this.engine.remove(this.continueButton);
        }
        this.onHide(continuingGame);
    }
}

