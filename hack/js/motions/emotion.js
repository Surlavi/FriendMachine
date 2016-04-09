/**
 * Created by surlavi on 16-4-9.
 */

function addEyeBrowSmile(speed, totPeriod) {
    runningActions.push({
        name: 'sad',
        parameter: ImageAgent.getLeftEyeBrowRect(),
        loop: Loop.raise,
        curIdx: 0,
        countDown: 0,
        speed: 3,
        periodLeft: 30
    });

    runningActions.push({
        name: 'raise',
        parameter: ImageAgent.getRightEyeBrowRect(),
        loop: Loop.raise,
        curIdx: 0,
        countDown: 0,
        speed: 3,
        periodLeft: 30
    });
}

function addMouseSad(speed, totPeriod) {
    runningActions.push({
        name: 'sad',
        parameter: ImageAgent.getMouseRect(),
        loop: Loop.raise,
        curIdx: 0,
        countDown: 0,
        speed: 3,
        periodLeft: 30
    });

}

function addMouseSmile(speed, totPeriod) {
    runningActions.push({
        name: 'smile',
        parameter: ImageAgent.getMouseRect(),
        loop: Loop.raise,
        curIdx: 0,
        countDown: 0,
        speed: 3,
        periodLeft: 30
    });

}

function addEyeSmile(speed, totPeriod) {
    runningActions.push({
        name: 'raise',
        parameter: ImageAgent.getLeftEyeRect(),
        loop: Loop.raise.map(threshholdFormalize(faceInfo.rect.bottom - faceInfo.rect.top)),
        curIdx: 0,
        countDown: 0,
        speed: 3,
        periodLeft: 30
    });

    runningActions.push({
        name: 'raise',
        parameter: ImageAgent.getRightEyeRect(),
        loop: Loop.raise.map(threshholdFormalize(faceInfo.rect.bottom - faceInfo.rect.top)),
        curIdx: 0,
        countDown: 0,
        speed: 3,
        periodLeft: 30
    });
}

function addEyeBlink(speed, totPeriod) {
    runningActions.push({
        name: 'blink',
        parameter: ImageAgent.getLeftEyeRect(),
        loop: Loop.blink,
        curIdx: 0,
        countDown: 0,
        speed: 40,
        periodLeft: 200
    });

    runningActions.push({
        name: 'blink',
        parameter: ImageAgent.getRightEyeRect(),
        loop: Loop.blink,
        curIdx: 0,
        countDown: 0,
        speed: 40,
        periodLeft: 200
    });
}

function emotionMakeParameter(unit, actionType, speed, period) {
    var unit;
    switch (unit) {
        case "left eye":
            unit = ImageAgent.getLeftEyeRect();
            break;
        case "right eye":
            unit = ImageAgent.getRightEyeRect();
            break;
        case "left eyebrow":
            unit = ImageAgent.getLightEyeBrowRect();
            break;
        case "right eyebrow":
            unit = ImageAgent.getRightEyeBrowRect();
            break;
        case "mouse":
            unit = ImageAgent.getMouseRect();
            break;
        default:
            throw "invalid unit";
    }

    return {
        name: actionType,
        parameter: unit,
        loop: Loop.raise.map(threshholdFormalize(faceInfo.rect.bottom - faceInfo.rect.top)),
        curIdx: 0,
        countDown: 0,
        speed: speed ? speed : 3,
        periodLeft: period ? period : 30
    }
}

var setBasicEmotion = {
    happy: function () {
        runningActions.push(emotionMakeParameter("left eye", "raiseOutside"));
        runningActions.push(emotionMakeParameter("right eye", "raiseOutside"));
        runningActions.push(emotionMakeParameter("mouse", "smile"));
    }
};
