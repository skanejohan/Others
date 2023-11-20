createObjectList = () => {
    let objectList = [];

    return {
        add: o => objectList.push(o),
        has: o => objectList.includes(o),
        replace: (old, replaceWith) => objectList.splice(objectList.indexOf(old), 1, replaceWith),
        remove: o => objectList.splice(objectList.indexOf(o), 1),
        forEachReversed: fn => {
            for (let i = objectList.length - 1; i >= 0; i--) {
                fn(objectList[i]);
            }
        }
    }
}