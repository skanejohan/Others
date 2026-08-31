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
    
    let positions = _calculateRoadAndGrassPositions();

    _setClipRect();
    _renderSky();
    _renderGrass();
    _renderRoad();
    _renderCar();
    goodRainbows.forEach((_, i) => _renderObject(goodRainbow, 40, `GR${i}`));
    badRainbows.forEach((_, i) => _renderObject(badRainbow, 40, `BR${i}`));
    unicorns.forEach((_, i) => _renderObject(unicornAsset, 40, `U${i}`));
    _renderObject(endRainbowAsset, 10, `E0`);
    _renderInformation();
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

let _calculateRoadAndGrassPositions = () => {
    let lefts = [];
    let rights = [];
    let grassTop = 0;
    let previousGrassColor = undefined;
    let grassIntervals = [];
    for (let y = 0; y <= H / 2; y++) {
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
    return { lefts: lefts, rights: rights, grassIntervals: grassIntervals };
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

let _renderGrass = () => {
    for (let int of visualCoordinates.grassIntervals) {
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

let _renderRoad = () => {
    let polygon = visualCoordinates.lefts.concat(visualCoordinates.rights.toReversed());

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
    let w = ww(28);
    let h = hh(18);
    ctx.drawImage(carAsset, visualCoordinates.carX - w / 2, visualCoordinates.carY - h / 2, w, h);

    if (debug) {
        ctx.fillStyle = "black";
        ctx.fillRect(visualCoordinates.carX - 1, visualCoordinates.carY - 1, 2, 2);
    }
}

let _renderObject = (image, size, key) => {
    let vo = visualCoordinates[key];
    if (!vo) {
        return;
    }

    ctx.globalAlpha = vo.alpha;
    let width = ww(size * vo.size);
    let height = hh(size * vo.size);
    ctx.drawImage(image, vo.x - width / 2, vo.y - height / 2, width, height);
    ctx.globalAlpha = 1;

    if (debug) {
        ctx.fillStyle = "black";
        ctx.fillRect(vo.x-1, vo.y-1, 2, 2);
        if (vo.dead) {
            ctx.fillRect(vo.x-5, vo.y-5, 10, 10);
        }
    }
}

let _renderInformation = () => {
    ctx.fillStyle = "green";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.fillRect(xx(W / 2), yy(5), ww((W / 2) * (energy / 100)) * 0.9, hh(5));
    ctx.strokeRect(xx(W / 2), yy(5), ww(W / 2) * 0.9, hh(5));
    ctx.font = "48px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Level: ${level} of 4`, xx(W / 20), yy(9));
}

let xx = x => _x + x * _cell;
let yy = y => _y + y * _cell;
let ww = w => w * _cell;
let hh = h => h * _cell;

let _w, _h, _x, _y, _cell;
