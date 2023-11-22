createLocationManager = (image, objects, exits) => {
    let yOffsetRect = (r, y) => { return { left: r.left, top: r.top + y, width: r.width, height: r.height }; }
    let getRect = o => yOffsetRect(o.rect, Constants.locationTop); 
    let isHovered = o => insideRect(GameContext.mouse().pos(), getRect(o)) && !o.isPassive;

    return {
        render: () => {
            let hasDrawnDescription = false;
            GameContext.drawContext().drawImage(image, Constants.locationLeft, Constants.locationTop, 320, 100);
        
            objects.forEachReversed(o => {
                GameContext.drawContext().drawImageR(o.image, getRect(o));
                if (isHovered(o) && !hasDrawnDescription) {
                    GameContext.drawContext().drawDescription(o.description);
                    hasDrawnDescription = true;
                }
            });

            exits.forEach(e => {
                GameContext.drawContext().drawImageR(e.image, getRect(e));
                if (isHovered(e)) {
                    GameContext.drawContext().drawDescription(`This exit leads to the ${e.leadsTo.getName()}`);
                }
            });
        },

        update: () => {
            if (GameContext.mouse().isClicked()) {
                exits.forEach(e => {
                    if (isHovered(e)) {
                        GameContext.setLocation(e.leadsTo);
                        GameContext.mouse().setClicked(false);
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