export { State };

class State {
    constructor() {
        this.applying = false;
        this.actions = [];
    }

    addAction(noun, verb) {
        if (!this.applying) {
            this.actions.push("A-"+noun+"-"+verb);
        }
    }

    clear() {

    }

    apply() {

    }

    toString() {

    }

    fromString() {

    }
}

// Private function on State





/*
// Constructs a state object.
THESEUS.State = function() {
    // Possible actions:
    //   "M-THESEUS.PARSWICK.historySection" - move to the specified location
    //   "A-THESEUS.PARSWICK.cupboard-open" - apply verb to noun
    //   TODO: R2,3 - respond 2, leading to statement 3
    var actions = [];
    var applying = false;

    var state = {
        add: add,
        clear: clear,
        apply: apply,
        toString: toString,
        fromString: fromString,
    }

    return state;

    function add(s) {
        if (!applying) {
            actions.push(s);
        }
	}

    function clear() {
		actions = [];
	}

    function apply() {
        applying = true;
        
        actions.forEach((s,i) => {
            var type = s.substring(0, 2);
            var info = s.substring(2);
            switch(type) {
                case "M-":
                    THESEUS.context.setLocation(info);
                    break;
                case "A-":
                    var noun = info.split("-")[0]; 
                    var verb = info.split("-")[1]; 
                    var data = info.split("-")[2];
                    var item = THESEUS.context.getObjectByName(noun);
                    item.getVerbs(THESEUS.context).forEach((v, f) => {
                        if (f.name == verb) {
                            f(THESEUS.context, data);
                        }
                    });
                    break;
            }
            // // TODO Is it a response?
            // var r = action.match(new RegExp(/^R(\d*),(\d*)$/));
            // if (r != null) {
            //     console.log("responding " + r[1] + ", leading to statement " + r[2]);
            //     THESEUS.conversation.respond(r[1], r[2])
            // }

            if (THESEUS.view != undefined) { THESEUS.view.update(THESEUS.context); }
        });
        applying = false;
    }

    function toString() {
        return actions.join(",");
    }

    function fromString(s) {
        actions = s.split(",");
    }
}*/
