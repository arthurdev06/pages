var sec = 0;
var min = 0;
var hr = 0;
var interval;
var isTimerRunning = false;

function twoDigits(digit) {
  if (digit < 10) {
    return "0" + digit;
  } else {
    return digit;
  }
}

function start() {
  if (!isTimerRunning) {
    watch();
    interval = setInterval(watch, 1000);
    isTimerRunning = true;
  }
}

function pause() {
  clearInterval(interval);
  isTimerRunning = false;
}

function stop() {
  clearInterval(interval);
  sec = 0;
  min = 0;
  hr = 0;
  isTimerRunning = false;
  document.getElementById("watch").innerText = "00:00:00";
}

function watch() {
  sec++;
  if (sec == 60) {
    min++;
    sec = 0;
    if (min == 60) {
      min = 0;
      hr++;
    }
  }
  document.getElementById("watch").innerText =
    twoDigits(hr) + ":" + twoDigits(min) + ":" + twoDigits(sec);
}
