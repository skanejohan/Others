let _createCanvas = (w, h, fn) => {
    var _canvas = document.createElement('canvas');
    _canvas.width = w;
    _canvas.height = h;
    fn(_canvas.getContext("2d"));
    return _canvas;
}

let _createCar = () => _createCanvas(400, 300, _ctx => {
    _ctx.fillStyle = '#333';
    _ctx.beginPath();
    _ctx.roundRect(130, 230, 50, 50, 5);
    _ctx.roundRect(320, 230, 50, 50, 5);
    _ctx.fill();

    _ctx.fillStyle = '#F17B85FF';
    _ctx.beginPath();
    _ctx.moveTo(150, 200);
    _ctx.lineTo(350, 200);
    _ctx.bezierCurveTo(370, 150, 370, 100, 250, 100);
    _ctx.bezierCurveTo(130, 100, 130, 150, 150, 200);
    _ctx.closePath();
    _ctx.fill();
    _ctx.strokeStyle = '#b02a37';
    _ctx.lineWidth = 2;
    _ctx.stroke();

    _ctx.fillStyle = '#e63946';
    _ctx.beginPath();
    _ctx.moveTo(120, 250); 
    _ctx.lineTo(380, 250); 
    _ctx.bezierCurveTo(400, 200, 400, 150, 250, 150);
    _ctx.bezierCurveTo(100, 150, 100, 200, 120, 250);
    _ctx.closePath();
    _ctx.fill();
    _ctx.strokeStyle = '#b02a37';
    _ctx.lineWidth = 2;
    _ctx.stroke();

    _ctx.fillStyle = "#A59495FF";
    _ctx.beginPath();
    _ctx.roundRect(110, 240, 280, 20, 4);
    _ctx.fill();

    _ctx.fillStyle = '#ff6b6b';
    _ctx.beginPath();
    _ctx.arc(140, 210, 15, 0, Math.PI * 2);
    _ctx.fill();
    _ctx.beginPath();
    _ctx.arc(360, 210, 15, 0, Math.PI * 2);
    _ctx.fill();
});

let car = _createCar();
