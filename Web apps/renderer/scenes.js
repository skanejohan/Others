
let scene1 = () => {

    let leftSideGradient = () => {
        let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#3E2723'); // Mörkbrun (t.ex. mörk choklad / HEX)
        gradient.addColorStop(1, '#D7CCC8'); // Ljusbrun (t.ex. latte / HEX)
        return gradient;
    }

    let rightSideGradient = () => {
        let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(1, '#3E2723'); // Mörkbrun (t.ex. mörk choklad / HEX)
        gradient.addColorStop(0, '#D7CCC8'); // Ljusbrun (t.ex. latte / HEX)
        return gradient;
    }

    return {
        objects: [
            { 
                model: [ { polygon: [ [-200, -100, 50], [200, -100, 50], [200, 100, 50], [-200, 100, 50] ], id: "leftside" } ],
                renderorder: ["leftside"],
                fillStyle: leftSideGradient(),
                strokeStyle: "black",
                lineWidth: 1,
                ops3d: [p => rotate3(p, -Math.PI / 12, 'y')],
                ops2d: [p => scale2(p, 3, 3), p => translate2(p, 250, 250)]
            },
            { 
                model: [ { polygon: [ [-200, -100, 50], [200, -100, 50], [200, 100, 50], [-200, 100, 50] ], id: "rightside" } ],
                renderorder: ["rightside"],
                fillStyle: rightSideGradient(),
                strokeStyle: "black",
                lineWidth: 1,
                ops3d: [p => rotate3(p, Math.PI / 12, 'y')],
                ops2d: [p => scale2(p, 3, 3), p => translate2(p, 833, 250)]
            },
            { 
                model: [ { polygon: [ [-200, -100, 50], [200, -100, 50], [200, 100, 50], [-200, 100, 50] ], id: "rear" } ],
                renderorder: ["rear"],
                fillStyle: "red",
                strokeStyle: "black",
                lineWidth: 1,
                ops3d: [],
                ops2d: [p => scale2(p, 3, 3), p => translate2(p, 542, 250)]
            },
            {
                model: chair(),
                renderorder: ["leg3", "leg1", "seat", "back1", "back2", "leg4", "leg2"],
                fillStyle: "red",
                strokeStyle: "black",
                lineWidth: 1,
                ops3d: [p => rotate3(p, Math.PI / 5, 'y'), p => rotate3(p, -Math.PI / 16, 'x')],
                ops2d: [p => scale2(p, 16, 16), p => translate2(p, 650, 450)]
            },
            {
                model: chair(),
                renderorder: ["leg4", "back1", "back2", "leg2", "seat", "leg3", "leg1"],
                fillStyle: "red",
                strokeStyle: "black",
                lineWidth: 1,
                ops3d: [p => rotate3(p, -Math.PI / 5, 'y'), p => rotate3(p, -Math.PI / 16, 'x')],
                ops2d: [p => scale2(p, 16, 16), p => translate2(p, 450, 450)]
            },
        ]
    }
}