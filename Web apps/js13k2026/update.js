let update = (dt) => {
    let et = dt / 1000;

    energy -= 5 * et;
    if (energy <= 0) {
        state = GAMEOVER;
        return;
    }

    if (breaking) {
        speed -= 2 * et;
    } else {
        speed += 0.2 * et;
    }

    // Car Curvature is accumulated left/right input, but inversely proportional to speed i.e. it is harder to turn at high speed
    if (left) {
        playerCurvature -= speed * et * (1 - speed / 2);
    }

    if (right) {
        playerCurvature += speed * et * (1 - speed / 2);
    }

    // If car curvature is too different to track curvature, slow down as car has gone off track
    if (Math.abs(playerCurvature - trackCurvature) >= 0.8) {
        speed -= 20.0 * et;
        energy -= 5.0 * et;
    }

    // Clamp speed
    if (speed > 5) {
        speed = 5;
    }
    if (speed < 1) {
        speed = 1;
        breaking = false;
    }

    // Move car along track according to car speed
    distance += 70 * speed * et;

    if (distance >= trackDistance) {
        state = LEVELCLEARED;
        return;
    }

    // Get Point on track
    let offset = 0;
    let trackSection = 0;

    if (distance >= trackDistance)
    {
        distance -= trackDistance;
    }
               
    // Find position on track (could optimise)
    while (trackSection < tracks.length && offset <= distance)
    {                      
        offset += tracks[trackSection][1];
        trackSection++;
    }
               
    // Interpolate towards target track curvature
    let targetCurvature = tracks[trackSection - 1][0];
    let trackCurveDiff = (targetCurvature - curvature) * et * speed;

    // Accumulate player curvature
    curvature += trackCurveDiff;

    // Accumulate track curvature
    trackCurvature += curvature * et * speed;

    // The car position on road is proportional to difference between current accumulated track curvature, and 
    // current accumulated player curvature i.e. if they are similar, the car will be in the middle of the track
    car.pos = playerCurvature - trackCurvature;

    _updateVisualCoordinates();
    _checkForCollisions();
}

let _updateVisualCoordinates = () => {

    let _calculateRoadAndGrassPositions = () => {
        visualCoordinates = { lefts: [], rights: [], grassIntervals: [] };
        let grassTop = 0;
        let previousGrassColor = undefined;
        for (let y = 0; y <= H / 2; y++) {
            let perspective = y / (H / 2);
            let roadWidth = 0.1 + perspective * 0.8; // Min 10% Max 90%
            let clipWidth = roadWidth * 0.15;
            let halfRoadWidth = roadWidth / 2;
            let middlePoint = 0.5 + curvature * Math.pow((1 - perspective), 3);
            visualCoordinates.lefts.push([xx((middlePoint - halfRoadWidth - clipWidth) * W), yy(H / 2 + y)]);
            visualCoordinates.rights.push([xx((middlePoint + halfRoadWidth + clipWidth) * W), yy(H / 2 + y)]);
            
            let grassColor = Math.sin(20 * Math.pow(1 - perspective, 3) + distance * 0.1) > 0 ? 0 : 1;
            if (y == H / 2 - 1 || (previousGrassColor && previousGrassColor != grassColor)) {
                visualCoordinates.grassIntervals.push([grassTop, y - grassTop + 1]);
                grassTop = y;
            }
            previousGrassColor = grassColor;
        }
    }

    let _getObjectX = (y, offset) => {
        let l = visualCoordinates.lefts, r = visualCoordinates.rights;
        if (y < l[0][1]) {
            return;
        }

        let i = l.findIndex(e => e[1] >= y);
        let leftTopY = l[i - 1][1];
        let leftBotY = l[i][1];
        let offsetY = (y - leftTopY) / (leftBotY - leftTopY);

        let leftTopX = l[i - 1][0];
        let leftBotX = l[i][0];
        let rightTopX = r[i - 1][0];
        let rightBotX = r[i][0];

        let leftX = leftTopX + (leftBotX - leftTopX) * offsetY;
        let rightX = rightTopX + (rightBotX - rightTopX) * offsetY;
        
        return leftX + offset * (rightX - leftX);
    }

    let _updateVisualObject = (o, i, name) => {
        let key = `${name}${i}`;
        visualCoordinates[key] = undefined;
        let drawDistance = 170;
        let nearClip = 10;  // Objects closer than this are past the car
        let distAhead = (o.ahead - distance + trackDistance) % trackDistance;
        if (distAhead <= nearClip || distAhead > drawDistance) {
            return;
        }
        let perspective = nearClip / distAhead;
        let y = yy(H / 2 + perspective * (H / 2));
        let x = _getObjectX(y, o.left);
        if (x) {
            visualCoordinates[key] = { x : x, y : y, size: perspective, alpha: (drawDistance - distAhead) / drawDistance }
        }
    }

    _calculateRoadAndGrassPositions();
    goodRainbows.forEach((r, i) => _updateVisualObject(r, i, "GR"));
    badRainbows.forEach((r, i) => _updateVisualObject(r, i, "BR"));
    unicorns.forEach((r, i) => _updateVisualObject(r, i, "U"));
    _updateVisualObject(endRainbow, 0, "E");
    visualCoordinates.carX = xx(W / 2 + W * car.pos / 2);
    visualCoordinates.carY = yy(0.9 * H);
}

let _checkForCollisions = () => {
    let cx = visualCoordinates.carX;
    let cy = visualCoordinates.carY;

    let _checkForCollision = (i, name, fn) => {
        let key = `${name}${i}`;
        if (!visualCoordinates[key] || deadObjects[key]) {
            return;
        }
        let ox = visualCoordinates[key].x;
        let oy = visualCoordinates[key].y;
        if (Math.abs(ox - cx) < ww(20) && Math.abs(oy - cy) < hh(14)) {
            deadObjects[key] = true;
            fn();
        }
    }

    goodRainbows.forEach((_, i) => _checkForCollision(i, "GR", () => {
        energy = Math.min(energy + 10, 100); 
    }));
    badRainbows.forEach((_, i) => _checkForCollision(i, "BR", () => {
    }));
    unicorns.forEach((_, i) => _checkForCollision(i, "U", () => {
        breaking = true;
    }));
    _checkForCollision(endRainbow, 0, "E", () => {
        // Handle collision with end rainbow
    });
}