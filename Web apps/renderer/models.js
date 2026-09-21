let chair = () => {
    
    let model = {
        models: [ 
            { polygons: cuboid(0, 1, 0, 5, 0, 1), id: "leg1" },
            { polygons: cuboid(4, 5, 0, 5, 0, 1), id: "leg2" },
            { polygons: cuboid(0, 1, 0, 10, 4, 5), id: "leg3" },
            { polygons: cuboid(4, 5, 0, 10, 4, 5), id: "leg4" },
            { polygons: cuboid(1, 4, 4.1, 4.9, 0, 5), id: "seat" },
            { polygons: cuboid(1, 4, 7, 7.8, 4.2, 5), id: "back1" },
            { polygons: cuboid(1, 4, 9, 9.8, 4.2, 5), id: "back2" }
        ]
    };

    return getPolygons(model);
}

let cuboid = (x1, x2, y1, y2, z1, z2) => {
    return [
        [ [x1, y1, z1], [x2, y1, z1], [x2, y2, z1], [x1, y2, z1] ],
        [ [x1, y1, z2], [x2, y1, z2], [x2, y2, z2], [x1, y2, z2] ],
        [ [x1, y1, z1], [x2, y1, z1], [x2, y1, z2], [x1, y1, z2] ],
        [ [x1, y2, z1], [x2, y2, z1], [x2, y2, z2], [x1, y2, z2] ],
        [ [x1, y1, z1], [x1, y2, z1], [x1, y2, z2], [x1, y1, z2] ],
        [ [x2, y1, z1], [x2, y2, z1], [x2, y2, z2], [x2, y1, z2] ]
    ];
}

let getPolygons = (model, fillStyle, strokeStyle, lineWidth) => {

    let results = [];

    let get = (m, fS, sS, lW) => {
        let _fS = m.fillStyle ?? fS;
        let _sS = m.strokeStyle ?? sS;
        let _lW = m.lineWidth ?? lW;
        if (m.polygons) {
            m.polygons.forEach(p => {
                let result = { polygon: p };
                result.id = m.id;
                if (_fS) { result.fillStyle = _fS; } 
                if (_sS) { result.strokeStyle = _sS; } 
                if (_lW) { result.lineWidth = _lW; } 
                results.push(result);
            });
        } else if (m.models) {
            m.models.forEach(m => get(m, _fS, _sS, _lW));
        }
    }

    get(model, fillStyle, strokeStyle, lineWidth);
    return results;
}
