doTest = function() {
    var test = new Test(window.app);
    test.addClickArrow("S");
    test.addClickElementMenu("cupboard", "Open");
    test.addClickElementMenu("cup", "Take");
    test.addClickElementMenu("officeDoorKey", "Take");
    test.addClickArrow("N");
    test.addClickArrow("E");
    test.addClickArrow("S");
    test.addClickElementMenu("officeDoor", "Unlock");
    test.addClickElementMenu("officeDoor", "Open");
    test.addClickArrow("officeDoor");
    test.addClickElementMenu("cabinet", "Open");
    test.addClickElementMenu("metalBox", "Take");
    test.addClickElementMenu("desk", "Examine");
    test.addClickElementMenu("drawer", "Open");
    test.addClickElementMenu("paperClip", "Take");
    test.addClickElementMenu("metalBox", "Pick");
    test.runActions();
}

class Test {
    constructor(app) {
        this.app = app;
        this.actions = [];
    }

    saveAndModifyEnvironment() {
        this.app.ui.messagesUI.maxMessageLength = 1;
        this.oldGetMousePos = ElementBase.getMousePos;

    }

    restoreEnvironment() {
        ElementBase.getMousePos = this.oldGetMousePos;
        this.app.ui.messagesUI.maxMessageLength = 3;
    }

    addClickArrow(arrowName) {
        this.actions.push(() => {
            console.log(arrowName);
            this.highlight(this.findArrow(arrowName));
            return 100; 
        });
        this.actions.push(() => {
            this.app.ui.canvas._onclick();
            this.moveTo(0, 0);
            return 500;
        })
    }

    addClickElementMenu(itemName, menuCaption) {
        this.actions.push(() => {
            this.highlight(this.findElement(itemName));
            return 500; 
        });
        this.actions.push(() => {
            var item = this.findElement(itemName);
            if (item && item.popup && item.popup.elements) {
                this.highlight(this.findMenuElement(menuCaption, item.popup.elements));
            }
            return 500; 
        });
        this.actions.push(() => {
            this.app.ui.canvas._onclick();
            this.moveTo(0, 0);
            return 1000;
        })
    }

    runActions(skipSaveEnvironment) {
        if (!skipSaveEnvironment) {
            this.saveAndModifyEnvironment();
        }
        var action = this.actions.shift();
        if (action) {
            var timeOut = action();
            setTimeout(() => this.runActions(true), timeOut);
        }
        else {
            this.restoreEnvironment();
        }
    }

    click() {
        this.app.ui.canvas._onclick();
    }

    findElement(itemName) {
        var element = this.app.ui.locationUI.itemElements.find(i => i.item.name == itemName);
        if (!element) {
            element = this.app.ui.locationUI.doorElements[itemName];
        }
        if (!element) {
            element = this.app.ui.inventoryUI.itemElements.find(e => e.item.name == itemName);
        }
        return element;
    }

    findMenuElement(menuCaption, menuElements) {
        for (var i = 0; i < menuElements.length; i++) {
            var e = menuElements[i];
            if (e.elements && e.elements.length > 0 && e.elements[0].text == menuCaption) {
                return e;
            }
        }
    }

    findArrow(arrowName) {
        var arrow = this.app.ui.locationUI.arrowElements[arrowName];
        if (!arrow) {
            arrow = this.app.ui.locationUI.doorElements[arrowName].arrowElement;
        }
        return arrow;
    }

    highlight(element) {
        if (element) {
            this.moveTo(element.x + element.w / 2, element.y + element.h / 2);
        }   
    }

    moveTo(x, y) {
        ElementBase.getMousePos = () => { return { x : x, y : y } };
    }
}
