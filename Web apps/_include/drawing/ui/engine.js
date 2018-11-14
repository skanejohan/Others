// TODO : more "high-level" drawing objects, but not game-specific

class Engine {
    constructor(canvas, bufferCanvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.bufferCanvas = bufferCanvas;
        this.bufferContext = this.bufferCanvas.getContext("2d");
        this._onclick = undefined;
        this._layers = [];
        this._modalLayer = [];
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
            that._forPopupAndEachElement(e => {
                if(e.hovering() && (that._modalLayer.length === 0 || e.onModalLayer)) {
                    handled = true;
                    if (e.onclick !== undefined) {
                        e.onclick();
                    }                
                } 
            });
            if (that._onclick !== undefined && !handled) {
                that._onclick(ElementBase.mousePos.x, ElementBase.mousePos.y);
            }
        }
        ElementBase.bufferCanvas = this.bufferCanvas;
        ElementBase.bufferContext = this.bufferContext;
        ElementBase.context = this.context;
    }

    clear() {
        this._layers = [];
        this._modalLayer = [];
    }

    add(element, layerIndex) {
        layerIndex = layerIndex || 0;
        if (this._layers[layerIndex] == null) {
            this._layers[layerIndex] = []
        }
        this._addElement(element, this._layers[layerIndex]);
        return element;
    }

    addModal(element) {
        if (this._modalLayer.length === 0) {
            this._forEachNonModalElement(e => e.pause());
        }
        this._addElement(element, this._modalLayer);
    }

    remove(element) {
        this._removeFromArray(element.layer, element);
        if (element.layer.length == 0) {
            this._removeFromArray(this._layers, element.layer);
            if (element.layer === this._modalLayer) {
                this._forEachNonModalElement(e => e.unpause());
            }
        }
        if (element.popup === ElementBase.currentPopup) {
            ElementBase.currentPopup = undefined;
        }
    }

    draw(w, h) {
        // TODO if they have the setDimensions function
        this.canvas.setDimensions(w, h);
        this.bufferCanvas.setDimensions(w, h);

        
        // Draw all elements, in layer order.
        this._forEachElement(e => {
            e.draw();
            if (e.finished && e.popup === ElementBase.currentPopup) {
                ElementBase.currentPopup = undefined;
            }
        });

        // Draw the current popup, if defined
        if (ElementBase.currentPopup !== undefined && 
            (ElementBase.currentPopup.state == PopupState.SHOWING ||
             ElementBase.currentPopup.state == PopupState.VISIBLE ||
             ElementBase.currentPopup.state == PopupState.HIDEPENDING ||
             ElementBase.currentPopup.state == PopupState.HIDING)
            ) {
            ElementBase.currentPopup.draw();
        }

        // Remove elements that were finished in this round
        var finishedElements= [];
        this._forEachElement(e => { if (e.finished) { finishedElements.push(e) } });
        finishedElements.forEach(e => this.remove(e));
    }

    set onclick(value) {
        this._onclick = value;
    }

    _addElement(element, layer) {
        if (element.popup !== undefined) {
            element.popup.context = element.context;
        }
        element.onModalLayer = layer === this._modalLayer;
        element.layer = layer;
        layer.push(element);
    }

    _layerIndices() {
        return Object.keys(this._layers);
    }

    _forEachLayer(fn) {
        this._layerIndices().forEach(i => fn(this._layers[i]));
    }

    _forEachNonModalElement(fn) {
        this._forEachLayer(l => l.forEach(fn));
    }

    _forEachElement(fn) {
        this._forEachNonModalElement(fn);
        this._modalLayer.forEach(fn);
    }

    _forPopupAndEachElement(fn) {
        if (ElementBase.currentPopup != undefined) {
            fn(ElementBase.currentPopup);
        }
        this._forEachElement(fn);
    }

    _removeFromArray(array, element) {
        var index = array.indexOf(element);
        if (index > -1) {
            array.splice(index, 1);
        }
    }
}
