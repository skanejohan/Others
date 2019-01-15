export { State };

class State {
    constructor(context) {
        this.context = context;
        this.actions = [];
    }

    addAction(noun, verb) {
        this.actions.push(verb + "-" + noun);
    }

    clear() {
		this.actions = [];
    }

    fromString(s) {
        let actions = s.split(",");
        actions.forEach((s,i) => {
            var verb = s.split("-")[0];
            var noun = s.split("-")[1]; 
            if (verb == "move") {
                this.context.moveTo(noun);
            }
            else {
                let verbName = "verb" + this.capitalizeFirstLetter(verb);
                var item = this.context.item(noun);
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
