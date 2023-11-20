function loadImage(fileName) {
    var image = new Image();
    image.src = `assets/${fileName}.png`;
    return image;
}

function drawMessage(texts) {
    context.fillStyle = "yellow";
    context.font = "32px kongtext";
    var y = 100;
    texts.forEach(text => {context.fillText(text, 100, y); y += 40; });
}

function insideRect(pos, rect) {
    return pos && rect 
        && pos.x >= rect.left 
        && pos.y >= rect.top 
        && pos.x <= rect.left + rect.width 
        && pos.y <= rect.top + rect.height;
}

function yOffsetRect(r, y) {
    return { left: r.left, top: r.top + y, width: r.width, height: r.height };
}

function breakText(text, maxLineLength) {
    let sentences = [];
    let longestLine = 0;
    let words = text.split(' ').reverse();
    while (words.length > 0) {
        let sentence = words.pop();
        while (words.length > 0 && sentence.length + words[words.length-1].length + 1 <= maxLineLength) {
            sentence = sentence + " " + words.pop();
        }
        sentences.push(sentence);
        if (sentence.length > longestLine) {
            longestLine = sentence.length;
        }
    }
    return { sentences: sentences, longestLine: longestLine };
}
