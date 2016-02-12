//Michael Yee - Worker
var data = {
	beat1:false,
	beat2:false,
	beat3:false,
	beat4:false
}
self.addEventListener('message', function(obj) {
	
	var counter = 0;
	var mil = bpmToMill(obj.data.bpm);

	if(obj.data.action === "start" && obj.data.validInput){
		console.log("WORKER: start");
		myVar = setInterval(myTimer, mil);
	}else if(obj.data.action === "stop"){
		self.postMessage(false);
		clearInterval(myVar);
	}else if(obj.data.action === "update" && obj.data.validInput){
		clearInterval(myVar);
		mil = bpmToMill(obj.data.bpm);
		myVar = setInterval(myTimer, mil);

		console.log("WORKER: update " + mil);
	}else if(obj.data.action === "change"){
		mil = bpmToMill(obj.data.bpm);
		console.log("WORKER: change " + mil);
	}

  	function myTimer() {
  		counter++;
  		if(counter > obj.data.beats){
  			counter = 1;
  		}
  		console.log("counter: " + counter);
    	self.postMessage(true);
	}

	function bpmToMill(data){
		var min = 60;
		var mil = 1000;
		return (min/data) * mil;
	};


	console.log( "\nvalidInput: " +obj.data.validInput +"\nAction: " + obj.data.action + "\nbpm: " + obj.data.bpm + "\nbeats: " + obj.data.beats);

}, false);