import { addItemElements, removeItemElements } from "./itemcalculator.js";
import { ELEMENTBASELAYERINDEX } from "./utils.js";

export { ItemListUI } ;

class ItemListUI {

    constructor(engine, context, x, y, w, h, caption) {
        this.engine = engine;
        this.context = context;
        this.itemElements = [];

        this.engine.add(new Rect(x, y, w, h, COLOR), ELEMENTBASELAYERINDEX);
        this.engine.add(new TextSegment(x+10, y+26, w, 20, caption, FONT, COLOR), ELEMENTBASELAYERINDEX);

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.yDelta = 30;
    }

    removeElementsForNoLongerVisibleItems(items) {
        removeItemElements(items, this.itemElements);
        this.yDelta = 30;
        this.itemElements.forEach(e => {
            e.y = this.y + this.yDelta;
            this.yDelta += 30;
        });
    }

    addElementsForNowVisibleItems(items) {
        addItemElements(items, this.itemElements, 
            _ => {
                let x = this.x + 20;
                let y = this.y + this.yDelta;
                let w = this.w - 40;
                let h = 26;
                this.yDelta += 30;
                return { x: x, y: y, w: w, h: h, layerIndex: ELEMENTBASELAYERINDEX + 1 };
            }, 
            this.engine, this.context);
    }
}
