export { BasePainter };

class BasePainter {

    constructor(engine, elements, context) {
        this.elements = elements;
        this.engine = engine;
        this.context = context;
    }

    // A text
    _createText(x, y, w, h, caption) {
        return new TextSegment(x, y, w, h, caption, FONT, COLOR);
    }

    // An unfilled rectangle
    _createRect(x, y, w, h, onclick) {
        return new Rect(x, y, w, h, "#ecd9c6", onclick);
    }

    // An unfilled rectangle with text inside
    _createTextRect(x, y, w, h, text, onclick) {
        return new TextRect(x, y, w, h, text, 0 /*margin*/, FONT, COLOR, COLOR, HorizontalAlignment.CENTER, VerticalAlignment.MIDDLE, onclick);
    }

    // A rectangle, expanding down to accomodate the text, with background color.
    _createTextBox(x, y, w, text, fgColor, bgColor, onclick) {
        return new TextBox(x, y, w, 0, text, FONT, fgColor, bgColor, onclick); // TODO should be black on COLOR
    }

    _addRect(x, y, w, h, name, onclick) {
        var r = this._createRect(x, y, w, h, onclick);
        this.elements[name] = r;
        this.engine.add(r);
        return r;
    }

    // An unfilled rectangle with a hint
    _addRectWithHint(x, y, w, h, name, hint) {
        var r = this._addRect(x, y, w, h, name);
        r.popup = this._createTextBox(0, 0, 300, hint, HINTCOLOR, COLOR);
        return r;
    }
    
    // _addTextRectWithMenu(x, y, w, h, name, hint) { // TODO
    //     var r = this._addRect(x, y, w, h, name);
    //     var menu = new Menu(0, 0, 300, "16px arial", "black", "gray", 28, 2);
    //     menu.addItem(hint);
    //     r.popup = menu;
    // }
}
