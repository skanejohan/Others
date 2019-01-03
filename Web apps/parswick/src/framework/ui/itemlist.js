import { ItemElement } from "./elements/item.js";
import { Utils } from "./utils.js";

export { ItemListUI } ;

class ItemListUI {

    constructor(engine, context, x, y, w, h, caption) {
        this.engine = engine;
        this.context = context;
        this.items = [];

        this.engine.add(new Rect(x, y, w, h, COLOR));
        this.engine.add(new TextSegment(x+10, y+26, w, 20, caption, FONT, COLOR));

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.yDelta = 30;
    }

    addItem(item) {
        let x = this.x + 20;
        let y = this.y + this.yDelta;
        let w = this.w - 40;
        let h = 26;
        item.element = new ItemElement(x, y, w, h, item.caption);
        Utils.addMenuTo(item.element);
        Utils.setVerbs(item.element, item, this.context);
        this.items.push(item.element);
        this.engine.add(item.element);
        item.element.fadeIn(FADETIME);
        this.yDelta += 30;
    }

    addItems(items) {
        items.forEach(i => {this.addItem(i); console.log(i.caption);});
    }

    removeItem(item) {
        item.finishAfterAnimations = true;
        item.fadeOut(FADETIME);
    }

    clear() {
        this.items.forEach(i => this.removeItem(i));
        this.items = [];
        this.yDelta = 30;
    }
}
