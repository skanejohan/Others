var inventory = {

    initialize() {
        this.objects = [];
    },

    render() {
        this._getAllItems().forEach(({o, left, top}) => {
            context.drawImage(o.image, left, top);
            if (Globals.renderDebugInformation) {
                Draw.debugRectangle(left, top, this._itemWidth, this._itemWidth);
            }
            if (this._isHoveredItem(left, top)) {
                drawDescription(o.description);
            }
        });
    },

    update() {
        if (Globals.mouseClicked) {
            let clickedItem = this._getHoveredItem();
            if (clickedItem) {
                gameContext.activeItemShouldBeDropped = false;
                gameContext.activeItem = clickedItem;
            }
        }
    },

    _getHoveredItem() {
        return this._getAllItems()
            .filter(({_, left, top}) => this._isHoveredItem(left, top))
            .map(({o, _1, _2}) => o)
            .find(_ => true);
    },

    _isHoveredItem(left, top) {
        return insideRect(mousePos, { left: left, top: top, width: this._itemWidth, height: this._itemWidth });
    },

    _getAllItems() {
        var left = this._left - this._itemWidth;
        return this.objects.map(o => {
            left += this._itemWidth;
            return { o: o, left: left, top: this._top };
        });
    },

    _itemWidth: 40,
    _left: 100,
    _top: 100
}