/**
 * Created by qiqi on 16/4/9.
 */

(function(window){

    var WORKER_PATH = 'js/recorderWorker.js';

    var Recorder = function(source, cfg){
        var config = cfg || {};
        var bufferLen = config.bufferLen || 4096;
        this.context = source.context;
        if(!this.context.createScriptProcessor){
            this.node = this.context.createJavaScriptNode(bufferLen, 2, 2);
        } else {
            this.node = this.context.createScriptProcessor(bufferLen, 2, 2);
        }

        var worker = new Worker(config.workerPath || WORKER_PATH);
        worker.postMessage({
            command: 'init',
            config: {
                sampleRate: this.context.sampleRate
            }
        });
        var recording = false,
            currCallback;

        this.node.onaudioprocess = function(e){
            if (!recording) return;
            worker.postMessage({
                command: 'record',
                buffer: [
                    e.inputBuffer.getChannelData(0),
                    e.inputBuffer.getChannelData(1)
                ]
            });
        }

        this.configure = function(cfg){
            for (var prop in cfg){
                if (cfg.hasOwnProperty(prop)){
                    config[prop] = cfg[prop];
                }
            }
        }

        this.record = function(){
            recording = true;
        }

        this.stop = function(){
            recording = false;
        }

        this.clear = function(){
            worker.postMessage({ command: 'clear' });
        }

        this.getBuffers = function(cb) {
            currCallback = cb || config.callback;
            worker.postMessage({ command: 'getBuffers' })
        }

        this.exportWAV = function(cb, type){
            currCallback = cb || config.callback;
            type = type || config.type || 'audio/wav';
            if (!currCallback) throw new Error('Callback not set');
            worker.postMessage({
                command: 'exportWAV',
                type: type
            });
        }

        this.exportMonoWAV = function(cb, type){
            currCallback = cb || config.callback;
            type = type || config.type || 'audio/wav';
            if (!currCallback) throw new Error('Callback not set');
            worker.postMessage({
                command: 'exportMonoWAV',
                type: type
            });
        }

        worker.onmessage = function(e){
            var blob = e.data;
            currCallback(blob);
        }

        source.connect(this.node);
        this.node.connect(this.context.destination);   // if the script node is not connected to an output the "onaudioprocess" event is not triggered in chrome.
    };

    Recorder.setupDownload = function(blob, filename){
       //var url = (window.URL || window.webkitURL).createObjectURL(blob);
       // document.getElementById("save").href = url;
       // document.getElementById("save").download = filename || 'output.wav';
        var uploadurl = '/FriendMachine/watson.php';

        var formData = new FormData();
        formData.append('file', blob);
        //alert(blob);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', uploadurl, true);
        xhr.onload = function (e) {
            console.log("get voice info complete.");
            $("#spinner").hide();
            var result = JSON.parse(e.target.responseText);
            var tone = result.tone;
            tone = tone.sort(function (x, y) { return x.score < y.score });
            console.log(tone);

            var final;

            for (var i = 0; i < tone.length; ++i) {
                switch (tone[i].tone_id) {
                    case "joy":
                        final = "happy";
                        break;
                    case "anger":
                        final = "anger";
                        break;
                    case "sadness":
                        final = "sadness";
                        break;
                    case "disgust":
                        final = "anger";
                        break;
                }
                if (final) {
                    break;
                }
            }

            clearLoop();
            stopLoop();
            setBasicEmotion[final]();
            startLoop();
        };
        xhr.send(formData);
    };

    window.Recorder = Recorder;

})(window);
