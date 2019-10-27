export { MultiLineItemElement } ;

class MultiLineItemElement extends CompositeElementBase {
    constructor(x, y, w, h, caption, color, frameColor) {
        super(x, y, w, h);
        this.caption = caption;
        this.frame = new FillRoundRect(x, y, w, h, 5, color || LAYER1COLOR);
        this.addElement(this.frame);
        this.addElement(new FillRoundRect(x+3, y+3, w-6, h-6, 2, frameColor || LAYER1FRAMECOLOR));

        if (caption == "") {
            return;
        }

        const textHeight = 15;
        var texts = caption.split("<br>");
        var dY = (h - texts.length * textHeight) / 2 - textHeight / 4;
        texts.forEach(t => {
            var textBox = new Text(x+6, y+dY, w-12, textHeight, t, FONT, "black", HorizontalAlignment.CENTER);
            this.addElement(textBox);
            dY += textHeight;
        });
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
