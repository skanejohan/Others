createMouse = (dimensions, canvas) => {
    let pos = undefined;
    let clicked = false;

    canvas.addEventListener("mousemove", e => {
        var rect = canvas.getBoundingClientRect();
        pos = {
            x: (e.clientX - rect.left) / dimensions.getScale(),
            y: (e.clientY - rect.top) / dimensions.getScale()
        }
    });

    canvas.addEventListener("mouseleave", e => {
        pos = undefined;
    });

    return {
        pos: () => pos,
        isClicked: () => clicked,
        setClicked: b => clicked = b
    }
}