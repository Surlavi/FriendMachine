/**
 * Created by surlavi on 16-4-9.
 */

runningActions = [];


function mainLoop() {
    var i;
    var imageData = ImageAgent.getOriginImageData.call();
    for (i = 0; i < runningActions.length; ++i) {
        var act = runningActions[i];
        if (act.periodLeft == 0) {
            continue;
        }
        if (act.countDown == 0) {
            act.countDown = act.speed;
            act.curIdx++;
            if (act.curIdx == act.loop.length) {
                act.curIdx = 0;
                act.periodLeft--;
            }
        } else {
            act.countDown--;
        }
        imageData = Actions[act.name](imageData, act.parameter, act.loop[act.curIdx]);
    }
    ImageAgent.setTargetImageData(imageData);
    runningActions = runningActions.filter(function (x) { return x.periodLeft > 0; });
    if (runningActions.length == 0) {
        stopLoop();
    }
}

var interval, intervalFlag = false;

function startLoop() {
    if (intervalFlag) {
        return -1;
    }
    interval = setInterval(mainLoop, 30);
    intervalFlag = 1;
    return 0;
}

function stopLoop() {
    clearInterval(interval);
    intervalFlag = false;
    return 0;
}

function clearLoop() {
    runningActions = [];
    return 0;
}
