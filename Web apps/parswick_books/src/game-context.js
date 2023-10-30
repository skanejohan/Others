var gameContext = {
    currentLocation: fictionSection,
    message: undefined,
    messageRemainingMs: 0,
    clickedLocationPos: undefined,
    activeItem: undefined,
    inventory: [],

    update(ms) {
        if (this.clickedLocationPos) {
            var pos = this.clickedLocationPos;
            this.clickedLocationPos = undefined;
            for (let i = 0; i < this.currentLocation.exits.length; i++) {
                var e = this.currentLocation.exits[i];
                if (insideRect(pos, e.rect)) {
                    this.currentLocation = e.leadsTo;
                    return;
                }
            }
            this.currentLocation.update(pos);
        }

        if (this.message) {
            this.messageRemainingMs -= ms;
            if (this.messageRemainingMs < 0) {
                this.messageRemainingMs = undefined;
                this.message = undefined;
            }
        }

        if (this.activeItemShouldBeDropped) {
            this.activeItem = undefined;
        }
    },

    render() {
        var pos = mousePosInLocation();

        // Draw the location
        context.drawImage(this.currentLocation.image, 0, 0);
            for (let i = this.currentLocation.objects.length - 1; i >= 0; i--) {
                var o = this.currentLocation.objects[i];
                if (hasObject(o, this.currentLocation.objects) && o.image) {
                    context.drawImage(o.image, 600 + o.rect.left, 300 + o.rect.top);
                }
            }

        // Draw descrition for hovered object in location
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
        });

        // Draw descrition for hovered object in inventory
        for (let i = 0; i < this.inventory.length; i++) {
            let item = this.inventory[i];
            var left = 100 + i * 40;
            var top = 100;
            context.drawImage(item.image, left, top);
            if (insideRect(mousePos, { left: left, top: top, right: left + 40, bottom: top + 40 })) {
                drawDescription(item.description);
            }
        }

        // Draw message
        if (this.message) {
            drawMessage(this.message);
        }

        // Draw custom cursor if any item is active
        if (this.activeItem) {
            context.drawImage(this.activeItem.image, mousePos.x - this.activeItem.image.width / 2, mousePos.y - this.activeItem.image.height / 2);
        }
    },

    click()
    {
        this.activeItemShouldBeDropped = true;
        var pos = mousePosInLocation();
        if (pos)
        {
            this.clickedLocationPos = pos;
        }
        
        for (let i = 0; i < this.inventory.length; i++) {
            let item = this.inventory[i];
            var left = 100 + i * 40;
            var top = 100;
            if (insideRect(mousePos, { left: left, top: top, right: left + 40, bottom: top + 40 })) {
                this.activeItemShouldBeDropped = false;
                this.activeItem = item;
            }
        }
    },

    mouseMove(e)
    {
        var rect = canvas.getBoundingClientRect();
        mousePos = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
    },
}

