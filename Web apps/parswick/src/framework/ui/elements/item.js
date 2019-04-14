export { ItemElement } ;

class ItemElement extends CompositeElementBase {
    constructor(x, y, w, h, caption, color, frameColor) {
        super(x, y, w, h);
        this.caption = caption;
        this.frame = new FillRoundRect(x, y, w, h, 5, color || LAYER1COLOR);
        this.addElement(this.frame);
        this.addElement(new FillRoundRect(x+3, y+3, w-6, h-6, 2, frameColor || LAYER1FRAMECOLOR));
        this.addElement(new Text(x+6, y+4, w-12, h-12, caption, FONT, "black", 
            HorizontalAlignment.CENTER, VerticalAlignment.MIDDLE));
    }

    _doDraw(ctx) {
        if (this.hovering()) {
            this.frame.style = "white";
        }
        else {
            this.frame.style = LAYER1COLOR;
        }
        super._doDraw(ctx);
    }
}
