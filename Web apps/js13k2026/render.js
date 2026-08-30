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
    _renderGrass(positions.grassIntervals);
    _renderRoad(positions.lefts, positions.rights);
    _renderCar();
    goodRainbows.forEach(r => _renderObject(r, goodRainbow, 4, positions.lefts, positions.rights));
    badRainbows.forEach(r => _renderObject(r, badRainbow, 4, positions.lefts, positions.rights));
    _renderObject(endRainbow, endRainbowAsset, 10, positions.lefts, positions.rights);
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

let _renderRoad = (lefts, rights) => {
    let polygon = lefts.concat(rights.toReversed());

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
    //drawCanvasWithPerspective(car, ctx, xx(x), yy(70), 1.0, 0.8, true);
}

let _renderObject = (position, image, size, lefts, rights) => {
    let _getObjectX = (y, offset) => {
        if (y < lefts[0][1]) {
            return;
        }

        let i = lefts.findIndex(e => e[1] >= y);
        let leftTopY = lefts[i - 1][1];
        let leftBotY = lefts[i][1];
        let offsetY = (y - leftTopY) / (leftBotY - leftTopY);

        let leftTopX = lefts[i - 1][0];
        let leftBotX = lefts[i][0];
        let rightTopX = rights[i - 1][0];
        let rightBotX = rights[i][0];

        let leftX = leftTopX + (leftBotX - leftTopX) * offsetY;
        let rightX = rightTopX + (rightBotX - rightTopX) * offsetY;

        return leftX + offset * (rightX - leftX);
    }

    let drawDistance = 170;
    let nearClip = 10;  // Objects closer than this are past the car
    let distAhead = (position[0] - distance + trackDistance) % trackDistance;
    if (distAhead <= nearClip || distAhead > drawDistance) {
        return;
    }
    let perspective = nearClip / distAhead;
    let objSize = size * ((perspective * 8) + 1);
    let rbY = H / 2 + perspective * (H / 2);
    let y = yy(rbY) - hh(objSize / 2);
    let x = _getObjectX(y, position[1]) - ww(objSize / 2);
    if (!x) {
        return;
    }
    ctx.globalAlpha = (drawDistance - distAhead) / drawDistance;
    ctx.drawImage(image, x, y, ww(objSize) - ww(objSize / 2), hh(objSize) - hh(objSize / 2));
    ctx.globalAlpha = 1;
}

let xx = x => _x + x * _cell;
let yy = y => _y + y * _cell;
let ww = w => w * _cell;
let hh = h => h * _cell;

let _w, _h, _x, _y, _cell;
