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

function returnInt(){
    if (this.value.length > 4) {
        this.value = this.value.slice(0,4); 
    }
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
  if(data.ratio > 0){
    $('#volumeIcon').addClass('glyphicon-volume-up');
    $('#volumeIcon').removeClass('glyphicon-volume-off');
  }else{
    $('#volumeIcon').removeClass('glyphicon-volume-up');
    $('#volumeIcon').addClass('glyphicon-volume-off');
  }
  beepSound.volume(data.ratio);
});

worker.addEventListener('message', function(obj) {
    if(obj.data.run){
      if(obj.data.sound){
        beepSound.play();
      }
      $("div#beat").removeClass( "active" );
      $( ".q"+ obj.data.tracker).addClass( "active" );
    }else{
      $("div#beat").removeClass( "active" );
    }
}, false);


$("#volumeContainer").on( {
   'mouseenter':function() {
      $("#volumeControl").show(200);
 },
   'mouseleave':function() {
      $("#volumeControl").hide(200);
 }
});

$("#volumeIcon").click(function(){
  if($('#volumeIcon').hasClass('glyphicon-volume-up')){
    $('#volumeIcon').addClass('glyphicon-volume-off');
    $('#my-input').simpleSlider("setValue", 0);
  }
  else if($('#volumeIcon').hasClass('glyphicon-volume-off')){
    $("#volumeControl").removeClass('hide');
    $('#my-input').simpleSlider("setValue", .75);
  }
});

function numbersonly(myfield, e, dec) {
  var key;
  var keychar;
  if (window.event)
    key = window.event.keyCode;
  else if (e)
    key = e.which;
  else
    return true;
  keychar = String.fromCharCode(key);
  // control keys 
  if ((key==null) || (key==0) || (key==8) || (key==9) || (key==13) || (key==27) )
    return true;
  // numbers 
  else if ((("0123456789").indexOf(keychar) > -1))
    return true;
  // decimal point jump 
  else if (dec && (keychar == ".")) {
    myfield.form.elements[dec].focus();
    return false;
  }
  else return false;
}





