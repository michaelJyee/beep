var power;
var value;
var beepSound = new Howl({urls: ['/audio/bubble1.mp3']});
var worker = new Worker('workers/worker.js');

function toggle(){
  if($('input').val()){
    if($('#startStopButton').attr('value') === 'OFF' && $('input').val() >= 1){
        stopBeep();
        start();
        console.log($('input').val());
  }
    else if($('#startStopButton').attr('value') === 'ON'){
      stopBeep();
    }
  }
}

function keyChange(){
  if($('#startStopButton').attr('value') === 'OFF' || $('input').val() < 1){
        stopBeep();
  }
    else if($('#startStopButton').attr('value') === 'ON'){
      stopBeep();
      start();
  }
}

var start = function(){
    $('#startStopButton').attr('value','ON');
    $('#startStopButton').html('STOP');
    $('#startStopButton').css({'color':'#0e83cd', 'background':'#fff'});

    if($('input').val()){
    value = parseInt($('input').val());
    var mil = bpmToMill(value);
    worker.postMessage(mil); // Send data to our worker.
  }
};

var bpmToMill = function(data){
  var min = 60;
  var mil = 1000;
  return (min/data ) * mil;
};

function run(bpm){
  power = setInterval(function () {
    guts();
  }, bpm);
}


function stopBeep() {
  $('#startStopButton').attr('value','OFF');
  $('#startStopButton').html('START');
  $('#startStopButton').css({'color':'#fff', 'background':'#0e83cd'});
  clearInterval(power);
  counter = 1;
  $("div.q1").removeClass("active");
  $("div.q2").removeClass("active");
  $("div.q3").removeClass("active");
  $("div.q4").removeClass("active");
}

$("#my-input").bind("slider:changed", function (event, data) {
  console.log(data.ratio);
  beepSound.volume(data.ratio);
});

worker.addEventListener('message', function(e) {
  if(e.data = true){
    console.log("TRUE");
  }
}, false);
