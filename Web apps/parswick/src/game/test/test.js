uiTest = function() {
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
    test.addClickElementMenu("safe", "Enter combination");
    test.addClickCombinationLockButton("1");
    test.addClickCombinationLockButton("9");
    test.addClickCombinationLockButton("7");
    test.addClickCombinationLockButton("9");
    test.addClickElementMenu("metalBox", "Drop");
    test.addClickElementMenu("safe", "Open");
    test.addClickElementMenu("houseHistoryBook", "Take");
    test.addClickArrow("N");
    test.addClickArrow("N");
    test.addClickArrow("W");
    test.addClickArrow("W");
    test.addClickElementMenu("languageShelf", "Examine");
    test.addClickElementMenu("latinDictionary", "Take");
    test.addClickElementMenu("houseHistoryBook", "Examine");
    test.addClickArrow("E");
    test.addClickArrow("E");
    test.addClickArrow("S");
    test.addClickElementMenu("historyBookshelf", "Examine");
    test.addClickElementMenu("historyBookshelf", "Empty");
    test.addClickElementMenu("historyBookshelf", "Pull");
    test.addClickElementMenu("wall", "Examine");
    test.runActions();
}


test = function() {
    window.app.applyState(
        "move-kitchen,open-cupboard,take-cup,take-officeDoorKey,move-fictionSection,move-artSection," + 
        "move-historySection,unlock-officeDoor,open-officeDoor,move-office,open-cabinet,take-metalBox," +
        "examine-desk,open-drawer,take-paperClip,pick-metalBox,enterCombination-safe,applyCombination-safe-1979," + 
        "drop-metalBox,open-safe,take-houseHistoryBook,move-historySection,move-artSection,move-fictionSection," + 
        "move-travelSection,examine-languageShelf,take-latinDictionary,examine-houseHistoryBook,move-fictionSection," + 
        "move-artSection,move-historySection,examine-historyBookshelf,empty-historyBookshelf,pull-historyBookshelf," + 
        "examine-wall")
}

class Test {
    constructor(app) {
        this.app = app;
        this.actions = [];
    }

    saveAndModifyEnvironment() {
        this.app.ui.messagesUI.maxMessageLength = 1;
        this.oldMessageTimeMs = this.app.ui.messagesUI._messageTimeMs;
        this.app.ui.messagesUI._messageTimeMs = () => 200;
        this.oldGetMousePos = ElementBase.getMousePos;
    }

    restoreEnvironment() {
        ElementBase.getMousePos = this.oldGetMousePos;
        this.app.ui.messagesUI._messageTimeMs = this.oldMessageTimeMs;
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

    addClickCombinationLockButton(digit) {
        this.actions.push(() => {
            var b = this.findCombinationLockButton(digit);
            this.highlight(b);
            return 200; 
        });
        this.actions.push(() => {
            this.app.ui.canvas._onclick();
            this.moveTo(0, 0);
            return 200;
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
        if (!element) {
            element = this.app.ui.itemsHereUI.itemElements.find(e => e.item.name == itemName);
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

    findCombinationLockButton(digit) {
        return this.app.ui.combinationLockUI.lockElements.find(e => {
            var te = e._textElement;
            if (!te) {
                return false;
            }
            return te.elements[0].text == digit;
        });
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
