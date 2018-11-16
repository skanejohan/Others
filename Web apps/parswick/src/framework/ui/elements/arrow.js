export { ArrowElement } ;

class ArrowElement extends Polygon {
    constructor(cx, cy, size, style, direction, onclick) {
        var x, y;
        switch(direction) {
            case "E": x = cx - 0.3 * size; y = cy - 0.5 * size; break;
            case "S": x = cx - 0.5 * size; y = cy - 0.3 * size; break;
            case "W": x = cx - 0.7 * size; y = cy - 0.5 * size; break;
            case "N": x = cx - 0.5 * size; y = cy - 0.7 * size; break;
        }
        var positions = FACTORS[direction].map(f => { return { x: x + f[0] * size, y: y + f[1] * size }});
        super(positions, style, onclick);
    }
}

const FACTORS = {
    "E": [[0.0,0.2],[0.6,0.2],[0.6,0.0],[1.0,0.5],[0.6,1.0],[0.6,0.8],[0.0,0.8],[0.0,0.2]],
    "S": [[0.2,0.0],[0.2,0.6],[0.0,0.6],[0.5,1.0],[1.0,0.6],[0.8,0.6],[0.8,0.0],[0.2,0.0]],
    "W": [[1.0,0.2],[0.4,0.2],[0.4,0.0],[0.0,0.5],[0.4,1.0],[0.4,0.8],[1.0,0.8],[1.0,0.2]],
    "N": [[0.2,1.0],[0.2,0.4],[0.0,0.4],[0.5,0.0],[1.0,0.4],[0.8,0.4],[0.8,1.0],[0.2,1.0]],
}
