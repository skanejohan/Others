let _createCanvas = (w, h, fn) => {
    var _canvas = document.createElement('canvas');
    _canvas.width = w;
    _canvas.height = h;
    fn(_canvas.getContext("2d"));
    return _canvas;
}

let _createCar = () => _createCanvas(280, 180, _ctx => {
    _ctx.fillStyle = "yellow";

    _ctx.fillStyle = '#333';
    _ctx.beginPath();
    _ctx.roundRect(20, 130, 50, 50, 5);
    _ctx.roundRect(210, 130, 50, 50, 5);
    _ctx.fill();

    _ctx.fillStyle = '#F17B85FF';
    _ctx.beginPath();
    _ctx.moveTo(40, 100);
    _ctx.lineTo(240, 100);
    _ctx.bezierCurveTo(260, 50, 260, 0, 140, 0);
    _ctx.bezierCurveTo(20, 0, 20, 50, 40, 100);
    _ctx.closePath();
    _ctx.fill();
    _ctx.strokeStyle = '#b02a37';
    _ctx.lineWidth = 2;
    _ctx.stroke();

    _ctx.fillStyle = '#e63946';
    _ctx.beginPath();
    _ctx.moveTo(10, 150); 
    _ctx.lineTo(270, 150); 
    _ctx.bezierCurveTo(290, 100, 290, 50, 140, 50);
    _ctx.bezierCurveTo(-10, 50, -10, 100, 10, 150);
    _ctx.closePath();
    _ctx.fill();
    _ctx.strokeStyle = '#b02a37';
    _ctx.lineWidth = 2;
    _ctx.stroke();

    _ctx.fillStyle = "#A59495FF";
    _ctx.beginPath();
    _ctx.roundRect(0, 140, 280, 20, 4);
    _ctx.fill();

    _ctx.fillStyle = '#ff6b6b';
    _ctx.beginPath();
    _ctx.arc(30, 110, 15, 0, Math.PI * 2);
    _ctx.fill();
    _ctx.beginPath();
    _ctx.arc(250, 110, 15, 0, Math.PI * 2);
    _ctx.fill();
});

let _createUnicornCoin = () => _createCanvas(310, 310, _ctx => {
    _ctx.beginPath();
    _ctx.arc(155, 155, 150, 0, 2 * Math.PI);
    _ctx.clip();
    _ctx.fillStyle = "blue";
    _ctx.fillRect(0, 0, 310, 310);
    _ctx.lineWidth = 30;
    _ctx.strokeStyle = "black";
    _ctx.arc(155, 155, 150, 0, 2 * Math.PI);
    _ctx.stroke();
});

let _createRainbowCoin = (colors) => _createCanvas(310, 310, _ctx => {
    _ctx.beginPath();
    _ctx.arc(155, 155, 150, 0, 2 * Math.PI);
    _ctx.clip();
    colors.forEach((color, index) => {
        _ctx.fillStyle = color;
        _ctx.fillRect(0, index * 43, 310, 43);
    });
    _ctx.lineWidth = 30;
    _ctx.strokeStyle = "black";
    _ctx.arc(155, 155, 150, 0, 2 * Math.PI);
    _ctx.stroke();
});

let _createRainbow = (colors) => _createCanvas(540, 300, _ctx => {
    const centerX = 270;
    const centerY = 300;
    const strokeWidth = 30;
    const radii = [150, 170, 190, 210, 230, 250];
    _ctx.lineWidth = strokeWidth;
    _ctx.lineCap = 'round';
    colors.forEach((color, index) => {
        _ctx.beginPath();
        _ctx.arc(centerX, centerY, radii[index], Math.PI, 0, false);
        _ctx.strokeStyle = color;
        _ctx.stroke();
    });
    return canvas;
});
let carAsset = _createCar();
let goodRainbow = _createRainbowCoin(['#ff4136', '#ff851b', '#ffdc00', '#2ecc40', '#2dcfff', '#0051e0', '#b10dc9']);
let badRainbow = _createRainbowCoin(["#F5F5F5", "#D3D3D3", "#A9A9A9", "#808080", "#555555", "#333333", "#1A1A1A"]);
let endRainbowAsset = _createRainbow(['#ff4136', '#ff851b', '#ffdc00', '#2ecc40', '#2dcfff', '#0051e0', '#b10dc9']);
let unicornAsset = _createUnicornCoin();

