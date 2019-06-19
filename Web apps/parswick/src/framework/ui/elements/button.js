export { ButtonElement }

class ButtonElement extends Button {
    constructor(x, y, w, h, text, fn) {
        let appearance = {
            frameColor:          LAYER1FRAMECOLOR, 
            frameColorHighlight: LAYER2FRAMECOLOR,
            frameColorClicked:   LAYER2FRAMECOLOR,
            bgColor:             LAYER1COLOR,
            bgColorHighlight:    LAYER2COLOR,
            bgColorClicked:      LAYER2COLOR,
            fontColor:           "black",
            fontColorHighlight:  "black",
            fontColorClicked:    "black",
            font:                FONT,
            margin:              3,           
        }        
        super(x, y, w, h, text, fn, appearance);
    }
}