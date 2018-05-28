var THESEUS = THESEUS || {};

THESEUS.DRAWING = THESEUS.DRAWING || {};

THESEUS.DRAWING.Layers = function() {
    
    var layers = {};
    var highestLayerIndex = 0;

    var object = {
        clear : clear,             // function()
        addToLayer : addToLayer,   // function(layerIndex, fn)
        draw : draw,               // function()
    }
    return object;

    function clear() {
        layers = {};
        highestLayerIndex = 0;
    }

    function addToLayer(layerIndex, fn) {
        if (layerIndex > highestLayerIndex) {
            highestLayerIndex = layerIndex;
        }
        if (layers[layerIndex] == null) {
            layers[layerIndex] = []
        }
        layers[layerIndex].push(fn);
    }

    function draw() {
        for (var i = 0; i <= highestLayerIndex; i++) {
            var functions = layers[i];
            if (functions != null) {
                for (var j = 0; j < functions.length; j++) {
                    functions[j]();
                }
            }
        }
    }
}
