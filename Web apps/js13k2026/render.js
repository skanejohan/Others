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
    let w = screenWidth * _cell
    let h = screenHeight / 2 * _cell
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0.00, '#3b2e91');
    gradient.addColorStop(0.30, '#6a4fbf');
    gradient.addColorStop(0.55, '#ff9ec4');
    gradient.addColorStop(0.75, '#ffb347');
    gradient.addColorStop(1.00, '#ffd194');
    ctx.fillStyle = gradient;
    ctx.fillRect(_x, _y, w, h);

    let leftGrassXs = [];
    let leftClipXs = [];
    let rightGrassXs = [];
    let rightClipXs = [];
    let grassTop = 0;
    let previousGrassColor = undefined;
    let grassRegions = [];

    // Calculate grass and road
    for (let y = 0; y < screenHeight / 2; y++) {
        let perspective = y / (screenHeight / 2);
        let roadWidth = 0.1 + perspective * 0.8; // Min 10% Max 90%
        let clipWidth = roadWidth * 0.15;
        let halfRoadWidth = roadWidth / 2;

        // ...depending on where the middle point is, which is defined by the current track curvature.
        let middlePoint = 0.5 + curvature * Math.pow((1 - perspective), 3);

        // Work out segment boundaries
        let leftGrass = (middlePoint - halfRoadWidth - clipWidth) * screenWidth;
        leftGrassXs.push(leftGrass);
        let leftClip = (middlePoint - halfRoadWidth) * screenWidth;
        leftClipXs.push(leftClip);
        let rightClip = (middlePoint + halfRoadWidth) * screenWidth;
        rightClipXs.push(rightClip);
        let rightGrass = (middlePoint + halfRoadWidth + clipWidth) * screenWidth;
        rightGrassXs.push(rightGrass);
        
        let grassColor = Math.sin(20 * Math.pow(1 - perspective, 3) + distance * 0.1) > 0 ? "#32a852" : "#63d482";
        if (y == screenHeight / 2 - 1 || (previousGrassColor && previousGrassColor != grassColor)) {
            grassRegions.push([grassTop, y - grassTop + 1]);
            grassTop = y;
        }
        previousGrassColor = grassColor;
    }

    // Draw grass and road
    for (let region of grassRegions) {
        let top = region[0];
        let height = region[1];
        let x = _x;
        let y = _y + (screenHeight / 2 + top) * _cell;
        let w = screenWidth * _cell;
        let h = height * _cell;
        let gradient = ctx.createLinearGradient(0, y, 0, y + h);
        gradient.addColorStop(0.0, '#d4f4c7');
        gradient.addColorStop(0.4, '#a8e6a1');
        gradient.addColorStop(0.7, '#6fcf6a');
        gradient.addColorStop(0.9, '#3b7a3a');
        gradient.addColorStop(1.0, '#d4f4c7');
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, w, h);
    }

    for (let y = 0; y < screenHeight / 2; y++) {
        let row = screenHeight / 2 + y
        if (y > 0) {
            _fillRect(leftClipXs[y], row - 1, rightClipXs[y] - leftClipXs[y], 3, "gray");
        }
    }

    // Draw Obstacles - project each obstacle onto the screen using the same perspective
    // formulas as the road loop. drawDistance caps how far ahead we look.
    let drawDistance = 400;
    let nearClip = 10;  // obstacles closer than this are past the car

    let drawRainbow = (r, image, size) => {
        // Distance ahead of car, wrapping around the lap boundary
        let distAhead = (r[0] - distance + trackDistance) % trackDistance;
        if (distAhead <= nearClip || distAhead > drawDistance)
            return;

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
        let rbSize = size * ((perspective * 8) + 1);
        let widthScale = 4 * Math.abs(1 - rbMiddle);
        let rbWidth = widthScale * rbSize;
        _drawImage(image, rbX - rbWidth, rbY - rbSize, rbWidth * 2, rbSize * 2);
    }

    for (r of goodRainbows) {
        drawRainbow(r, goodRainbow, 4);
    }

    for (r of badRainbows) {
        drawRainbow(r, badRainbow, 4);
    }

    drawRainbow(endRainbow, goodRainbow, 10);
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