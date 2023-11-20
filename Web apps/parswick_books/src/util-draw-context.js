createDrawContext = (dimensions, canvas) => {
    let _context = canvas.getContext('2d');

    let renderDebugInfo = (x, y, w, h) => {
        if (Constants.renderDebugInformation) {
            _context.strokeStyle = "yellow";
            _context.strokeRect(x, y, w, h);
        }
    }

    let _setFont = (stdSize, style) => {
        let size = stdSize * dimensions.getScale();
        _context.fillStyle = style;
        _context.font = `${size}px kongtext`;
    }

    let _drawImage = (image, x, y, w, h) => {
        let s = dimensions.getScale(), _x = x * s, _y = y * s, _w = w * s, _h = h * s;
        _context.imageSmoothingEnabled = false;
        if (image) {
            _context.drawImage(image, _x, _y, _w, _h);
        }
        renderDebugInfo(_x, _y, _w, _h);
    };

    let _drawRect = (x, y, w, h, c) => {
        let s = dimensions.getScale();
        _context.strokeStyle = c;
        _context.strokeRect(x * s, y * s, w * s, h * s);
    }

    let _drawRectR = (r, c) => {
        _drawRect(r.left, r.top, r.width, r.height, c);
    }

    let _drawText = (text, x, y, stdSize, style) => {
        let s = dimensions.getScale();
        _setFont(stdSize, style);
        _context.fillText(text, x * s, y * s);
    }

    let _drawDescription = text => {
        _setFont(5, "yellow");
        let { sentences, longestLine } = breakText(text, 63);
        let s = dimensions.getScale(), x = 5 * s, y = 147 * s, dy = 6 * s;
        sentences.forEach(text => {_context.fillText(text, x, y); y += dy; });
    }

    return {
        clear: (color) => {
            _context.fillStyle = color || "black";
            _context.fillRect(0, 0, dimensions.width(), dimensions.height());
        },
        drawDebugRectangles: b => _debug = b,
        drawImage: _drawImage,
        drawImageR: (image, r) => _drawImage(image, r.left, r.top, r.width, r.height),
        drawText: _drawText,
        drawRect: _drawRect,
        drawRectR: _drawRectR,
        drawDescription: _drawDescription
    }
}