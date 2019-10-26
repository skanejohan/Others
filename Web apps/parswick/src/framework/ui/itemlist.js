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

        this.upButton = new ArrowElement(x+w-37, y+11, false, () => this.scrollDown());
        this.upButtonVisible = false;

        this.downButton = new ArrowElement(x+w-37, y+h-20, true, () => this.scrollUp());
        this.downButtonVisible = false;

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
        this.updateScrollButtons();
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
        var indent = 20 * (this._getIndentation(item) + 1);
        let elem = new ItemElement(this.x + indent, this.y, this.w - 20 - indent, 26, item.caption); 
        Utils.addMenuTo(elem);
        Utils.setVerbs(elem, item, this.context);
        item.element = elem;
        elem.item = item;
        this.items.push(item);
    }

    _getIndentation(item, indentation) {
        indentation = indentation || 0;
        if (item.container) {
            var container = this.context.item(item.container);
            return container ? this._getIndentation(container, indentation+1) : indentation;
        }
        return indentation;
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

    updateScrollButtons() {
        var downShouldBeVisible = this.items.length > this.firstVisibleItem + this.maxVisibleItems;
        var upShouldBeVisible = this.firstVisibleItem > 0;
        if (downShouldBeVisible && !this.downButtonVisible) {
            this.engine.add(this.downButton);
            this.downButtonVisible = true;
        }
        if (!downShouldBeVisible && this.downButtonVisible) {
            this.engine.remove(this.downButton);
            this.downButtonVisible = false;
        }
        if (upShouldBeVisible && !this.upButtonVisible) {
            this.engine.add(this.upButton);
            this.upButtonVisible = true;
        }
        if (!upShouldBeVisible && this.upButtonVisible) {
            this.engine.remove(this.upButton);
            this.upButtonVisible = false;
        }
    }

    _itemAtIndexShouldBeVisible(idx) {
        return idx >= this.firstVisibleItem && idx < this.firstVisibleItem + this.maxVisibleItems;
    }

    scrollUp() {
        if (this.items.length > this.firstVisibleItem + this.maxVisibleItems) {
            this.firstVisibleItem += 1;
            this.updateVisibleElementList();
        }
    }

    scrollDown() {
        if (this.firstVisibleItem > 0) {
            this.firstVisibleItem -= 1;
            this.updateVisibleElementList();
        }
    }
}

class ArrowElement extends EdgeElement {
    constructor(x, y, down, onclick) {
        super(x, y, 30, 15, onclick);
        var outerEdge = down ? flipEdge(OUTEREDGE) : OUTEREDGE;
        var innerEdge = down ? flipEdge(INNEREDGE) : INNEREDGE;
        this.addEdge(outerEdge, ctx => this.hovering() ? ctx.fillStyle = "white" : LAYER1COLOR);
        this.addEdge(innerEdge, _ => LAYER1FRAMECOLOR);

        this.addClickRect(this.x + 3, this.y + 5, this.x + 27, this.y + 15);
    }
}

const OUTEREDGE = [
        { type: "move", pc1: 5, pc2: 15 },
        { type: "line", pc1: 25, pc2: 15 },
        { type: "qc", cc1: 29, cc2: 13, pc1: 25, pc2: 10},
        { type: "line", pc1: 17, pc2: 5 },
        { type: "qc", cc1: 15, cc2: 4, pc1: 13, pc2: 5},
        { type: "line", pc1: 5, pc2: 10 },
        { type: "qc", cc1: 1, cc2: 13, pc1: 5, pc2: 15},
    ];

const INNEREDGE = [
        { type: "move", pc1: 8, pc2: 13 },
        { type: "line", pc1: 22, pc2: 13 },
        { type: "qc", cc1: 26, cc2: 11, pc1: 24, pc2: 12},
        { type: "line", pc1: 17, pc2: 8 },
        { type: "qc", cc1: 15, cc2: 7, pc1: 13, pc2: 8},
        { type: "line", pc1: 6, pc2: 12 },
        { type: "qc", cc1: 4, cc2: 11, pc1: 8, pc2: 13},
    ];

function flipEdge(edge) {
    return edge.map(obj => {
        return { type: obj.type, pc1: obj.pc1, pc2: 20-obj.pc2, cc1: obj.cc1, cc2: 20-obj.cc2 };
    });
}