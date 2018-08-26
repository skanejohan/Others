// TODO : modal layer
// TODO : more "high-level" drawing objects, but not game-specific

class Engine {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this._onclick = undefined;
        this._layers = {};
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
            that._forEachElement(e => {
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

    add(element, layerIndex) {
        element.context = this.canvas.getContext("2d");
        if (element.popup !== undefined) {
            element.popup.context = element.context;
        }
        element.layerIndex = layerIndex || 0;
        if (this._layers[element.layerIndex] == null) {
            this._layers[element.layerIndex] = []
        }
        this._layers[element.layerIndex].push(element);
    }

    remove(element) {
        var index = this._layers[element.layerIndex].indexOf(element);
        if (index > -1) {
            this._layers[element.layerIndex].splice(index, 1);
            if (this._layers[element.layerIndex].length == 0) {
                delete this._layers[element.layerIndex];
            }
        }
    }

    draw() {
        // Draw all elements, in layer order.
        this._forEachElement(e => {
            e.draw();
            if (e.finished && e.popup === ElementBase.currentPopup) {
                ElementBase.currentPopup = undefined;
            }
        });

        // Draw the current popup, if defined
        if (ElementBase.currentPopup !== undefined) {
            ElementBase.currentPopup.draw();
        }

        // TODO draw the elements on the modal layer, if applicable

        // Remove elements that were finished in this round
        var finishedElements= [];
        this._forEachElement(e => { if (e.finished) { finishedElements.push(e) } });
        finishedElements.forEach(e => this.remove(e));
    }

    set onclick(value) {
        this._onclick = value;
    }

    _layerIndices() {
        return Object.keys(this._layers);
    }

    _forEachLayer(fn) {
        this._layerIndices().forEach(i => fn(this._layers[i]));
    }

    _forEachElement(fn) {
        this._forEachLayer(l => l.forEach(fn));
    }
}
