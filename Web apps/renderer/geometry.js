let getGeometry = model => {

    let convert = (model, dx, dy, dz, list) => {

        let isIterable = o => {  
            if (o === null || o === undefined) {
                return false
            }
            return typeof o[Symbol.iterator] === 'function'
        }

        if (isIterable(model)) {
            for (let part of model) {
                convert(part, dx, dy, dz, list);
            }
        } else if (model.model) {
            convert(model.model, dx + (model.x ?? 0), dy + (model.y ?? 0), dz + (model.z ?? 0), list)
        } else {
            let x1 = (model.x ?? model.x1) + dx;
            let x2 = (model.x ?? model.x2) + dx;
            let y1 = (model.y ?? model.y1) + dy;
            let y2 = (model.y ?? model.y2) + dy;
            let z1 = (model.z ?? model.z1) + dz;
            let z2 = (model.z ?? model.z2) + dz;
            let minX = Math.min(x1, x2);
            let maxX = Math.max(x1, x2);
            let minY = Math.min(y1, y2);
            let maxY = Math.max(y1, y2);
            let minZ = Math.min(z1, z2);
            let maxZ = Math.max(z1, z2);
            let p1, p2, p3, p4;
            if (x1 === x2) {
                let x = x1;
                p1 = [x, minY, minZ];
                p2 = [x, minY, maxZ];
                p3 = [x, maxY, maxZ];
                p4 = [x, maxY, minZ];
            } else if (y1 === y2) {
                let y = y1;
                p1 = [minX, y, minZ];
                p2 = [minX, y, maxZ];
                p3 = [maxX, y, maxZ];
                p4 = [maxX, y, minZ];
            } else if (z1 === z2) {
                let z = z1;
                p1 = [minX, minY, z];
                p2 = [minX, maxY, z];
                p3 = [maxX, maxY, z];
                p4 = [maxX, minY, z];
            } else {
                return;
            }
            list.push([ p1, p2, p3, p4 ]);
        }
    }

    let list = []; 
    convert(model, 0, 0, 0, list); 
    return list;
}