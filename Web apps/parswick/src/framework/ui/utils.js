import { MenuElement } from "./elements/menu.js";

export { Utils, BACKGROUNDLAYERINDEX, ELEMENTBASELAYERINDEX };

class Utils {

    static addMenuTo(element) {
        element.popup = new MenuElement(element.caption);
    }

    static setVerbs(element, item, context) {
        element.popup.clear();
        item.getVerbs(context).forEach(v => {
            element.popup.addItem(item[v].caption, () => {
                item[v](context);
            });
        });
    }

    static visiblePositionedItemsAndCharactersHere(context) {
        let location = context.location(context.currentLocation);
        let allItemsHere = context.getItems(location.containedItems);
        let allCharactersHere = context.getCharacters(location.containedCharacters);
        return (allItemsHere.concat(allCharactersHere)).filter(i => i.isVisible && location.positions[i.name] && !i.isDoor && !i.isWindow);
    }

    static visibleUnpositionedItemsAndCharactersHere(context) {
        let location = context.location(context.currentLocation);
        let allItemsHere = context.getItems(location.containedItems);
        let allCharactersHere = context.getCharacters(location.containedCharacters);
        return allItemsHere.concat(allCharactersHere).filter(i => i.isVisible && !location.positions[i.name] && !i.isDoor && !i.isWindow);
    }

    static doorsAndWindowsHere(context) {
        let location = context.location(context.currentLocation);
        let allItemsHere = context.getItems(location.containedItems);
        return allItemsHere.filter(i => i.isVisible && (i.isDoor || i.isWindow));
    }
}

const BACKGROUNDLAYERINDEX = 0;
const ELEMENTBASELAYERINDEX = 1;