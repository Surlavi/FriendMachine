var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/gettone',function(req, res, next) {
  console.log(req);
  var watson=require('watson-developer-cloud');
  var fs=require('fs');
  var speech_to_text=watson.speech_to_text({
    username:'e117392a-6e9a-4195-ab7e-fcc4ecf96075',
	password:'LvVZ70q0wVdh',
	version:'v1',
	url:'https://stream.watsonplatform.net/speech-to-text/api'
  });
  var params={
    content_type:'audio/wav',
	continuous:true,
  };
  console.log(req.files);
  var recognizeStream=speech_to_text.createRecognizeStream(params);
  fs.createReadStream("test.wav").pipe(recognizeStream);
  //var str=recognizeStream.read();
  //console.log(str);
  var text="Hi Team, I know the times are difficult! Our sales have been disappointing for the past three quarters for our data analytics product suite. We have a competitive data analytics product suite in the industry. But we need to do our job selling it!";
  var stream=fs.createWriteStream('ttt.txt');
  recognizeStream.pipe(stream);
  recognizeStream.setEncoding('utf8');
  //['data','results','error','connection-close'].forEach(function(eventName){
  //  recognizeStream.on(eventName,console.log.bind(console,eventName+' event:'));
  //});
  recognizeStream.on('data',(chunk) => {
    //console.log(chunk);});
  //stream.write(text);stream.end();
    console.log("chunk="+chunk);
    var tone_analyzer=watson.tone_analyzer({
      username:'e35160ae-3cb0-47c3-bcc2-8e6161771ee9',
	  password:'X08asUgUestt',
	  version:'v3-beta',
	  version_date:'2016-02-11'
    });
    tone_analyzer.tone({text:chunk,sentences:false,tones:'emotion'},function(err,tone){
      if(err) res.send(err);
	  else {console.log(JSON.stringify(tone.document_tone.tone_categories[0].tones,null,2));res.send(tone);}
    });
  });
});

module.exports = router;
