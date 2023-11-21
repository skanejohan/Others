function loadImage(fileName) {
    var image = new Image();
    image.src = `assets/${fileName}.png`;
    return image;
}

function insideRect(pos, rect) {
    return pos && rect 
        && pos.x >= rect.left 
        && pos.y >= rect.top 
        && pos.x <= rect.left + rect.width 
        && pos.y <= rect.top + rect.height;
}
