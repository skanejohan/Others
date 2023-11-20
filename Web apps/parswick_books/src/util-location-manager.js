createLocationManager = (image, objects, exits) => {
    let getRect = o => yOffsetRect(o.rect, Constants.locationTop);
    let isHovered = o => insideRect(Globals.mouse.pos(), getRect(o));

    return {
        render: () => {
            let hasDrawnDescription = false;
            Globals.drawContext.drawImage(image, Constants.locationLeft, Constants.locationTop, 320, 100);
        
            objects.forEachReversed(o => {
                Globals.drawContext.drawImageR(o.image, getRect(o));
                if (isHovered(o) && !hasDrawnDescription) {
                    Globals.drawContext.drawDescription(o.description);
                    hasDrawnDescription = true;
                }
            });

            exits.forEach(e => {
                Globals.drawContext.drawImageR(e.image, getRect(e));
                if (isHovered(e)) {
                    Globals.drawContext.drawDescription(`This exit leads to the ${e.leadsTo.getName()}`);
                }
            });
        },

        update: () => {
            if (Globals.mouse.isClicked()) {
                exits.forEach(e => {
                    if (isHovered(e)) {
                        Globals.location = e.leadsTo;
                        Globals.mouse.setClicked(false);
                    }
                });
            }
        },

        hoveredObject: () => {
            var obj = undefined;
            objects.forEachReversed(o => {
                if (isHovered(o) && obj == undefined) {
                    obj = o;
                }
            });
            return obj;
        }
    }
}