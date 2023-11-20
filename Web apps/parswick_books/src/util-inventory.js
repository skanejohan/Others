createInventory = () => {
    let activeObject = undefined;
    let objects = createObjectList();
    let actions = [];
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
                let o = hoveredObject();
                if (o && !activeObject) {
                    Globals.mouse.setClicked(false); // Once the item has been picked up, we have handled the click
                    activeObject = o;
                }
                else if (o && activeObject) { // Look for "object applied to another object" action
                    actions.forEach(a => {
                        if (a.actors == (activeObject, o)) {
                            a.fn();
                            Globals.mouse.setClicked(false); // Onve we have acted, we have handled the click
                        }
                    })
                }
            }
        }
    }
}