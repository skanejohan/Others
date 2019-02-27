export { Utils, BACKGROUNDLAYERINDEX, ELEMENTBASELAYERINDEX };

class Utils {

    static addMenuTo(element) {
        element.popup = new Menu(0, 0, 300, "16px arial", "black", "gray", 28, 2);
    }

    static setVerbs(element, item, context) {
        element.popup.clear();
        item.getVerbs(context).forEach(v => {
            element.popup.addItem(item[v].caption, () => {
                item[v](context);
            });
        });
    }

    static visiblePositionedItemsHere(context) {
        let location = context.location(context.currentLocation);
        let allItemsHere = context.getItems(location.containedItems);
        return allItemsHere.filter(i => i.isVisible && location.itemPositions[i.name]);
    }

    static visibleUnpositionedItemsHere(context) {
        let location = context.location(context.currentLocation);
        let allItemsHere = context.getItems(location.containedItems);
        return allItemsHere.filter(i => i.isVisible && !location.itemPositions[i.name] && !i.isDoor && !i.isWindow);
    }

    static doorsAndWindowsHere(context) {
        let location = context.location(context.currentLocation);
        let allItemsHere = context.getItems(location.containedItems);
        return allItemsHere.filter(i => i.isVisible && (i.isDoor || i.isWindow));
    }
}

const BACKGROUNDLAYERINDEX = 0;
const ELEMENTBASELAYERINDEX = 1;