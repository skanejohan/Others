let Renderer = cameraDistance => {

    let renderObjects = (objects, ctx) => {

        // Turn the objects into a list of 3d polygons, where the 3d operations have been applied
        let polygons3d = [];
        for (var o of objects) {
            let rects = getGeometry(o.model);
            for (var r of rects) {
                let polygon3d = r;
                for(let op of o.ops3d) {
                    polygon3d = polygon3d.map(op);
                }
                let z = Math.max(...polygon3d.map(p => p[2]));
                polygons3d.push( { polygon: polygon3d, object: o, z: z });
            }
        }

        // Sort the 3d polygons, so that the one with highest z is at the beginning of the list, to draw in correct order
        polygons3d.sort((a, b) => (b.z - a.z));


        // Project all polygons onto a 2-dimensional plane, and perform 2d operations
        let polygons2d = [];
        for (var p of polygons3d) {
            let polygon2d = p.polygon.map(point => project(point, cameraDistance));
            for(let op of p.object.ops2d) {
                polygon2d = polygon2d.map(op);
            }
            polygons2d.push( { polygon: polygon2d, object: p.object });
        }

        // Render the 2d polygons
        for (var p of polygons2d) {
            let [x0, y0] = p.polygon[0];
            let [x1, y1] = p.polygon[1];
            let [x2, y2] = p.polygon[2];
            let [x3, y3] = p.polygon[3];
            ctx.fillStyle = p.object.fillStyle;
            ctx.strokeStyle = p.object.strokeStyle;
            ctx.lineWidth = p.object.lineWidth;
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.lineTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.lineTo(x0, y0);
            ctx.fill();
            ctx.stroke();   
        }
    } 

    return { renderObjects };
}
