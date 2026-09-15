let chair = () => {
    
    let frontleg = [ 
        { x1: 0, x2: 1, y1: 0, y2: 5, z: 0},
        { x: 0, y1: 0, y2: 5, z1: 0, z2: 1},
        { x1: 0, x2: 1, y1: 0, y2: 5, z: 1},
        { x: 1, y1: 0, y2: 5, z1: 0, z2: 1},
        { x1: 0, x2: 1, y: 5, z1: 0, z2: 1},
    ]
    
    let rearleg = [ 
        { x1: 0, x2: 1, y1: 0, y2: 10, z: 0},
        { x: 0, y1: 0, y2: 10, z1: 0, z2: 1},
        { x1: 0, x2: 1, y1: 0, y2: 10, z: 1},
        { x: 1, y1: 0, y2: 10, z1: 0, z2: 1},
        { x1: 0, x2: 1, y: 10, z1: 0, z2: 1},
    ]

    let seat = [
        { x1: 0, x2: 4, y1: 0, y2: 1, z: 0},
        { x: 0, y1: 0, y2: 1, z1: 0, z2: 6},
        { x1: 0, x2: 4, y1: 0, y2: 1, z: 6},
        { x: 4, y1: 0, y2: 1, z1: 0, z2: 6},
        { x1: 0, x2: 4, y: 1, z1: 0, z2: 6},
    ]

    let back = [
        { x1: 0, x2: 4, y1: 0, y2: 1, z: 0.2},
        { x: 0, y1: 0, y2: 1, z1: 0.2, z2: 1},
        { x1: 0, x2: 4, y1: 0, y2: 1, z: 1},
        { x: 4, y1: 0, y2: 1, z1: 0.2, z2: 1},
    ]

    return [
        { model: frontleg },
        { model: frontleg, x: 5 },
        { model: rearleg, z: 5 },
        { model: rearleg, x: 5, z: 5 },
        { model: seat, x: 1, y: 3.8 },
        { model: back, x: 1, y: 6, z: 5 },
        { model: back, x: 1, y: 8.5, z: 5 },
    ];
}
