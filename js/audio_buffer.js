var context = new mozAudioContext();
var source = context.createBufferSource();
source.buffer = context.createBuffer(1, 22050, 44100);

var request = new XMLHttpRequest();

request.open('GET', 'audio/completed.wav', true);
request.responseType = 'arraybuffer';
request.onload = function () {
  context.decodeAudioData(this.response, function(buf) {
    source.buffer = buf;
  }, function(err) { 
    console.log("Error on decodeAudioData: " + err); 
  });
};

request.send();

source.connect(context.destination);
source.start(0);

