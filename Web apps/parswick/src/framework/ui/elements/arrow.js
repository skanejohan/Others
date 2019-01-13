export { ArrowElement };

class ArrowElement extends ComplexElementBase {
    constructor(cx, cy, direction, onclick) {
        var x, y;
        switch(direction) {
            case "E": x = cx - 0.3 * SIZE; y = cy - 0.5 * SIZE; break;
            case "S": x = cx - 0.5 * SIZE; y = cy - 0.3 * SIZE; break;
            case "W": x = cx - 0.7 * SIZE; y = cy - 0.5 * SIZE; break;
            case "N": x = cx - 0.5 * SIZE; y = cy - 0.7 * SIZE; break;
        }
        super(x, y, SIZE, SIZE, onclick);
        this.direction = direction;

        CLICKRECTS.forEach(obj => {
            var dObj = this._getDirectionalClickRectInfo(obj);
            this.addClickRect(this.x + dObj.p1c1, this.y + dObj.p1c2, 
                this.x + dObj.p2c1, this.y + dObj.p2c2);
        });
    }

    _getDirectionalEdgeInfo(obj) {
        switch(this.direction) {
            case "E": return { cc1: obj.cc2, cc2: obj.cc1, pc1: obj.pc2, pc2: obj.pc1 }
            case "S": return { cc1: obj.cc1, cc2: obj.cc2, pc1: obj.pc1, pc2: obj.pc2 }
            case "W": return { cc1: SIZE - obj.cc2, cc2: obj.cc1, pc1: SIZE - obj.pc2, pc2: obj.pc1 }
            case "N": return { cc1: obj.cc1, cc2: SIZE - obj.cc2, pc1: obj.pc1, pc2: SIZE - obj.pc2 }
        }
    }

    _getDirectionalClickRectInfo(obj) {
        switch(this.direction) {
            case "E": return { p1c1: obj.p1c2, p1c2: obj.p1c1, p2c1: obj.p2c2, p2c2: obj.p2c1 }
            case "S": return { p1c1: obj.p1c1, p1c2: obj.p1c2, p2c1: obj.p2c1, p2c2: obj.p2c2 }
            case "W": return { p1c1: SIZE - obj.p1c2, p1c2: obj.p1c1, p2c1: SIZE - obj.p2c2, p2c2: obj.p2c1 }
            case "N": return { p1c1: obj.p1c1, p1c2: SIZE - obj.p1c2, p2c1: obj.p2c1, p2c2: SIZE - obj.p2c2 }
        }
    }

    _doDraw(ctx) {
        if (this.hovering()) {
            ctx.fillStyle = "white";
        }
        else {
            ctx.fillStyle = LAYER1COLOR;
        }
        ctx.beginPath();
        OUTEREDGE.forEach(obj => {
            var dObj = this._getDirectionalEdgeInfo(obj);
            switch(obj.type) {
                case "move":
                    ctx.moveTo(this.x + dObj.pc1, this.y + dObj.pc2);
                    break;
                case "qc":
                    ctx.quadraticCurveTo(this.x + dObj.cc1, this.y + dObj.cc2, this.x + dObj.pc1, this.y + dObj.pc2);
                    break;
                case "line":
                    ctx.lineTo(this.x + dObj.pc1, this.y + dObj.pc2);
                    break;
            }
        });
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = LAYER1FRAMECOLOR;
        ctx.beginPath();
        INNEREDGE.forEach(obj => {
            var dObj = this._getDirectionalEdgeInfo(obj);
            switch(obj.type) {
                case "move":
                    ctx.moveTo(this.x + dObj.pc1, this.y + dObj.pc2);
                    break;
                case "qc":
                    ctx.quadraticCurveTo(this.x + dObj.cc1, this.y + dObj.cc2, this.x + dObj.pc1, this.y + dObj.pc2);
                    break;
                case "line":
                    ctx.lineTo(this.x + dObj.pc1, this.y + dObj.pc2);
                    break;
            }
        });
        ctx.closePath();
        ctx.fill();

        //this._drawClickRects(ctx);
    }
}

const SIZE = 50;

const OUTEREDGE = [
    { type: "move", pc1: 15, pc2: 5 },
    { type: "qc", cc1: 15, cc2: 0, pc1: 20, pc2: 0},
    { type: "line", pc1: 30, pc2: 0 },
    { type: "qc", cc1: 35, cc2: 0, pc1: 35, pc2:  5},
    { type: "line", pc1: 35, pc2: 20 },
    { type: "qc", cc1: 35, cc2: 25, pc1: 40, pc2: 25},
    { type: "line", pc1: 45, pc2: 25 },
    { type: "qc", cc1: 49, cc2: 27, pc1: 45, pc2: 30},
    { type: "line", pc1: 30, pc2: 45 },
    { type: "qc", cc1: 25, cc2: 50, pc1: 20, pc2: 45},
    { type: "line", pc1: 5, pc2: 30 },
    { type: "qc", cc1: 1, cc2: 27, pc1: 5, pc2: 25},
    { type: "line", pc1: 10, pc2: 25 },
    { type: "qc", cc1: 15, cc2: 25, pc1: 15, pc2: 20},
]

const INNEREDGE = [
    { type: "move", pc1: 17, pc2: 4 },
    { type: "qc", cc1: 17, cc2: 2, pc1: 19, pc2: 2},
    { type: "line", pc1: 31, pc2: 2},
    { type: "qc", cc1: 33, cc2: 2, pc1: 33, pc2: 4},
    { type: "line", pc1: 33, pc2: 23},
    { type: "qc", cc1: 33, cc2: 27, pc1: 37, pc2: 27},
    { type: "line", pc1: 45, pc2: 27},
    { type: "qc", cc1: 46, cc2: 27, pc1: 43, pc2: 30},
    { type: "line", pc1: 28, pc2: 44},
    { type: "qc", cc1: 25, cc2: 47, pc1: 22, pc2: 44},
    { type: "line", pc1: 7, pc2: 30},
    { type: "qc", cc1: 4, cc2: 27, pc1: 5, pc2: 27},
    { type: "line", pc1: 13, pc2: 27},
    { type: "qc", cc1: 17, cc2: 27, pc1: 17, pc2: 23},
]

const CLICKRECTS = [
    { p1c1: 15, p1c2: 0, p2c1: 35, p2c2: 35 },
    { p1c1: 0, p1c2: 25, p2c1: 15, p2c2: 35 },
    { p1c1: 10, p1c2: 35, p2c1: 20, p2c2: 45 },
    { p1c1: 20, p1c2: 35, p2c1: 30, p2c2: 50 },
    { p1c1: 35, p1c2: 25, p2c1: 50, p2c2: 35 },
    { p1c1: 30, p1c2: 35, p2c1: 40, p2c2: 45 },
]
