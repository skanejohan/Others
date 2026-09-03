let render = (w, h) => {
    _setClipRect();
    if (state === PLAYING) {
        _renderSky();
        _renderGrass();
        _renderRoad();
        goodRainbows.forEach((_, i) => _renderObject(goodRainbow, 40, `GR${i}`));
        badRainbows.forEach((_, i) => _renderObject(badRainbow, 40, `BR${i}`));
        unicorns.forEach((_, i) => _renderObject(unicornAsset, 40, `U${i}`));
        _renderObject(endRainbowAsset, 10, `E0`);
        _renderCar();
        _renderInformation();
    } else if (state === GAMEOVER) {
        ctx.fillStyle = "black";
        ctx.font = "48px Arial";
        ctx.fillText("Game Over", xx(W / 4), yy(H / 2));
    } else if (state === LEVELCLEARED) {
        ctx.fillStyle = "black";
        ctx.font = "48px Arial";
        ctx.fillText("Level Cleared!", xx(W / 4), yy(H / 2));
    }
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
    if (!vo || deadObjects[key]) {
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
    }
}

let _renderInformation = () => {
    // Energy
    ctx.fillStyle = "green";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.fillRect(xx(W / 2), yy(5), ww((W / 2) * (energy / 100)) * 0.9, hh(5));
    ctx.strokeRect(xx(W / 2), yy(5), ww(W / 2) * 0.9, hh(5));

    // Speed
    ctx.fillStyle = "blue";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    let l = xx(W / 20);
    let t = yy(H / 8);
    let w = ww(5);
    let h = hh(H / 2 - H / 6);
    let sh = h * (speed / 5);
    ctx.fillRect(l, t + (h - sh), w, sh);
    ctx.strokeRect(l, t, w, h);   

    // Level
    ctx.font = "48px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Level: ${level} of 4`, xx(W / 20), yy(9));
}

let xx = x => _x + x * _cell;
let yy = y => _y + y * _cell;
let ww = w => w * _cell;
let hh = h => h * _cell;

let _w, _h, _x, _y, _cell;
