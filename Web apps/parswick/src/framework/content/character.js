import { Item } from "./item.js";

export { Character };

class Character extends Item {
    constructor(name, caption, visible) {
        super(name, caption, true, visible);
        this.description = "There is nothing special about " + this.caption;
        this.movementStrategy = this.getNoMoveStrategy();
    }

    move(context) {
        if (this.isVisible) {
            if (this.movementStrategy(context)) {
                context.setMessage(this.caption + " enters.");
            }
        }
    }

    getNoMoveStrategy() {
        return () => false;
    }

    getFollowPlayerStrategy(stepsBehind) {
        return ctx => {
            var idx = ctx.visitedLocations.length - stepsBehind - 1;
            if (idx > -1 && idx < ctx.visitedLocations.length) {
                var fromLocation = this.container;
                var toLocation = ctx.visitedLocations[idx];
                ctx.removeCharacterFromLocation(this, fromLocation);
                ctx.addCharacterToLocation(this, toLocation);
                return fromLocation != ctx.currentLocation && toLocation == ctx.currentLocation;
            }
        }
    }
}
