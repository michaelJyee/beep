//Michael Yee - Worker
var data = {
	run:true,
	sound:true,
	tracker: 0
}
self.addEventListener('message', function(obj) {
	
	var counter = 0;
	var mil = bpmToMill(obj.data.bpm);

	if(obj.data.action === "start" && obj.data.validInput){
		data.run = true;
		myVar = setInterval(myTimer, mil);
	}else if(obj.data.action === "stop"){
		data.run = false;
		self.postMessage(false);
		clearInterval(myVar);
	}else if(obj.data.action === "update" && obj.data.validInput){
		data.run = true;
		clearInterval(myVar);
		mil = bpmToMill(obj.data.bpm);
		myVar = setInterval(myTimer, mil);
	}else if(obj.data.action === "change"){
		data.run = false;
		mil = bpmToMill(obj.data.bpm);
	}

  	function myTimer() {
  		counter++;
  		if(counter > obj.data.beats){
  			counter = 1;
  		}
  		data.tracker = counter;
  		console.log(printObj());
    	self.postMessage(data);
	}

	function bpmToMill(data){
		var min = 60;
		var mil = 1000;
		return (min/data) * mil;
	};

	function printObj(){
		return ("\nWorker Sending{\n"+"run: " + data.run + "\nsound: " + data.sound + "\ntracker: " + data.tracker + "\n}\n");
	}

	console.log( "\rWorker Receiving{\nvalidInput: " +obj.data.validInput +"\nAction: " + obj.data.action + "\nbpm: " + obj.data.bpm + "\nbeats: " + obj.data.beats+"\n}\n");

}, false);