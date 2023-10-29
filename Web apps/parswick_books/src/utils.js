function loadImage(fileName) {
    var image = new Image();
    image.src = `assets/${fileName}.png`;
    return image;
}

function mousePosInLocation() {
    var pos = { x : mousePos.x - 600, y : mousePos.y - 300 };
    return pos.x < 0 || pos.x > 720 || pos.y < 0 || pos.y > 520 ? null : pos;
}

function drawDescription(texts) {
    context.fillStyle = "yellow";
    context.font = "32px kongtext";
    var dy = 0;
    var y = 920;
    if (texts.length > 4) {
        y -= (texts.length - 4) * 40;
    }
    texts.forEach(text => {context.fillText(text, 100, y + dy); dy += 40; });
}

function insideRect(pos, rect) {
    return pos && rect && pos.x >= rect.left && pos.y >= rect.top && pos.x <= rect.right && pos.y <= rect.bottom;
}