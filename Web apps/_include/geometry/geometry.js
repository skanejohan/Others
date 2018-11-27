/*
  point: { x: 10, y: 10 }
  line: { x1: 10, y1: 10 , x2: 20, y2: 20 }
  box: { left: 10, top: 10, right: 20, bottom: 20 }
  polygon: array of point
*/

class Geometry {

    static line(p1, p2) {
        return { 
            x1: p1.x, 
            y1: p1.y, 
            x2: p2.x, 
            y2: p2.y,
            toString: () => `(${p1.x},${p1.y})-(${p2.x},${p2.y})`
        }
    }

    static boundingBox(obj) {
        var l, t, r, b;
        if (Array.isArray(obj)) {
            let polygon = obj;
            let xs = polygon.map(p => p.x);
            let ys = polygon.map(p => p.y);
            l = xs.reduce((a,b) => Math.min(a,b));
            t = ys.reduce((a,b) => Math.min(a,b));
            r = xs.reduce((a,b) => Math.max(a,b));
            b = ys.reduce((a,b) => Math.max(a,b));
        }
        else {
            let line = obj;
            l = Math.min(line.x1, line.x2);
            t = Math.min(line.y1, line.y2);
            r = Math.max(line.x1, line.x2);
            b = Math.max(line.y1, line.y2);
        }

        return {
            left: l,
            top: t,
            right: r,
            bottom: b,
            toString: () => `(${l},${t})-(${r},${b})`
        }
    }

    static inBoundingBox(point, box) {
        if (point.x > box.right || point.y > box.bottom || point.x < box.left || point.y < box.top) {
            return false;
        }
        return true;
    }

    static onSameSide(line, p1, p2) {
        let box = this.boundingBox(line);
        let dx = box.right - box.left;
        let dy = box.bottom - box.top;
        let dx1 = p1.x - box.left;
        let dy1 = p1.y - box.top;
        let dx2 = p2.x - box.right;
        let dy2 = p2.y - box.bottom;
        return (dx * dy1 - dy * dx1) * (dx * dy2 - dy * dx2) > 0;
    }

    static topLeft(box) {
        return { 
            x: box.left, 
            y: box.top 
        }
    }

    static bottomRight(box) {
        return { 
            x: box.right, 
            y: box.bottom 
        }
    }

    static overlap(box1, box2) {
        return !(box1.right < box2.left || box1.bottom < box2.top || box2.right < box1.left || box2.bottom < box1.top);
    }

    static intersect(line1, line2) {
        let box1 = this.boundingBox(line1);
        let box2 = this.boundingBox(line2);
        let res1 = this.overlap(box1, box2);
        let res2 = this.onSameSide(line1, this.topLeft(line2), this.bottomRight(line2));
        let res3 = this.onSameSide(line2, this.topLeft(line1), this.bottomRight(line1));
        
        return this.overlap(box1, box2) && 
            !this.onSameSide(line1, this.topLeft(line2), this.bottomRight(line2)) &&
            !this.onSameSide(line2, this.topLeft(line1), this.bottomRight(line1));
    }

    /*
        Determines if the point is inside the polygon. box is the bounding
        box of the polygon. If box is not supplied, it will be calculated.
    */
   static inside(point, polygon, box) {
        var intersections = 0;
        box = box || this.boundingBox(polygon);

        // Create a horizontal line from the test point, ending just to the right of the bounding box.
        let testLine = this.line(point, { x: box.right + 1, y: point.y });

        for (var i = 0; i < polygon.length-1; i++) {
            var edgeLine = this._getEdgeLine(polygon, i);
            var nextEdgeLine = this._getEdgeLine(polygon, i+1);
            if (this._checkIntersection(testLine, edgeLine, nextEdgeLine)) {
                intersections += 1;
                console.log("true");
            }
        }

        // If we have an odd number of intersections, the point was inside the polygon
        return intersections % 2 == 1;
    }

    static _getEdgeLine(polygon, index) {
        if (index >= polygon.length-1) {
            return this.line(polygon[polygon.length-1], polygon[0]);
        }
        return this.line(polygon[index], polygon[index+1]);
    }

    static _checkIntersection(testLine, edgeLine, nextEdgeLine) {
        let edgeLineBox = this.boundingBox(edgeLine);
        let nextEdgeLineBox = this.boundingBox(nextEdgeLine);
        console.log("checking " + testLine + " against " + edgeLineBox + " and " + nextEdgeLineBox);
        if (testLine.y1 == edgeLineBox.bottom && testLine.x1 < edgeLineBox.right) {
            // The test line crosses an end node of the edge line. We now calculate the 
            // vertical direction of the edge line, and of the next edge line. If these 
            // two successive edge lines go "in the same vertical direction" (i.e. a 
            // shape similar to "|", ">" or "<"), an intersection has occurred. If they
            // don't (i.e. they form a shape similar to "-", "/\", or "V"), no intersection
            // has occurred.

            let edgeLineBoxDeltaY = edgeLineBox.bottom - edgeLineBox.Top;
            let nextEdgeLineBoxDeltaY = nextEdgeLineBox.bottom - nextEdgeLineBox.Top;
            return (edgeLineBoxDeltaY > 0 && nextEdgeLineBoxDeltaY >= 0) ||
                   (edgeLineBoxDeltaY < 0 && nextEdgeLineBoxDeltaY <= 0);
        }

        if (testLine.y1 == edgeLineBox.top) {
            // The test line crosses the edge line's start node - don't count as intersection
            return false;
        }

        // The test line crosses neither of the two nodes of the edge line. 
        // Check if the two lines intersect.
        return this.intersect(testLine, edgeLine);
    }
}

class GeometryTest {
    static test(point) {
        let arrow = [
            {x: 235, y: 385},
            {x: 235, y: 415},
            {x: 225, y: 415},
            {x: 250, y: 435},
            {x: 275, y: 415},
            {x: 265, y: 415},
            {x: 265, y: 385},
            {x: 235, y: 385},
        ]
        console.log(Geometry.inside(point, arrow));
    }
}