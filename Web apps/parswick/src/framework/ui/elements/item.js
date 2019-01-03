export { ItemElement } ;

class ItemElement extends CompositeElementBase {
    constructor(x, y, w, h, caption) {
        super(x, y, w, h);
        this.addElement(new FillRoundRect(x, y, w, h, 5, COLOR));
        this.addElement(new FillRoundRect(x+3, y+3, w-6, h-6, 2, DARKCOLOR));
        this.addElement(new Text(x+6, y+4, w-12, h-12, caption, FONT, "black", 
            HorizontalAlignment.CENTER, VerticalAlignment.MIDDLE));
    }
}
