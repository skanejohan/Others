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
    if (x > screenWidth) {
        return;
    }
    if (w < 0) {
        return;
    }
    ctx.fillStyle = color;
    let left = Math.max(0, x);
    let width = Math.min(w, screenWidth - left);
    ctx.fillRect(_x + left * _cell, _y + y * _cell, width * _cell, h * _cell);
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
        roadWidth *= 0.5;     // Halve it as track is symmetrical around center of track, but offset...

        // ...depending on where the middle point is, which is defined by the current track curvature.
        let middlePoint = 0.5 + curvature * Math.pow((1 - perspective), 3);

        // Work out segment boundaries
        let leftGrass = (middlePoint - roadWidth - clipWidth) * screenWidth;
        let leftClip = (middlePoint - roadWidth) * screenWidth;
        let rightClip = (middlePoint + roadWidth) * screenWidth;
        let rightGrass = (middlePoint + roadWidth + clipWidth) * screenWidth;
        
        let clipColor = Math.sin(80 * Math.pow(1 - perspective, 2) + distance) > 0 ? "red" : "white";
        let grassColor = Math.sin(20 * Math.pow(1 - perspective, 3) + distance * 0.1) > 0 ? "#32a852" : "#63d482";

        let row = screenHeight / 2 + y
        _fillRect(0, row, leftGrass, 1, grassColor);
        _fillRect(leftGrass, row, leftClip - leftGrass, 1, clipColor);
        _fillRect(leftClip, row, rightClip - leftClip, 1, "gray");
        _fillRect(rightClip, row, rightGrass - rightClip, 1, clipColor);
        _fillRect(rightGrass, row, screenWidth - rightGrass, 1, grassColor);
    }

    // Draw Car - car position on road is proportional to difference between
    // current accumulated track curvature, and current accumulated player curvature
    // i.e. if they are similar, the car will be in the middle of the track
    carPos = playerCurvature - trackCurvature;
    let nCarPos = screenWidth / 2 + ((Math.floor(screenWidth * carPos) / 2.0) - 7); // Offset for sprite
    _fillRect(nCarPos, 80, 14, 7, "black");
}
