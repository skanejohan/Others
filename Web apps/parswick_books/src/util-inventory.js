createInventory = () => {
    let activeObject = undefined;
    let objects = createObjectList();
    let actions = [];
    let forEachObject = fn => {
        let x = 10, y = 10;
        objects.forEachReversed(o => {
            fn(o, { left: x, top: y, width: 30, height: 30 });
            x += 35;
        });
    }
    let isHovered = r => insideRect(GameContext.mouse().pos(), r);
    let hoveredObject = () => {
        var result = undefined;
        forEachObject((o, r) => {
            if (isHovered(r)) {
                result = o;
            }
        });
        return result;
    }

    return {
        add: objects.add,
        has: objects.has,
        remove: o => { 
            objects.remove(o); 
            if (o == activeObject) {
                activeObject = undefined;
            }
        },
        activeItem: () => activeObject,
        dropActiveItem: () => { activeObject = undefined },
        registerAction: (actor, actedUpon, fn) => actions.push({ actors: (actor, actedUpon), fn: fn}),
        
        render: () => {
            forEachObject((o, r) => {
                GameContext.drawContext().drawImageR(o.inventoryImage || o.image, r);
                if (isHovered(r)) {
                    GameContext.drawContext().drawDescription(o.description);
                }
            });

            let pos = GameContext.mouse().pos();
            if (pos && activeObject) {
                GameContext.drawContext().drawImage(activeObject.image, pos.x - 5, pos.y - 5, 10, 10);
            }
        },

        update: () => {
            if (GameContext.mouse().isClicked()) {
                let o = hoveredObject();
                if (o && !activeObject) {
                    GameContext.mouse().setClicked(false); // Once the item has been picked up, we have handled the click
                    activeObject = o;
                }
                else if (o && activeObject) { // Look for "object applied to another object" action
                    actions.forEach(a => {
                        if (a.actors == (activeObject, o)) {
                            a.fn();
                            GameContext.mouse().setClicked(false); // Onve we have acted, we have handled the click
                        }
                    })
                }
            }
        }
    }
}