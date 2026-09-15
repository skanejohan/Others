let renderRectangles = (rs, ops3d, ops2d, ctx) => {

    let renderRectangle = r => {
        let points3d = r;
        for(let op of ops3d) {
            points3d = points3d.map(op);
        }

        let points2d = points3d.map(p => project(p, 50));
        for(let op of ops2d) {
            points2d = points2d.map(op);
        }

        let [x0, y0] = points2d[0];
        let [x1, y1] = points2d[1];
        let [x2, y2] = points2d[2];
        let [x3, y3] = points2d[3];

        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x0, y0);
        ctx.fill();
        ctx.stroke();
    }

    rs.forEach(renderRectangle);
}

