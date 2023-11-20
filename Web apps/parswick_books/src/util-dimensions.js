createDimensions = (stdWidth, stdHeight, scale) => {
    let _scale = scale;

    return {
        setScale: s => _scale = s,
        getScale: () => _scale,
        width: () => stdWidth * _scale,
        height: () => stdHeight * _scale,
    }
}