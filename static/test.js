var power;
var value;
var beepSound = new Howl({urls: ['/audio/bubble1.mp3']});
var worker = new Worker('workers/worker.js');
var post = {
  beats:4,
  validInput: true,
  action: "start",
  bpm: 0
}

function toggle(){
  if($('input').val()){
    if($('#startStopButton').attr('value') === 'OFF' && $('input').val() >= 1){
        start();
        off();
  }
    else if($('#startStopButton').attr('value') === 'ON'){
        stopBeep();
        on();
    }
  }
}

var off = function(){
  $('#startStopButton').attr('value','ON');
  $('#startStopButton').html('STOP');
  $('#startStopButton').css({'color':'#0e83cd', 'background':'#fff'});
}

var on = function(){
  $('#startStopButton').attr('value','OFF');
  $('#startStopButton').html('START');
  $('#startStopButton').css({'color':'#fff', 'background':'#0e83cd'});
}

var keyChange = function(){

  var boo = !isNaN($('input').val()) && ($('input').val() >= 1);

  if($('#startStopButton').attr('value') === 'OFF'){
    post.action = "change";
  }else if($('#startStopButton').attr('value') === 'ON'){
    if(boo){
      post.action = "update";
    }else if(!boo){
      on();
      post.action = "stop";
    }
  }
  validInput();
  post.bpm = parseInt($('input').val());
  worker.postMessage(post);
}

var start = function(){
  if($('input').val()){
    post.action = "start";
    post.bpm = parseInt($('input').val());
    worker.postMessage(post);
  }
};

var stopBeep = function(){
  post.action = "stop";
  worker.postMessage(post);
}

var validInput = function(){
  data = $('input').val();
  if(data > 0 && !isNaN($('input').val())){
    post.validInput = true;
    return true;
  }else{
    errAnimate();
    post.validInput = false;
    return false;
  }
}

var errAnimate = function(){
  $('#startStopButton').jrumble({
    x: 20,
    y: 0,
    speed: 50
  });

  $('#startStopButton').trigger('startRumble');
  
  var wait = setInterval(function(){
    $('#startStopButton').trigger('stopRumble');
    clearInterval(wait);
  }, 1000);
}

$("#my-input").bind("slider:changed", function (event, data) {
  console.log(data.ratio);
  beepSound.volume(data.ratio);
});


worker.addEventListener('message', function(obj) {
    if(obj.data){
      beepSound.play();
    }
    console.log("Receiving: " + obj.data);
}, false);
