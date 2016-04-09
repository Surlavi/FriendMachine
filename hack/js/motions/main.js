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
}

var interval;

function startLoop() {
    interval = setInterval(mainLoop, 30);
}

function stopLoop() {
    clearInterval(interval);
}