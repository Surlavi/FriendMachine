/**
 * Created by surlavi on 16-4-9.
 */

function addEyeBrowSmile(speed, totPeriod) {
    runningActions.push({
        name: 'sad',
        parameter: ImageAgent.getLeftEyeBrowRect(),
        loop: Loop.smooth,
        curIdx: 0,
        countDown: 0,
        speed: 3,
        periodLeft: 30
    });

    runningActions.push({
        name: 'smooth',
        parameter: ImageAgent.getRightEyeBrowRect(),
        loop: Loop.smooth,
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
        loop: Loop.smooth,
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
        loop: Loop.smooth,
        curIdx: 0,
        countDown: 0,
        speed: 3,
        periodLeft: 30
    });

}

function addEyeSmile(speed, totPeriod) {
    runningActions.push({
        name: 'smooth',
        parameter: ImageAgent.getLeftEyeRect(),
        loop: Loop.smooth.map(thresholdFormalize(faceInfo.rect.bottom - faceInfo.rect.top)),
        curIdx: 0,
        countDown: 0,
        speed: 3,
        periodLeft: 30
    });

    runningActions.push({
        name: 'smooth',
        parameter: ImageAgent.getRightEyeRect(),
        loop: Loop.smooth.map(thresholdFormalize(faceInfo.rect.bottom - faceInfo.rect.top)),
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

function emotionMakeParameter(unit, actionType, speed, period, loop) {
    var unit;
    switch (unit) {
        case "left eye":
            unit = ImageAgent.getLeftEyeRect();
            break;
        case "right eye":
            unit = ImageAgent.getRightEyeRect();
            break;
        case "left eyebrow":
            unit = ImageAgent.getLeftEyeBrowRect();
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

    var loopArray = loop ? loop : Loop.smooth;

    return {
        name: actionType,
        parameter: unit,
        loop: loopArray.map(thresholdFormalize(faceInfo.rect.bottom - faceInfo.rect.top)),
        curIdx: 0,
        countDown: 0,
        speed: speed ? speed : 3,
        periodLeft: period ? period : 2
    }
}

var setBasicEmotion = {
    happy: function () {
        runningActions.push(emotionMakeParameter("left eyebrow", "raise", null, null, Loop.smooth.map(function (x) { return x / 4 * 3; })));
        runningActions.push(emotionMakeParameter("right eyebrow", "raise", null, null, Loop.smooth.map(function (x) { return x / 4 * 3; })));
        runningActions.push(emotionMakeParameter("mouse", "smile", null, null, Loop.smooth.map(function (x) { return x / 8 * 7; })));
        runningActions.push(emotionMakeParameter("left eye", "stare", null, null, Loop.smooth.map(function (x) { return x / 2; })));
        runningActions.push(emotionMakeParameter("right eye", "stare", null, null, Loop.smooth.map(function (x) { return x / 2; })));
    },

    sadness: function () {
        runningActions.push(emotionMakeParameter("right eyebrow", "reduce", null, null, Loop.smooth.map(function (x) { return x / 2; })));
        runningActions.push(emotionMakeParameter("left eyebrow", "reduce", null, null, Loop.smooth.map(function (x) { return x / 2; })));
        runningActions.push(emotionMakeParameter("mouse", "sad"));
        runningActions.push(emotionMakeParameter("right eye", "shrinkUpDown"));
        runningActions.push(emotionMakeParameter("left eye", "shrinkUpDown"));
    },

    disgust: function () {

    },

    contempt: function () {

    },

    fear: function () {
        runningActions.push(emotionMakeParameter("right eyebrow", "raiseLeft", null, null, Loop.smooth.map(function (x) { return x ; })));
        runningActions.push(emotionMakeParameter("left eyebrow", "raiseRight", null, null, Loop.smooth.map(function (x) { return x ; })));
        runningActions.push(emotionMakeParameter("left eye", "stare", null, null, Loop.smooth.map(function (x) { return x / 2; })));
        runningActions.push(emotionMakeParameter("right eye", "stare", null, null, Loop.smooth.map(function (x) { return x / 2; })));

        runningActions.push(emotionMakeParameter("mouse", "raise", null, null, Loop.smooth.map(function (x) { return x / 2; })))
    },

    anger: function () {
        runningActions.push(emotionMakeParameter("right eye", "reduceLeft", null, null, Loop.smooth.map(function (x) { return x / 4; })));
        runningActions.push(emotionMakeParameter("left eye", "reduceRight", null, null, Loop.smooth.map(function (x) { return x / 4; })));
        runningActions.push(emotionMakeParameter("right eyebrow", "reduceLeft", null, null, Loop.smooth.map(function (x) { return x / 1; })));
        runningActions.push(emotionMakeParameter("left eyebrow", "reduceRight", null, null, Loop.smooth.map(function (x) { return x / 1; })));
        runningActions.push(emotionMakeParameter("mouse", "raise", null, null, Loop.smooth.map(function (x) { return x; })));
    },

    surprise: function () {

    },

    fun: function () {

        var rand = Math.random() < 0.3;
        if (rand) {
            runningActions.push(emotionMakeParameter("right eyebrow", "raise", null, null, Loop.smooth.map(function (x) { return x / 1; })));
            runningActions.push(emotionMakeParameter("left eyebrow", "raise", null, null, Loop.smooth.map(function (x) { return x / 1; })));
            runningActions.push(emotionMakeParameter("right eye", "raise", parseInt(Math.random() * 50), null, Loop.smooth.map(function (x) { return x; })));
            runningActions.push(emotionMakeParameter("left eye", "raise", parseInt(Math.random() * 50), null, Loop.smooth.map(function (x) { return x; })));
            runningActions.push(emotionMakeParameter("mouse", "smile", null, null, Loop.smooth.map(function (x) { return x; })));
        }
        else {
            runningActions.push(emotionMakeParameter("right eyebrow", "raise", null, null, Loop.smooth.map(function (x) { return x / 1; })));
            runningActions.push(emotionMakeParameter("left eyebrow", "raise", null, null, Loop.smooth.map(function (x) { return x / 1; })));
            runningActions.push(emotionMakeParameter("right eye", "raise", null, null, Loop.smooth.map(function (x) { return x; })));
            runningActions.push(emotionMakeParameter("left eye", "raise", null, null, Loop.smooth.map(function (x) { return x; })));
            runningActions.push(emotionMakeParameter("mouse", "smile", null, null, Loop.smooth.map(function (x) { return x; })));
        }
    }
};

function addNaturalBlink() {
    if (runningActions.length == 0) {
        runningActions.push(emotionMakeParameter("right eye", "close", 1, 1, Loop.blink.map(function (x) { return x; })));
        runningActions.push(emotionMakeParameter("left eye", "close", 1, 1, Loop.blink.map(function (x) { return x; })));

        startLoop();
    }

    var time = [3000, 4000, 5000, 9000, 10000];
    setTimeout(addNaturalBlink, time[parseInt(Math.random() * 100) % 5]);
}