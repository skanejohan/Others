let render = (w, h) => {
    if (w / h > screenWidth / screenHeight) {
        _h = h;
        _w = _h * screenWidth / screenHeight;
        _x = (w - _w) / 2;
        _y = 0;
    } else {
        _w = w;
        _h = w * screenHeight / screenWidth;
        _x = 0;
        _y = (h - _h) / 2;
    }
    _cell = Math.min(_w / screenWidth, _h / screenHeight);
    _cw = w;
    _ch = h;
    _render();
}

let _cw, _ch, _w, _h, _x, _y, _cell;

let _fillRect = (x, y, w, h, color) => {
    if (x > screenWidth || y > screenHeight || w < 0 || h < 0) {
        return;
    }
    ctx.fillStyle = color;
    let left = Math.max(0, x);
    let top = Math.max(0, y);
    let width = Math.min(w, screenWidth - left);
    let height = Math.min(h, screenHeight - top);
    ctx.fillRect(_x + left * _cell, _y + top * _cell, width * _cell, height * _cell);
}

let _drawImage = (img, x, y, w, h) => {
    if (x > screenWidth || y > screenHeight || w < 0 || h < 0) {
        return;
    }
    let left = Math.max(0, x);
    let top = Math.max(0, y);
    let width = Math.min(w, screenWidth - left);
    let height = Math.min(h, screenHeight - top);
    ctx.drawImage(img, _x + left * _cell, _y + top * _cell, width * _cell, height * _cell);
}

let _render = () => {
    // Draw Sky
    _fillRect(0, 0, screenWidth, screenHeight / 4, "#21d8de");
    _fillRect(0, screenHeight / 4, screenWidth, screenHeight / 4, "#1ba9bf");

    // Draw grass and road
    for (let y = 0; y < screenHeight / 2; y++) {
        let perspective = y / (screenHeight / 2);
        let roadWidth = 0.1 + perspective * 0.8; // Min 10% Max 90%
        let clipWidth = roadWidth * 0.15;
        let halfRoadWidth = roadWidth / 2;

        // ...depending on where the middle point is, which is defined by the current track curvature.
        let middlePoint = 0.5 + curvature * Math.pow((1 - perspective), 3);

        // Work out segment boundaries
        let leftGrass = (middlePoint - halfRoadWidth - clipWidth) * screenWidth;
        let leftClip = (middlePoint - halfRoadWidth) * screenWidth;
        let rightClip = (middlePoint + halfRoadWidth) * screenWidth;
        let rightGrass = (middlePoint + halfRoadWidth + clipWidth) * screenWidth;
        
        let clipColor = Math.sin(80 * Math.pow(1 - perspective, 2) + distance) > 0 ? "red" : "white";
        let grassColor = Math.sin(20 * Math.pow(1 - perspective, 3) + distance * 0.1) > 0 ? "#32a852" : "#63d482";

        let row = screenHeight / 2 + y
        _fillRect(0, row, leftGrass, 1, grassColor);
        _fillRect(leftGrass, row, leftClip - leftGrass, 1, clipColor);
        _fillRect(leftClip, row, rightClip - leftClip, 1, "gray");
        _fillRect(rightClip, row, rightGrass - rightClip, 1, clipColor);
        _fillRect(rightGrass, row, screenWidth - rightGrass, 1, grassColor);
    }

    // Draw Obstacles - project each obstacle onto the screen using the same perspective
    // formulas as the road loop. drawDistance caps how far ahead we look.
    let drawDistance = 400;
    let nearClip = 10;  // obstacles closer than this are past the car
    for (r of goodRainbows) {
        // Distance ahead of car, wrapping around the lap boundary
        let distAhead = (r[0] - distance + trackDistance) % trackDistance;
        if (distAhead <= nearClip || distAhead > drawDistance)
            continue;

        // Reciprocal mapping gives perspective-correct apparent speed: perspective grows
		// slowly when distAhead is large and accelerates as the obstacle closes in.
		// Linear (1 - dist/max) advances at a constant screen rate — visually wrong.
        let perspective = nearClip / distAhead;

        // Road geometry at that depth, matching road-loop formulas exactly
        let rbRoadWidth = (0.1 + perspective * 0.8) * 0.5;
        let rbMiddle    = 0.5 + curvature * Math.pow((1.0 - perspective), 3);

        let rbX = (rbMiddle + r[1] * rbRoadWidth) * screenWidth;
        let rbY = screenHeight / 2 + perspective * (screenHeight / 2);

        // Scale the sprite size with perspective so it shrinks into the distance
        let rbSize = (perspective * 8) + 1;
        let widthScale = 3 * Math.abs(1 - rbMiddle);
        let rbWidth = widthScale * rbSize;
        _drawImage(badRainbow, rbX - rbWidth, rbY - rbSize, rbWidth * 2, rbSize * 2);
    }

    // Draw Car - car position on road is proportional to difference between
    // current accumulated track curvature, and current accumulated player curvature
    // i.e. if they are similar, the car will be in the middle of the track
    carPos = playerCurvature - trackCurvature;
    let nCarPos = screenWidth / 2 + ((Math.floor(screenWidth * carPos) / 2.0) - 7); // Offset for sprite
    _fillRect(nCarPos, 80, 14, 7, "black");

}

let createRainbow = (colors) => {
    let canvas = document.createElement('canvas');
    canvas.width = 540;
    canvas.height = 300;
    let _ctx = canvas.getContext("2d");

    const centerX = 270;
    const centerY = 300;
    const strokeWidth = 30;

    // Färger och radier från SVG-designen
    const radii = [150, 170, 190, 210, 230, 250];

    // Inställningar för linjerna
    _ctx.lineWidth = strokeWidth;
    _ctx.lineCap = 'round';

    // Rita varje båge
    colors.forEach((color, index) => {
        _ctx.beginPath();
        // Rita en halvcirkel (från 180 grader till 0 grader)
        _ctx.arc(centerX, centerY, radii[index], Math.PI, 0, false);
        _ctx.strokeStyle = color;
        _ctx.stroke();
    });

    return canvas;
}

let goodRainbow = createRainbow(['#ff4136', '#ff851b', '#ffdc00', '#2ecc40', '#0074d9', '#b10dc9']);
let badRainbow = createRainbow(['#b10dc9', '#0074d9', '#2ecc40', '#ffdc00', '#ff851b', '#ff4136']);