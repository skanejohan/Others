import { BasePainter } from "./basepainter.js";
import { WallPainter } from "./wallpainter.js";
import { PositionedItemPainter } from "./itempainter.js";

export { LocationPainter };

class LocationPainter extends BasePainter {

    register(location) {
        this.location = location;
        let caption = new Text(70, 25, 100, 20, location.caption, "16px Caudex", "#ecd9c6");
        this.elements["location.caption"] = caption;
        this.engine.add(caption);

        new WallPainter(this.engine, this.elements, this.context).register(location, "N");
        new WallPainter(this.engine, this.elements, this.context).register(location, "E");
        new WallPainter(this.engine, this.elements, this.context).register(location, "S");
        new WallPainter(this.engine, this.elements, this.context).register(location, "W");

        this._showItems(location.containedItems, location.itemPositions);
    }

    showContainedItems(name) {
        var container = this.context.getItem(name);
        this._showItems(container.containedItems, this.location.itemPositions);
    }

    hideContainedItems(name) {
        var container = this.context.getItem(name);
        this._hideItems(container.containedItems, this.location.itemPositions);
    }

    showItem(name) {
        this._showItem(this.context.getItem(name));
    }
    
    hideItem(name) {
        this._hideItem(this.context.getItem(name));
    }
    
    _showItems(items, itemPositions) {
        this.context.getAllItems(items, itemPositions)
        .filter(item => item.position)
        .filter(item => item.isVisible)
        .forEach(item => this._showItem(item));
    }

    _hideItems(items, itemPositions) {
        this.context.getAllItems(items, itemPositions)
        .filter(item => item.position)
        .forEach(item => this._hideItem(item));
    }

    _showItem(item) {
        item.painter = new PositionedItemPainter(this.engine, this.elements, this.context, item);
        item.painter.register();
    }

    _hideItem(item) {
        item.painter.unregister(item);
        item.painter = null;
    }

}
