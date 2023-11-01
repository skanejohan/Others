var gameContext = {
    currentLocation: fictionSection,
    message: [],
    messageRemainingMs: 0,
    activeItem: undefined,
 
    update(ms) {
        combinationLock.update();
        inventory.update();

        if (Globals.mouseClicked) {
            var pos = mousePosInLocation();
            Globals.mouseClicked = false; // We have handled the click and no other object should
            for (let i = 0; i < this.currentLocation.exits.length; i++) {
                var e = this.currentLocation.exits[i];
                if (insideRect(pos, e.rect)) {
                    this.currentLocation = e.leadsTo;
                    return;
                }
            }
            this.currentLocation.update(pos);
        }

        if (this.messageRemainingMs > 0) {
            this.messageRemainingMs -= ms;
            if (this.messageRemainingMs <= 0) {
                this.messageRemainingMs = 0;
                this.message = [];
            }
        }

        if (this.activeItemShouldBeDropped) {
            this.activeItem = undefined;
        }

        Globals.mouseClicked = false;
    },

    render() {
        var pos = mousePosInLocation();

        // Draw the location
        context.drawImage(this.currentLocation.image, 0, 0);
            for (let i = this.currentLocation.objects.length - 1; i >= 0; i--) {
                var o = this.currentLocation.objects[i];
                if (Objects.has(o, this.currentLocation)) {
                    let r = o.rect;
                    if (o.image) {
                        context.drawImage(o.image, 600 + r.left, 300 + r.top);
                    }
                    if (Constants.renderDebugInformation) {
                        Draw.debugRectangle(600 + r.left, 300 + r.top, r.width, r.height);
                    }
                }
            }

        // Draw description for hovered object in location
        for (let i = 0; i < this.currentLocation.objects.length; i++) {
            var o = this.currentLocation.objects[i];
            if (insideRect(pos, o.rect) && !o.hidden) {
                drawDescription(o.description);
                break;
            }
        }

        // Draw description for hovered exit
        this.currentLocation.exits.forEach(e => {
            if (insideRect(pos, e.rect)) {
                drawDescription([ `This exit leads to the ${e.leadsTo.name}` ]);
            }
            if (Constants.renderDebugInformation) {
                Draw.debugRectangle(600 + e.rect.left, 300 + e.rect.top, e.rect.width, e.rect.height);
            }
        });

        inventory.render();
        combinationLock.render();

        // Draw message
        drawMessage(this.message);

        // Draw custom cursor if any item is active
        if (this.activeItem) {
            context.drawImage(this.activeItem.image, mousePos.x - this.activeItem.image.width / 2, mousePos.y - this.activeItem.image.height / 2);
        }
    },

    click() {
        Globals.mouseClicked = true;
        this.activeItemShouldBeDropped = true;
    },

    mouseMove(e) {
        var rect = canvas.getBoundingClientRect();
        mousePos = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
    },
}

