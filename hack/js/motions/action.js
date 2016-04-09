var RectPrototype = {
    left: 0,
    right: 0,
    up: 0,
    down: 0
};

var Loop = {
    raise: [0, 10, 30, 45, 55, 60, 65, 70, 70, 70, 70, 70, 70, 63, 53, 44, 35, 26, 17, 8],
    blink: [0, 10, 11, 12, 13, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};

function threshholdFormalize(faceSize) {
    return function (x) {
        return x / 360 * faceSize;
    }
}

var Actions = {
    /**
     * 中央向上
     * @param {ImageData} origin
     * @param {RectPrototype} rect
     * @param {Number} threshold
     */
    raise: function (origin, rect, threshold) {
        var height = origin.height;
        var width = origin.width;
        var trans = origin;

        for (var x = rect.up; x < rect.down; x++){
            for (var y = rect.left; y < rect.right; y++){
                var para = (y - rect.left) / (rect.right - rect.left);
                var uplength = parseInt(threshold * (-(para - 0.5) * (para - 0.5) + 0.25));
                var originPos = parseInt(4 * (x * width + y));
                var dest = parseInt(4 * ((x - uplength) * width + y));
                var from = parseInt(4 * (rect.down * width + y));
                trans.data[dest] = trans.data[originPos];
                trans.data[dest + 1] = trans.data[originPos + 1];
                trans.data[dest + 2] = trans.data[originPos + 2];
                if (uplength >= 2){
                    trans.data[originPos] = trans.data[from];
                    trans.data[originPos + 1] = trans.data[from + 1];
                    trans.data[originPos + 2] = trans.data[from + 2];
                }
            }
        }
        return trans;

    },

    /**
     * 内侧向上
     */
    raiseInside: function (source, rect, threshold) {
        var height = source.height;
        var width = source.width;
        threshold /= 4;
        var trans = source;
        for (var x = rect.up; x < rect.down; x++){
            for (var y = rect.left; y < rect.right; y++){
                var para = (y - rect.left) / (rect.right - rect.left);
                var uplength = parseInt(threshold * (1 - para));
                var origin = parseInt(4 * (x * width + y));
                var dest = parseInt(4 * ((x - uplength) * width + y));
                var from = parseInt(4 * (rect.down * width + y));
                trans.data[dest] = trans.data[origin];
                trans.data[dest + 1] = trans.data[origin + 1];
                trans.data[dest + 2] = trans.data[origin + 2];
                if (uplength >= 2){
                    trans.data[origin] = trans.data[from];
                    trans.data[origin + 1] = trans.data[from + 1];
                    trans.data[origin + 2] = trans.data[from + 2];
                }
            }
        }
        return trans;
    },

    /**
     * 外侧向上
     */
    raiseOutside: function (source, rect, threshold) {
        var height = source.height;
        var width = source.width;
        var trans = source;
        threshold /= 4;
        for (var x = rect.up; x < rect.down; x++){
            for (var y = rect.left; y < rect.right; y++){
                var para = (y - rect.left) / (rect.right - rect.left);
                var uplength = parseInt(threshold * para);
                var origin = parseInt(4 * (x * width + y));
                var dest = parseInt(4 * ((x - uplength) * width + y));
                var from = parseInt(4 * (rect.down * width + y));
                trans.data[dest] = trans.data[origin];
                trans.data[dest + 1] = trans.data[origin + 1];
                trans.data[dest + 2] = trans.data[origin + 2];
                if (uplength >= 2){
                    trans.data[origin] = trans.data[from];
                    trans.data[origin + 1] = trans.data[from + 1];
                    trans.data[origin + 2] = trans.data[from + 2];
                }
            }
        }
        return trans;
    },

    /**
     * 两边向上
     */
    smile: function (origin, rect, threshold) {
        var height = origin.height;
        var width = origin.width;
        var trans = origin;
        for (var x = rect.up; x < rect.down; x++){
            for (var y = rect.left; y < rect.right; y++){
                var para = (y - rect.left) / (rect.right - rect.left);
                var uplength = parseInt(threshold * ((para - 0.5) * (para - 0.5)));
                var originPos = parseInt(4 * (x * width + y));
                var dest = parseInt(4 * ((x - uplength) * width + y));
                var from = parseInt(4 * (rect.down * width + y));
                trans.data[dest] = trans.data[originPos];
                trans.data[dest + 1] = trans.data[originPos + 1];
                trans.data[dest + 2] = trans.data[originPos + 2];
                if (uplength >= 2){
                    trans.data[originPos] = trans.data[from];
                    trans.data[originPos + 1] = trans.data[from + 1];
                    trans.data[originPos + 2] = trans.data[from + 2];
                }
            }
        }
        return trans;
    },

    /**
     * 两边向下
     */
    sad: function (source, rect, threshold) {
        var height = source.height;
        var width = source.width;
        var trans = source;
        for (var x = rect.down; x > rect.up; x--){
            for (var y = rect.left; y < rect.right; y++){
                var para = (y - rect.left) / (rect.right - rect.left);
                var uplength = parseInt(threshold * ((para - 0.5) * (para - 0.5)));
                var origin = parseInt(4 * (x * width + y));
                var dest = parseInt(4 * ((x + uplength) * width + y));
                var from = parseInt(4 * (rect.up * width + y));
                trans.data[dest] = trans.data[origin];
                trans.data[dest + 1] = trans.data[origin + 1];
                trans.data[dest + 2] = trans.data[origin + 2];
                if (uplength >= 2){
                    trans.data[origin] = trans.data[from];
                    trans.data[origin + 1] = trans.data[from + 1];
                    trans.data[origin + 2] = trans.data[from + 2];
                }
            }
        }
        return trans;
    },

    /**
     * 中间向下
     */
    reduce: function (source, rect, threshhold) {
        var height = source.height;
        var width = source.width;
        var trans = source;
        for (var x = rect.down; x > rect.up; x--){
            for (var y = rect.left; y < rect.right; y++){
                var para = (y - rect.left) / (rect.right - rect.left);
                var uplength = parseInt(threshold * (-(para - 0.5) * (para - 0.5) + 0.25));
                var origin = parseInt(4 * (x * width + y));
                var dest = parseInt(4 * ((x + uplength) * width + y));
                var from = parseInt(4 * (rect.up * width + y));
                trans.data[dest] = trans.data[origin];
                trans.data[dest + 1] = trans.data[origin + 1];
                trans.data[dest + 2] = trans.data[origin + 2];
                if (uplength >= 2){
                    trans.data[origin] = trans.data[from];
                    trans.data[origin + 1] = trans.data[from + 1];
                    trans.data[origin + 2] = trans.data[from + 2];
                }
            }
        }
        return trans;
    },

    /**
     * 闪烁
     */
    blink: function (source, rect, threshold) {
        var height = source.height;
        var width = source.width;
        var trans = source;
        if (threshold < 10 || threshold > 15)
            return trans;
        else
            threshold = threshold + 55;
        for (var x = rect.down; x > rect.up; x--){
            for (var y = rect.left; y < rect.right; y++){
                var para = (y - rect.left) / (rect.right - rect.left);
                var uplength = threshold * (-(para - 0.5) * (para - 0.5) + 0.25) * ((rect.down - x) * (rect.down - x)) / ((rect.down - rect.up) * (rect.down - rect.up));
                var origin = parseInt(4 * (x * width + y));
                var dest = parseInt(4 * ((x + rect.uplength) * width + y));
                var from = parseInt(4 * (rect.up * width + y));
                trans.data[dest] = trans.data[origin];
                trans.data[dest + 1] = trans.data[origin + 1];
                trans.data[dest + 2] = trans.data[origin + 2];
                if (rect.uplength >= 2){
                    trans.data[origin] = trans.data[from];
                    trans.data[origin + 1] = trans.data[from + 1];
                    trans.data[origin + 2] = trans.data[from + 2];
                }
            }
        }
        return trans;
    },

    /**
     * 左右缩小
     */
    shrink: function (source, rect, threshold) {
        var height = source.height;
        var width = source.width;
        var left = rect.left, right = rect.right, up = rect.up, down = rect.down;
        var mid = (left + right) / 2;
        var trans = source;
        var x, y, uplength, origin, dest, from;
        for (x = up; x < down; x++){
            for (y = mid; y > left; y--){
                para = (threshold) / 1700;
                uplength = parseInt(para * (mid - left));
                origin = parseInt(4 * (x * width + y));
                dest = parseInt(4 * (x  * width + y));
                from = parseInt(4 * (x * width + y - uplength));
                trans.data[dest] = trans.data[origin];
                trans.data[dest + 1] = trans.data[origin + 1];
                trans.data[dest + 2] = trans.data[origin + 2];
                if (uplength >= 2 || 1){
                    trans.data[origin] = trans.data[from];
                    trans.data[origin + 1] = trans.data[from + 1];
                    trans.data[origin + 2] = trans.data[from + 2];
                }
            }
        }
        for (x = up; x < down; x++){
            for (y = mid; y < right; y++){
                para = (threshold) / 1700;
                uplength = parseInt(para * (right - mid));
                origin = parseInt(3 * (x * width + y));
                dest = parseInt(3 * (x  * width + y));
                from = parseInt(3 * (x * width + y + uplength));
                trans.data[dest] = trans.data[origin];
                trans.data[dest + 1] = trans.data[origin + 1];
                trans.data[dest + 2] = trans.data[origin + 2];
                if (uplength >= 2 || 1){
                    trans.data[origin] = trans.data[from];
                    trans.data[origin + 1] = trans.data[from + 1];
                    trans.data[origin + 2] = trans.data[from + 2];
                }
            }
        }
        return trans;
    },

    /**
     * 上下缩小
     */
    shrinkUpDown: function (source, rect, threshold) {
        var height = source.height;
        var width = source.width;
        var left = rect.left, right = rect.right, up = rect.up, down = rect.down;
        var mid = (left + right) / 2;
        var trans = source;
        var x, y, uplength, origin, dest, from;
        for (x = mid; x > up; x--){
            for (y = left; y < right; y++){
                para = (threshold) / 1000;
                uplength = parseInt(para * (mid - up));
                origin = parseInt(4 * (x * width + y));
                dest = parseInt(4 * (x  * width + y));
                from = parseInt(4 * ((x - uplength) * width + y));
                trans.data[dest] = trans.data[origin];
                trans.data[dest + 1] = trans.data[origin + 1];
                trans.data[dest + 2] = trans.data[origin + 2];
                if (uplength >= 2 || 1){
                    trans.data[origin] = trans.data[from];
                    trans.data[origin + 1] = trans.data[from + 1];
                    trans.data[origin + 2] = trans.data[from + 2];
                }
            }
        }
        for (x = mid; x < down; x++){
            for (y = left; y < right; y++){
                para = (threshold) / 1000;
                uplength = parseInt(para * (down - mid));
                origin = parseInt(4 * (x * width + y));
                dest = parseInt(4 * (x  * width + y));
                from = parseInt(4 * ((x + uplength) * width + y));
                trans.data[dest] = trans.data[origin];
                trans.data[dest + 1] = trans.data[origin + 1];
                trans.data[dest + 2] = trans.data[origin + 2];
                if (uplength >= 2 || 1){
                    trans.data[origin] = trans.data[from];
                    trans.data[origin + 1] = trans.data[from + 1];
                    trans.data[origin + 2] = trans.data[from + 2];
                }
            }
        }
        return trans;
    }
};