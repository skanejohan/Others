export { MenuElement }

class MenuElement extends CompositeElementBase {

    constructor(name) {
        super(0, 0, 100, 0, () => this.elements.forEach(e => { if (e.hovering() && e.onclick) { e.onclick(); }}));
        this.frame = new FillRoundRect(0, 0, 0, 0, 5, LAYER1COLOR);
        this.background = new FillRoundRect(3, 3, 0, 0, 2, LAYER1FRAMECOLOR);
        if (name != "") {
            this.caption = name;
        }
        this.clear();
    }

    addItem(text, onclick) {
        var clickHandler;
        var w = ElementBase.context.measureText(text).width;
        if (onclick) {
            clickHandler = function() {
                this.state = PopupState.HIDING;
                this.fadeOut(100, () => {
                    this.state = PopupState.HIDDEN;
                    ElementBase.currentPopup = undefined;
                })
                onclick();
            };
        }
        this.addElement(new Text(this.x + 6, this.y + ITEMHEIGHT * this.noOfItems + 4, w, ITEMHEIGHT-12, text, FONT, "black", 
            HorizontalAlignment.LEFT, VerticalAlignment.TOP, clickHandler));
        this.noOfItems += 1;
        this.h += ITEMHEIGHT;
        this.w = Math.max(w+12, this.w);
        this.adjustSize();
    }

    clear() {
        this.h = 0;
        this.w = 0;
        this.noOfItems = 0;
        this.elements = [this.frame, this.background];
        if (this.caption) {
            this.addItem(this.caption);
            this.noOfItems = 1;
            this.yOffset = -28;
        } 
        else {
            this.yOffset = 0;
        }
        this.adjustSize();
    }

    adjustSize() {
        this.frame.w = this.w;
        this.frame.h = this.h;
        this.background.w = this.w - 6;
        this.background.h = this.h - 6;
    }

    _doDraw(ctx) {
        this.elements.forEach(e => { 
            if (e.onclick) {
                e.style = e.hovering() ? LAYER1COLOR : "black"; 
            }
        })
        super._doDraw(ctx);
    }
}

const ITEMHEIGHT = 28;
