import { ItemElement } from "./elements/item.js";
import { ArrayUtils } from "../../_include/arrayutils.js";
import { Utils, ELEMENTBASELAYERINDEX } from "./utils.js";

export { ItemListUI } ;

class ItemListUI {

    constructor(engine, context, x, y, w, h, caption) {
        this.engine = engine;
        this.context = context;
        this.items = [];

        this.engine.add(new Rect(x, y, w, h, LAYER1COLOR), ELEMENTBASELAYERINDEX);
        this.engine.add(new TextSegment(x+10, y+26, w, 20, caption, FONT, LAYER1COLOR), ELEMENTBASELAYERINDEX);

        this.upButton = new TextSegment(x+w-17, y+15, w, 20, "U", FONT, LAYER1COLOR, () => this.scrollDown()), ELEMENTBASELAYERINDEX;
        this.engine.add(this.upButton);

        this.downButton = new TextSegment(x+w-17, y+h-5, w, 20, "D", FONT, LAYER1COLOR, () => this.scrollUp()), ELEMENTBASELAYERINDEX;
        this.engine.add(this.downButton);

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.firstVisibleItem = 0;
        this.maxVisibleItems = 4;
        this.actions = [];
    }

    removeElementsForNoLongerVisibleItems(items) {
        var visibleItems = items.filter(i => i.isVisible);
        this.items.filter(i => visibleItems.indexOf(i) == -1).forEach(i => this._remove(i));
    }

    addElementsForNowVisibleItems(items) {
        var visibleItems = items.filter(i => i.isVisible);
        visibleItems.filter(i => this.items.indexOf(i) == -1).forEach(i => this._add(i));
    }

    updateVisibleElementList() {
        this.packList();
    }

    // Remove item from items list and if it is visible, fade it out.
    _remove(item) {
        ArrayUtils.remove(this.items, item);
        if (item.element.isVisibleInList) {
            this.engine.remove(item.element);    
        }    
        item.element = undefined;
    }

    // Create an element, connect item and element, and add the item to the items list
    _add(item) {
        let elem = new ItemElement(this.x + 20, this.y, this.w - 40, 26, item.caption); 
        Utils.addMenuTo(elem);
        Utils.setVerbs(elem, item, this.context);
        item.element = elem;
        elem.item = item;
        this.items.push(item);
    }

    // Make sure that all items in the list have the proper y coordinate, and that the correct items are shown
    packList() {
        var dy = 30 - (30 * this.firstVisibleItem);
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            item.element.y = this.y + dy;
            if (item.element.isVisibleInList && !this._itemAtIndexShouldBeVisible(i)) {
                this.engine.remove(item.element);    
                item.element.isVisibleInList = false;
            }
            if (!item.element.isVisibleInList && this._itemAtIndexShouldBeVisible(i)) {
                this.engine.add(item.element, ELEMENTBASELAYERINDEX + 1);
                item.element.isVisibleInList = true;
            }
            dy += 30;
        }
    }

    _itemAtIndexShouldBeVisible(idx) {
        return idx >= this.firstVisibleItem && idx < this.firstVisibleItem + this.maxVisibleItems;
    }

    scrollUp() {
        if (this.items.length > this.firstVisibleItem + this.maxVisibleItems) {
            this.firstVisibleItem += 1;
            this.packList();
        }
    }

    scrollDown() {
        if (this.firstVisibleItem > 0) {
            this.firstVisibleItem -= 1;
            this.packList();
        }
    }
}
