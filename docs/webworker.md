https://www.w3schools.com/html/html5_webworkers.asp

https://www.html5rocks.com/en/tutorials/workers/basics/
https://auth0.com/blog/speedy-introduction-to-web-workers/

```js
var w;

function startWorker() {
  if (typeof(Worker) !== "undefined") {
    if (typeof(w) == "undefined") {
      w = new Worker("demo_workers.js");
    }
    w.onmessage = function(event) {
      document.getElementById("result").innerHTML = event.data;
    };
  } else {
    document.getElementById("result").innerHTML = "Sorry! No Web Worker support.";
  }
}

function stopWorker() {
  w.terminate();
  w = undefined;
}
```



















