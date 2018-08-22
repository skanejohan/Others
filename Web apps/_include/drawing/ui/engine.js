// TODO : handle layers
// TODO group elements and attach animations to the group

class Engine {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this._onclick = undefined;
        this.elements = [];
        let that = this;
        canvas.onmousemove = function(e) {
            ElementBase.mousePos.x = e.clientX;
            ElementBase.mousePos.y = e.clientY;
        }
        canvas.onclick = function(e) {
            var handled = false;
            that.elements.forEach(e => {
                if(e.hovering()) {
                    handled = true;
                    if (e.fn !== undefined) {
                        e.fn();
                    }                
                } 
            });
            if (that._onclick !== undefined && !handled) {
                that._onclick(ElementBase.mousePos.x, ElementBase.mousePos.y);
            }
        }
    }

    add(element) {
        element.context = this.canvas.getContext("2d");
        if (element.popup !== undefined) {
            element.popup.context = element.context;
        }
        this.elements.push(element);
    }

    draw() {
        this.elements.map(e => {
            e.draw();
            if (e.finished && e.popup === ElementBase.currentPopup) {
                ElementBase.currentPopup = undefined;
            }
        });
        if (ElementBase.currentPopup !== undefined) {
            ElementBase.currentPopup.draw();
        }

        this.elements = this.elements.filter(e => !e.finished);
    }

    set onclick(value) {
        this._onclick = value;
    }
}
