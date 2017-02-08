'use strict';
let timeoutID;
let timerOnOff = 'off';
let m = () => document.getElementById('minutes').innerHTML;
let s = () => document.getElementById('seconds').innerHTML;
let tm = () => document.getElementById('timerminutes').innerHTML;
let bm = () => document.getElementById('breakminutes').innerHTML;
let rotateDegrees = 0;

let checkTime = (i) => {
    if (i < 10) {i = '0' + i;}  return i;
};

let toggleWorkBreak = 'break';

let startTimer = () => {
    if (timerOnOff  === 'pause') {
      timerOnOff = 'on';
      let t = parseInt(m()) * 60  + parseInt(s());
      console.log(t);
      timer(t);
    }

  if ((timerOnOff === 'off') && (toggleWorkBreak === 'break')) {
        timerOnOff = 'on';
        console.log('TIMERONOFF', timerOnOff);
        let sec = parseInt(tm() * 60);
        toggleWorkBreak = 'work';
        timer(sec);
    }

  if ((timerOnOff === 'off') && (toggleWorkBreak === 'work')) {
        timerOnOff = 'on';
        console.log('TIMERONOFF', timerOnOff);
        let sec = parseInt(bm() * 60);
        toggleWorkBreak = 'break';
        timer(sec);
    }
};

function stopTimer() {
    clearTimeout(timeoutID);
    timeoutID = undefined;
    timerOnOff = 'pause';
    console.log('stop', timerOnOff);
}

function toggleTimer() {
    clearTimeout(timeoutID);
    timeoutID = undefined;
    timerOnOff = 'off';
    console.log('TIMEOUTID IF', timeoutID);
    startTimer();
}

let timer = (seconds) => {
    if (seconds <= 0) {
      toggleTimer();
      return;
    }
    rotation(6);
    console.log('SECONDS', seconds);
    console.log('TIMEOUTID', toggleWorkBreak);
    seconds = seconds - 1;
    let mB = Math.floor(seconds / 60);
    let sB = seconds % 60;
    document.getElementById('seconds').innerHTML = checkTime(sB);
    document.getElementById('minutes').innerHTML = checkTime(mB);
    timeoutID = setTimeout(function () { timer(seconds); }, 1000);
};

let decreaseBreakMinutes = () => {  document.getElementById('breakminutes').innerHTML = parseInt(bm()) - parseInt(1);};

let increaseBreakMinutes = () => {  document.getElementById('breakminutes').innerHTML = parseInt(bm()) + parseInt(1);};

let decreaseTimerMinutes = () => {  document.getElementById('timerminutes').innerHTML = parseInt(tm()) - parseInt(1);};

let increaseTimerMinutes = () => {  document.getElementById('timerminutes').innerHTML = parseInt(tm()) + parseInt(1);};

let reset = () =>  {
    var tm = document.getElementById('timerminutes').innerHTML;
    var bm = document.getElementById('breakminutes').innerHTML;
    clearTimeout(timeoutID);
    timeoutID = undefined;
    timerOnOff = 'off';
    console.log('stop', timerOnOff);
    document.getElementById('timerminutes').innerHTML = tm;
    document.getElementById('breakminutes').innerHTML = bm;
    document.querySelector(".wedge").style.transform = ('rotateZ(0deg)');
    rotateDegrees = 0;
};
let startButton = document.getElementById('start-button');
let stopButton = document.getElementById('stop-button');
let resetButton = document.getElementById('resetButton');

let increaseBreakButton = document.getElementById('increaseBreakMinutes');
let decreaseBreakButton = document.getElementById('decreaseBreakMinutes');
let increaseTimerButton = document.getElementById('increaseTimerMinutes');
let decreaseTimerButton = document.getElementById('decreaseTimerMinutes');

stopButton.addEventListener('click', function () { stopTimer(); }, false);

startButton.addEventListener('click', function () { startTimer(); }, false);

resetButton.addEventListener('click', function () { reset(); }, false);

increaseBreakButton.addEventListener('click', function (){ increaseBreakMinutes(); rotation(6);}, false);
decreaseBreakButton.addEventListener('click', function(){ decreaseBreakMinutes(); }, false);
increaseTimerButton.addEventListener('click', function(){ increaseTimerMinutes(); }, false);
decreaseTimerButton.addEventListener('click', function(){ decreaseTimerMinutes(); }, false);

// --> rotation
function rotation (degrees) {
  rotateDegrees = rotateDegrees + degrees;
  let d = 'rotate(' + rotateDegrees + 'deg)';
  document.querySelector(".wedge").style.transform = d;
}
