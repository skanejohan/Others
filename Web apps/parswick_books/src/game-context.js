var gameContext = {
    message: [],
    messageRemainingMs: 0,
 
    update(ms) {
        combinationLock.update();
        
        Globals.inventory.update();
        Globals.location.update();
        
        if (this.messageRemainingMs > 0) {
            this.messageRemainingMs -= ms;
            if (this.messageRemainingMs <= 0) {
                this.messageRemainingMs = 0;
                this.message = [];
            }
        }

        if (Globals.mouse.isClicked()) {
            Globals.inventory.dropActiveItem();
            Globals.mouse.setClicked(false);
        }
    },

    render() {
        Globals.drawContext.clear();
        Globals.location.render();
        drawMessage(this.message);
        Globals.inventory.render();
        combinationLock.render();
    },

    click() {
        Globals.mouse.setClicked(true);
    },

}

