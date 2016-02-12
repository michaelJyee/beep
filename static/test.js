var power;
var value;
var beepSound = new Howl({urls: ['/audio/bubble1.mp3']});
var worker = new Worker('workers/worker.js');
var post = {
  validInput: true,
  action: "start",
  bpm: 0
}

function toggle(){
  if($('input').val()){
    if($('#startStopButton').attr('value') === 'OFF' && $('input').val() >= 1){
      $('#startStopButton').attr('value','ON');
      $('#startStopButton').html('STOP');
      $('#startStopButton').css({'color':'#0e83cd', 'background':'#fff'});
        start();
  }
    else if($('#startStopButton').attr('value') === 'ON'){
      $('#startStopButton').attr('value','OFF');
      $('#startStopButton').html('START');
      $('#startStopButton').css({'color':'#fff', 'background':'#0e83cd'});
        stopBeep();
    }
  }
}

function keyChange(){

  var boo = !isNaN($('input').val()) && ($('input').val() >= 1);

  if($('#startStopButton').attr('value') === 'OFF'){
    post.action = "change";
  }else if($('#startStopButton').attr('value') === 'ON'){
    if(boo){
      post.action = "update";
    }else if(!boo){
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
    post.validInput = false;
    return false;
  }
}

$("#my-input").bind("slider:changed", function (event, data) {
  console.log(data.ratio);
  beepSound.volume(data.ratio);
});


worker.addEventListener('message', function(obj) {
    console.log("Receiving: " + obj.data);
}, false);
