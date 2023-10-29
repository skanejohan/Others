var gameContext = {
    currentLocation: fictionSection,

    update(ms) {
    },

    render() {
        
        // Render the location
        context.drawImage(this.currentLocation.image, 0, 0);
        var pos = mousePosInLocation();
        this.currentLocation.fixedObjects.forEach(o => {
            if (pos && pos.x > o.left && pos.y > o.top && pos.x < o.right && pos.y < o.bottom) {
                drawDescription(o.description);
            }
        });
        this.currentLocation.exits.forEach(e => {
            if (insideRect(pos, e.rect)) {
                drawDescription([ `This exit leads to the ${e.leadsTo.name}` ]);
            }
        });
    },

    click()
    {
        var pos = mousePosInLocation();
        for (let i = 0; i < this.currentLocation.exits.length; i++) {
            var e = this.currentLocation.exits[i];
            if (insideRect(pos, e.rect)) {
                this.currentLocation = e.leadsTo;
                break;
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

