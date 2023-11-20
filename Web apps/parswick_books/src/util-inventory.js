createInventory = () => {
    let activeObject = undefined;
    let objects = createObjectList();
    let forEachObject = fn => {
        let x = 10, y = 10;
        objects.forEachReversed(o => {
            fn(o, { left: x, top: y, width: 10, height: 10 });
            x += 10;
        });
    }
    let isHovered = r => insideRect(Globals.mouse.pos(), r);
    let hoveredObject = () => {
        var result = undefined;
        forEachObject((o, r) => {
            if (isHovered(r)) {
                result = o;
            }
        });
        return result;
    }
    let activeItemMayBeDropped = false;

    return {
        add: o => objects.add(o),
        remove: o => objects.remove(o),
        activeItem: () => activeObject,

        dropActiveItem: () => {
            if (activeItemMayBeDropped) {
                activeObject = undefined;
            }
        },

        render: () => {
            forEachObject((o, r) => {
                Globals.drawContext.drawImageR(o.image, r);
                if (isHovered(r)) {
                    Globals.drawContext.drawDescription(o.description);
                }
            });

            let pos = Globals.mouse.pos();
            if (pos && activeObject) {
                Globals.drawContext.drawImage(activeObject.image, pos.x - 5, pos.y - 5, 10, 10);
            }
        },

        update: () => {
            if (Globals.mouse.isClicked()) {
                activeItemMayBeDropped = true;
                let o = hoveredObject();
                if (o && !activeObject) {
                    activeItemMayBeDropped = false; // This click picks it up, so don't drop it again!
                    activeObject = o;
                }
            }
        }
    }
}