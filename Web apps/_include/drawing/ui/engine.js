// TODO : handle layers
// TODO group elements and attach animations to the group

class Engine {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this._onclick = undefined;
        this.elements = [];
        let that = this;
        canvas.onmousemove = function(e, info) {
            ElementBase.mousePos.x = e.clientX;
            ElementBase.mousePos.y = e.clientY;
            if (info !== undefined) {
                // This is the case if we use a ScalingCanvas
                ElementBase.canvasRect.left = info.left;
                ElementBase.canvasRect.right = info.right;
                ElementBase.canvasRect.top = info.top;
                ElementBase.canvasRect.bottom = info.bottom;
            }
            else {
                // This is the case for the normal - non-scaling - canvas
                ElementBase.canvasRect.left = 0;
                ElementBase.canvasRect.right = canvas.width;
                ElementBase.canvasRect.top = 0;
                ElementBase.canvasRect.bottom = canvas.height;
            }
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
