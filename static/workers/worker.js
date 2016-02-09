//worker
self.addEventListener('message', function(e) {
  var myVar = setInterval(myTimer, e.data);
  var i = 0;
  function myTimer() {
    i++;
    self.postMessage(true);
  }
}, false);