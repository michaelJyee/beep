//worker
self.addEventListener('message', function(obj) {

	console.log( "\nvalidInput: " +obj.data.validInput +"\nAction: " + obj.data.action + "\nbpm: " + obj.data.bpm + "\n");

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
    	self.postMessage(true);
	}

	function bpmToMill(data){
	var min = 60;
	var mil = 1000;
	return (min/data) * mil;
};

}, false);