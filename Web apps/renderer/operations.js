let rotate3 = (p, aRad, axis) => {
    const s = Math.sin(aRad);
    const c = Math.cos(aRad);
    const m = {
        "x" : [ [1, 0, 0], [0, c, -s], [0, s, c] ],
        "y" : [ [c, 0, s], [0, 1, 0], [-s, 0, c] ],
        "z" : [ [c, -s, 0], [s, c, 0], [0, 0, 1] ]
    }[axis];
    const [x, y, z] = p;
    const _x = m[0][0] * x + m[0][1] * y + m[0][2] * z;
    const _y = m[1][0] * x + m[1][1] * y + m[1][2] * z;
    const _z = m[2][0] * x + m[2][1] * y + m[2][2] * z;
    return [_x, _y, _z];
}

let project = (p, cameraDistance) => {
    let [x, y, z] = p;
    return [
        x * cameraDistance / (cameraDistance + z), 
        -y * cameraDistance / (cameraDistance + z)];
}

let scale2 = (p, xS, yS) => {
    let [x, y] = p;
    return [x * xS, y * yS];
}

let translate2 = (p, dx, dy) => {
    let [x, y] = p;
    return [x + dx, y + dy];
}
