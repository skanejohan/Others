export { State };

class State {
    constructor(context) {
        this.context = context;
        this.actions = [];
    }

    addAction(noun, verb, extraData) {
        if (extraData) {
            this.actions.push(verb + "-" + noun + "-" + extraData);
        }
        else {
            this.actions.push(verb + "-" + noun);
        }
    }

    clear() {
		this.actions = [];
    }

    fromString(s) {
        let actions = s.split(",");
        actions.forEach((s,i) => {
            var parts = s.split("-");
            var verb = parts[0];
            var noun = parts[1]; 
            if (verb == "move") {
                this.context.moveTo(noun);
            }
            else if (verb == "applyCombination") {
                var combination = parts[2];
                this.context.item(noun).applyCombination(this.context, combination);
            }
            else {
                let verbName = "verb" + this.capitalizeFirstLetter(verb);
                var item = this.context.item(noun) || this.context.character(noun);
                item.getVerbs(this.context).forEach(v => {
                    if (v == verbName) {
                        item[verbName](this.context);
                    }
                });
            }
        });
    }

    toString() {
        return this.actions.join(",");
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
