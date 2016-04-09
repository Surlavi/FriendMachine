var RectPrototype = {
    left: 0,
    right: 0,
    up: 0,
    down: 0
};

var Loop = {
    smooth: [0, 10, 30, 45, 55, 60, 65, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 52, 35, 17, 8],
    blink: [0, 30, 70, 45, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 70, 70, 45, 10, 0, 30, 70, 45, 10, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};

function thresholdFormalize(faceSize) {
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
     * 左侧向上
     */
    raiseLeft: function (source, rect, threshold) {
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
     * 左侧向下
     */
    reduceLeft: function (source, rect, threshold) {
        var height = source.height;
        var width = source.width;
        threshold /= 4;
        var trans = source;
        for (var x = rect.down; x > rect.up; x--){
            for (var y = rect.left; y < rect.right; y++){
                var para = (y - rect.left) / (rect.right - rect.left);
                var uplength = parseInt(threshold * (1 - para));
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
     * 右侧向上
     */
    raiseRight: function (source, rect, threshold) {
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
     * 右侧向下
     */
    reduceRight: function (source, rect, threshold) {
        var height = source.height;
        var width = source.width;
        var trans = source;
        threshold /= 4;
        for (var x = rect.down; x > rect.up; x--){
            for (var y = rect.left; y < rect.right; y++){
                var para = (y - rect.left) / (rect.right - rect.left);
                var uplength = parseInt(threshold * para);
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
    reduce: function (source, rect, threshold) {
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
     * 向下关闭
     */
    close: function (source, rect, threshold) {
        var height = source.height;
        var width = source.width;
        var trans = source;
        var left = rect.left, right = rect.right, up = rect.up, down = rect.down;
        var uplength = parseInt(((down - up)) / 100 * threshold + up);
        for (var x = uplength; x > up; x--){
            for (var y = left; y < right; y++){
                for (var tmp = x; tmp > up; tmp--){
                    var origin = parseInt(4 * (tmp * width + y));
                    var dest = parseInt(4 * ((tmp + 2) * width + y));
                    trans.data[dest] = trans.data[origin];
                    trans.data[dest + 1] = trans.data[origin + 1];
                    trans.data[dest + 2] = trans.data[origin + 2];
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
    },

    /**
     * stare
     */
    stare: function (source, rect, threshold) {
        var height = source.height;
        var width = source.width;
        var trans = source;
        threshold /= 5;
        var change = [];
        var left = rect.left, right = rect.right, up = rect.up, down = rect.down, center_y = rect.center_y, center_x = rect.center_x;
        var x, y, para_y, para_x;
        var shift_x, shift_y, origin, dest, from;
        for (x = up; x < center_x; x++){
            for (y = left; y < center_y; y++){
                para_y = (center_y - y) / (right - left);
                para_x = (center_x - x) / (down - up);
                para = Math.sqrt(para_x * para_x + para_y * para_y);
                shift_x = parseInt(threshold * para_x);
                shift_y = parseInt(threshold * para_y);
                origin = parseInt(4 * (x * width + y));
                dest = parseInt(4 * ((x - shift_x) * width + y - shift_y));
                from = parseInt(4 * (center_x * width + center_y));
                change[(x - shift_x) * 2000 + y - shift_y - left] = true;
                trans.data[dest] = trans.data[origin];
                trans.data[dest + 1] = trans.data[origin + 1];
                trans.data[dest + 2] = trans.data[origin + 2];
                if (para >= 0.7 && 0){
                    trans.data[origin] = trans.data[from];
                    trans.data[origin + 1] = trans.data[from + 1];
                    trans.data[origin + 2] = trans.data[from + 2];
                }
            }
        }
        for (x = down; x > center_x; x--){
            for (y = left; y < center_y; y++){
                para_y = Math.abs((center_y - y)) / (right - left);
                para_x = Math.abs((center_x - x)) / (down - up);
                para = Math.sqrt(para_x * para_x + para_y * para_y);
                shift_x = parseInt(threshold * para_x);
                shift_y = parseInt(threshold * para_y);
                origin = parseInt(4 * (x * width + y));
                dest = parseInt(4 * ((x + shift_x) * width + y - shift_y));
                from = parseInt(4 * (center_x * width + center_y));
                change[(x + shift_x) * 2000 + y - shift_y] = true;
                trans.data[dest] = trans.data[origin];
                trans.data[dest + 1] = trans.data[origin + 1];
                trans.data[dest + 2] = trans.data[origin + 2];
                if (para >= 0.7 && 0){
                    trans.data[origin] = trans.data[from];
                    trans.data[origin + 1] = trans.data[from + 1];
                    trans.data[origin + 2] = trans.data[from + 2];
                }
            }
        }
        for (x = up; x < center_x; x++){
            for (y = right; y > center_y; y--){
                para_y = Math.abs((center_y - y)) / (right - left);
                para_x = Math.abs((center_x - x)) / (down - up);
                para = Math.sqrt(para_x * para_x + para_y * para_y);
                shift_x = parseInt(threshold * para_x);
                shift_y = parseInt(threshold * para_y);
                origin = parseInt(4 * (x * width + y));
                dest = parseInt(4 * ((x - shift_x) * width + y + shift_y));
                from = parseInt(4 * (center_x * width + center_y));
                change[(x - shift_x) * 2000 + y + shift_y] = true;
                trans.data[dest] = trans.data[origin];
                trans.data[dest + 1] = trans.data[origin + 1];
                trans.data[dest + 2] = trans.data[origin + 2];
                if (para >= 0.7 && 0){
                    trans.data[origin] = trans.data[from];
                    trans.data[origin + 1] = trans.data[from + 1];
                    trans.data[origin + 2] = trans.data[from + 2];
                }
            }
        }
        for (x = down; x > center_x; x--){
            for (y = right; y > center_y; y--){
                para_y = Math.abs((center_y - y)) / (right - left);
                para_x = Math.abs((center_x - x)) / (down - up);
                para = Math.sqrt(para_x * para_x + para_y * para_y);
                shift_x = parseInt(threshold * para_x);
                shift_y = parseInt(threshold * para_y);
                origin = parseInt(4 * (x * width + y));
                dest = parseInt(4 * ((x + shift_x) * width + y + shift_y));
                from = parseInt(4 * (center_x * width + center_y));
                change[(x + shift_x) * 2000 + y + shift_y] = true;
                trans.data[dest] = trans.data[origin];
                trans.data[dest + 1] = trans.data[origin + 1];
                trans.data[dest + 2] = trans.data[origin + 2];
                if (para >= 0.7 && 0){
                    trans.data[origin] = trans.data[from];
                    trans.data[origin + 1] = trans.data[from + 1];
                    trans.data[origin + 2] = trans.data[from + 2];
                }
            }
        }
        for (x = up - 20; x < down + 20; x++){
            for (y = left - 20; y < right + 20; y++){
                if (change[x * 2000 + y] == false){
                    dest = 4 * (x * width + y);
                    from = dest;
                    for (var i = x - 1; i <= x + 1; i++){
                        for (var j = y - 1; j <= y + 1; j++){
                            if (change[i * 2000 + j] == true){
                                from = 4 * (i * width + j);
                                break;
                            }
                        }
                    }
                    trans.data[dest] = trans.data[from];
                    trans.data[dest + 1] = trans.data[from + 1];
                    trans.data[dest + 2] = trans.data[from + 2];
                    //[x][y] = true;
                }
            }
        }
        return trans;
    }
};