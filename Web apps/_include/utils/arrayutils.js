export { ArrayUtils };

class ArrayUtils {
    static remove(array, item) {
        var idx = array.indexOf(item);
        if (idx > -1) {
            array.splice(idx, 1);
        }
    }
}
