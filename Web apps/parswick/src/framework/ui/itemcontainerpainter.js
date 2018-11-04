import { BasePainter } from "./basepainter.js";
import { ListItemPainter } from "./itempainter.js";

export { ItemContainerPainter };

class ItemContainerPainter extends BasePainter {

    register(x, y, w, h, caption, items, name) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.yDelta = 30;
        this.engine.add(new Rect(x, y, w, h, COLOR));
        this.engine.add(this._createText(x+10, y+26, w, 20, caption));
    }

    showItem(name) {
        this._showItem(this.context.getItem(name));
    }
    
    hideItem(name) {
        this._hideItem(this.context.getItem(name));
    }
    
    _showItem(item) {
        item.painter = new ListItemPainter(this.engine, this.elements, this.context, item, 
            this.x + 20, this.y + this.yDelta, this.w - 40, 26);
        this.yDelta += 30;
        item.painter.register();
    }

    _hideItem(item) {
        item.painter.unregister(item);
        item.painter = null;
    }

}