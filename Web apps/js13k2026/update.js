let update = (dt) => {
    let et = dt / 1000;

    if (up) {
        speed += 2 * et;
    }
    else {
        speed -= 1 * et;
    }

    // Car Curvature is accumulated left/right input, but inversely proportional to speed i.e. it is harder to turn at high speed
    if (left) {
        playerCurvature -= 0.7 * et * (1 - speed / 2);
    }

    if (right) {
        playerCurvature += 0.7 * et * (1 - speed / 2);
    }

    // If car curvature is too different to track curvature, slow down as car has gone off track
    if (Math.abs(playerCurvature - trackCurvature) >= 0.8) {
        speed -= 5.0 * et;
    }

    // Clamp speed
    if (speed > 1) {
        speed = 1;
    }
    if (speed < 0) {
        speed = 0;
    }

    // Move car along track according to car speed
    distance += 70 * speed * et;

    // Get Point on track
    let offset = 0;
    let trackSection = 0;

    // Lap Timing and counting
    currentLapTime += et;
    if (distance >= trackDistance)
    {
        distance -= trackDistance;
        listLapTimes.unshift([currentLapTime]);
        listLapTimes.pop();
        currentLapTime = 0.0;
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

    
    // Collision detection work - entirely in world space, no screen maths needed.
    // Depth: fDistAhead near 0 means obstacle is just ahead; near fTrackDistance means
    // the car just passed it (fDistAhead wraps), so we check both ends of the range.
    // Lateral: fCarPos and fLateralPos are both in road-fraction [-1, 1].
    let collisionDepth   = 15.0;  // track units (around car length at world scale)
    let collisionLateral = 0.3;   // road-fraction (car half-width almost equal to 0.15 + margin)
    let colliding = false;

    for (let rb of goodRainbows)
    {
        let fDistAhead = (rb[0] - distance + trackDistance) % trackDistance;
        let bDepthHit   = fDistAhead < collisionDepth || fDistAhead > trackDistance - collisionDepth;
        let bLateralHit = Math.abs(carPos - rb[1]) < collisionLateral;

        //console.log(fDistAhead, bDepthHit, bLateralHit, carPos, rb[1]);
        if (bDepthHit && bLateralHit)
        {
            colliding = true;
            //console.log("BOOM");
        }
    }
}