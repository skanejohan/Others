let render = (w, h) => {
    _setClipRect();

    _renderSky();
    _renderGrass();
    _renderRoad();
    goodRainbows.forEach((_, i) => _renderObject(goodRainbow, 40, `GR${i}`));
    badRainbows.forEach((_, i) => _renderObject(badRainbow, 40, `BR${i}`));
    unicorns.forEach((_, i) => _renderObject(unicornAsset, 40, `U${i}`));
    _renderObject(endRainbowAsset, 10, `E0`);
    _renderCar();
    _renderInformation();

    if (state === LEVELCLEARED || state === GAMEOVER) {
        let msg = state === LEVELCLEARED ? "LEVEL CLEARED" : "GAME OVER";
        let fontSize = Math.floor(infoFont);
        ctx.textAlign = "center";
        ctx.textBaseline = 'middle';
        ctx.fillStyle = "white";
        ctx.font = `${fontSize}px Arial`;
        ctx.fillText(msg, xx(W / 2), yy(H / 2));
        ctx.strokeText(msg, xx(W / 2), yy(H / 2));
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

    let getPercentColor = p => { // p = 0 - 1
        let r, g, b = 0;
        if (p < 0.5) {
            // 0% to 50%: Red stays at 255, Green ramps up
            r = 255;
            g = Math.round((p / 0.5) * 255);
        } else {
            // 50% to 100%: Green stays at 255, Red ramps down
            r = Math.round((1 - (p - 0.5) / 0.5) * 255);
            g = 255;
        }
        return `rgb(${r}, ${g}, ${b})`;
    }

    let s = x => x * _cell;

    let infoCanvas = _createCanvas(s(53), s(20), _ctx => {

        let renderGauge = (x, y, level, invertColor) => {
            let cx = x * _cell;
            let cy = y * _cell;
            let r = 10 * _cell;

            _ctx.fillStyle = "#210413";
            _ctx.beginPath();
            _ctx.arc(s(x), s(y), s(10), 0, 2 * Math.PI);
            _ctx.fill();

            level = Math.min(Math.max(level, 0), 1); // Clamp level between 0 and 1
            let angle = 0.75 + level * 1.5;
            _ctx.fillStyle = getPercentColor(invertColor ? 1 - level : level);
            _ctx.beginPath();
            _ctx.arc(s(x), s(y), s(10), 0.75 * Math.PI, angle * Math.PI);
            _ctx.lineTo(s(x), s(y));
            _ctx.fill();

            _ctx.fillStyle = "#0d0107";
            _ctx.beginPath();
            _ctx.arc(s(x), s(y), s(7), 0, 2 * Math.PI);
            _ctx.fill();

            _ctx.fillStyle = "white";
            _ctx.beginPath();
            _ctx.arc(s(x) - s(5), s(y) + s(5), s(0.5), 0, 2 * Math.PI);
            _ctx.fill();
            _ctx.beginPath();
            _ctx.arc(s(x), s(y) - s(7), s(0.5), 0, 2 * Math.PI);
            _ctx.fill();
            _ctx.beginPath();
            _ctx.arc(s(x) + s(5), s(y) + s(5), s(0.5), 0, 2 * Math.PI);
            _ctx.fill();
        }

        // Speed
        renderGauge(10, 10, speed / 3, true);

        // Distance
        renderGauge(42, 10, distance / trackDistance, false);

        _ctx.fillStyle = getPercentColor(energy / 100);
        _ctx.strokeStyle = "black";
        _ctx.lineWidth = 2;
        let h = energy * 15 / 100;
        _ctx.fillRect(s(22), s(15-h), s(8), s(h));
        _ctx.strokeRect(s(22), 0, s(8), s(15));

        // Level
        _ctx.font = "48px Arial";
        _ctx.fillStyle = "white";
        _ctx.textAlign = "center";
        _ctx.fillText(`${level}`, s(26), s(19));
    });

    ctx.globalAlpha = 0.5;
    ctx.drawImage(infoCanvas, xx(W / 2 - 30), yy(10));
    ctx.globalAlpha = 1;
}

let xx = x => _x + x * _cell;
let yy = y => _y + y * _cell;
let ww = w => w * _cell;
let hh = h => h * _cell;

let _w, _h, _x, _y, _cell;
