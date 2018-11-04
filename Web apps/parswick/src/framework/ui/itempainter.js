import { BasePainter } from "./basepainter.js";

export { ListItemPainter, PositionedItemPainter };

class ItemPainterBase extends BasePainter {

    constructor(engine, elements, context, item, x, y, w, h) {
        super(engine, elements, context);

        this.item = item;
        this.menu = new Menu(0, 0, 300, "16px arial", "black", "gray", 28, 2);
        this.textRect = this.createItemRect(
            x || item.position.x, y || item.position.y, 
            w || item.position.w, h || item.position.h, 
            item.caption);
        this.textRect.popup = this.menu;
    }

    updateVerbs() {
        this.menu.clear(); // TODO don't recreate existing items
        this.item.getVerbs(this.context).forEach(v => {
            this.menu.addItem(this.item[v].caption, () => {
                this.item[v](this.context);
            });
        })
    }

    move(x, y) {
        this.textRect.x = x;
        this.textRect.y = y;
    }

    register() {
        this.engine.add(this.textRect);
        this.updateVerbs();
    }

    unregister() {
        this.engine.remove(this.textRect);
    }
}

class PositionedItemPainter extends ItemPainterBase {

    createItemRect(x, y, w, h, caption) {
        return this._createTextRect(x, y, w, h, caption);
    }

}

class ListItemPainter extends ItemPainterBase {

    createItemRect(x, y, w, h, caption) {
        return new TextRect(x, y, w, h, caption, 0 /*margin*/, FONT, COLOR, COLOR, 
            HorizontalAlignment.CENTER, VerticalAlignment.MIDDLE);
    }

}

