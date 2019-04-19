export { ConversationUI };

class ConversationUI {
    constructor(engine, x, y, w, h, radius, bgColor, fgColor) {
        this.engine = engine;
        this.dimensions = { x: x, y: y, w: w, h: h };
        this.frame = new FillRoundRect(x, y, w, h, radius, fgColor);
        this.background = new FillRoundRect(x+3, y+3, w-6, h-6, radius, bgColor);
    }

    startConversation() {
        this.engine.addModal(this.frame);
        this.engine.addModal(this.background);
    }

    close() {
        this.engine.remove(this.frame);
        this.engine.remove(this.background);
    }
}
