let render = (w, h) => {
    if (w / h > W / H) {
        _h = h;
        _w = _h * W / H;
        _x = (w - _w) / 2;
        _y = 0;
    } else {
        _w = w;
        _h = w * H / W;
        _x = 0;
        _y = (h - _h) / 2;
    }
    _cell = Math.min(_w / W, _h / H);
    
    let positions = _calculatePositions();

    _setClipRect();
    _renderSky();
    _renderGrass(positions.grassIntervals);
    _renderRoad(positions.polygon);
    _renderCar();

    _render();
    _restoreClipRect();
}

let _setClipRect = () => {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(xx(0), yy(0));
    ctx.lineTo(xx(W), yy(0));
    ctx.lineTo(xx(W), yy(H));
    ctx.lineTo(xx(0), yy(H));
    ctx.closePath();
    ctx.clip();
};

let _restoreClipRect = () => {
    ctx.restore();
};

let _calculatePositions = () => {
    let lefts = [];
    let rights = [];
    let grassTop = 0;
    let previousGrassColor = undefined;
    let grassIntervals = [];
    for (let y = 0; y < H / 2; y++) {
        let perspective = y / (H / 2);
        let roadWidth = 0.1 + perspective * 0.8; // Min 10% Max 90%
        let clipWidth = roadWidth * 0.15;
        let halfRoadWidth = roadWidth / 2;
        let middlePoint = 0.5 + curvature * Math.pow((1 - perspective), 3);
        lefts.push([xx((middlePoint - halfRoadWidth - clipWidth) * W), yy(H / 2 + y)]);
        rights.push([xx((middlePoint + halfRoadWidth + clipWidth) * W), yy(H / 2 + y)]);
        
        let grassColor = Math.sin(20 * Math.pow(1 - perspective, 3) + distance * 0.1) > 0 ? 0 : 1;
        if (y == H / 2 - 1 || (previousGrassColor && previousGrassColor != grassColor)) {
            grassIntervals.push([grassTop, y - grassTop + 1]);
            grassTop = y;
        }
        previousGrassColor = grassColor;
    }
    let polygon = lefts.concat(rights.reverse());
    return { polygon: polygon, grassIntervals: grassIntervals };
}

let _renderSky = () => {
    const gradient = ctx.createLinearGradient(0, 0, 0, H / 2 * _cell);
    gradient.addColorStop(0.00, '#3b2e91');
    gradient.addColorStop(0.30, '#6a4fbf');
    gradient.addColorStop(0.55, '#ff9ec4');
    gradient.addColorStop(0.75, '#ffb347');
    gradient.addColorStop(1.00, '#ffd194');
    ctx.fillStyle = gradient;
    ctx.fillRect(_x, _y, W * _cell, H / 2 * _cell);
}

let _renderGrass = (intervals) => {
    for (let int of intervals) {
        let x = xx(0);
        let y = yy(H / 2 + int[0]);
        let w = ww(W);
        let h = hh(int[1]);
        let gradient = ctx.createLinearGradient(0, y, 0, y + h);
        gradient.addColorStop(0.0, '#d4f4c7');
        gradient.addColorStop(0.4, '#a8e6a1');
        gradient.addColorStop(0.7, '#6fcf6a');
        gradient.addColorStop(0.9, '#3b7a3a');
        gradient.addColorStop(1.0, '#d4f4c7');
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, w, h);
    }
}

let _renderRoad = (polygon) => {
    ctx.beginPath();
    ctx.moveTo(polygon[0][0], polygon[0][1]);
    for (let i = 1; i < polygon.length; i++) {
        ctx.lineTo(polygon[i][0], polygon[i][1]);
    }
    ctx.closePath();
    const gradient = ctx.createLinearGradient(0, yy(H / 2), 0, yy(H));
    gradient.addColorStop(0.0, '#777777');
    gradient.addColorStop(0.5, '#555555');
    gradient.addColorStop(1.0, '#333333');
    ctx.fillStyle = gradient;
    ctx.fill();
}

let _renderCar = () => {
    let x = W / 2 + ((W * carPos) / 2 - 20);
    ctx.drawImage(car, xx(x), yy(70));
}

let xx = x => _x + x * _cell;
let yy = y => _y + y * _cell;
let ww = w => w * _cell;
let hh = h => h * _cell;

let _w, _h, _x, _y, _cell;










let _drawImage = (img, x, y, w, h) => {
    if (x > W || y > H || w < 0 || h < 0) {
        return;
    }
    let left = Math.max(0, x);
    let top = Math.max(0, y);
    let width = Math.min(w, W - left);
    let height = Math.min(h, H - top);
    ctx.drawImage(img, xx(left), yy(top), ww(width), hh(height));
}

let _render = () => {
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

        let rbX = (rbMiddle + r[1] * rbRoadWidth) * W;
        let rbY = H / 2 + perspective * (H / 2);

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