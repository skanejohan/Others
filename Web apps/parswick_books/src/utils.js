var Objects = {
    
    add: (object, scene) => {
        scene.objects.splice(0, 0, object);
    },
    
    getAt: (pos, scene) => {
        for (let i = 0; i < scene.objects.length; i++) {
            var object = scene.objects[i];
            if (insideRect(pos, object.rect) && !object.hidden) {
                return object;
            } 
        }
        return undefined;
    },
    
    has: (object, scene) => {
        for (let i = 0; i < scene.objects.length; i++) {
            if (object == scene.objects[i] && !object.hidden) {
                return true;
            }
        }
        return false;
    },
    
    remove: (object, scene) => {
        for (let i = 0; i < scene.objects.length; i++) {
            if (object == scene.objects[i] && !object.hidden) {
                scene.objects.splice(i, 1);
            }
        }
    },
    
    replace: (oldObject, newObject, scene) => {
        for (let i = 0; i < scene.objects.length; i++) {
            if (oldObject == scene.objects[i]) {
                os.splice(i, 1, newObject);
            }
        }
    }
}

var Draw = {
    debugRectangle: (left, top, width, height) => {
        context.strokeStyle = "yellow";
        context.strokeRect(left, top, width, height);
    }
}


function loadImage(fileName) {
    var image = new Image();
    image.src = `assets/${fileName}.png`;
    return image;
}

function mousePosInLocation() {
    var pos = { x : mousePos.x - 600, y : mousePos.y - 300 };
    return pos.x < 0 || pos.x > 720 || pos.y < 0 || pos.y > 520 ? null : pos;
}

function drawDescription(texts) {
    context.fillStyle = "yellow";
    context.font = "32px kongtext";
    var dy = 0;
    var y = 920;
    if (texts.length > 4) {
        y -= (texts.length - 4) * 40;
    }
    texts.forEach(text => {context.fillText(text, 100, y + dy); dy += 40; });
}

function drawMessage(texts) {
    context.fillStyle = "yellow";
    context.font = "32px kongtext";
    var y = 100;
    texts.forEach(text => {context.fillText(text, 100, y); y += 40; });
}

function insideRect(pos, rect) {
    return pos && rect 
        && pos.x >= rect.left 
        && pos.y >= rect.top 
        && pos.x <= rect.left + rect.width 
        && pos.y <= rect.top + rect.height;
}

// Objects

function addObject(o, os) {
    os.splice(0, 0, o);
}

function getObjectAt(pos, os) {
    for (let i = 0; i < os.length; i++) {
        var o = os[i];
        if (insideRect(pos, o.rect) && !o.hidden) {
            return o;
        } 
    }
    return undefined;
}

function hasObject(o, os) {
    for (let i = 0; i < os.length; i++) {
        if (o == os[i]) {
            return true;
        }
    }
    return false;
}

function removeObject(o, os) {
    for (let i = 0; i < os.length; i++) {
        if (o == os[i]) {
            os.splice(i, 1);
        }
    }
}

function replaceObject(oldObj, newObj, os) {
    for (let i = 0; i < os.length; i++) {
        if (oldObj == os[i]) {
            os.splice(i, 1, newObj);
        }
    }
}
