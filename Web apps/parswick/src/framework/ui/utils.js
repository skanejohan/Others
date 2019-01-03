export { Utils };

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

}
