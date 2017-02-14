(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
let timeoutID;
let secondsCounter = 0;
let minutesCounter =  0;
let timerOnOff = 'off';
let moveSec = document.getElementById('moveingSec');
let moveMin = document.getElementById('moveingMin');
let m = () => document.getElementById('minutes').innerHTML;
let s = () => document.getElementById('seconds').innerHTML;
let tm = () => document.getElementById('timerminutes').innerHTML;
let bm = () => document.getElementById('breakminutes').innerHTML;

let checkTime = (i) => {
    if (i < 10) {i = '0' + i;}  return i;
};

let toggleWorkBreak = 'break';

let startTimer = () => {
    if (timerOnOff  === 'pause') {
        timerOnOff = 'on';
        let t = parseInt(m()) * 60  + parseInt(s());
        timer(t);
    }

    if ((timerOnOff === 'off') && (toggleWorkBreak === 'break')) {
        timerOnOff = 'on';
        let sec = parseInt(tm() * 60);
        toggleWorkBreak = 'work';
        timer(sec);
    }

    if ((timerOnOff === 'off') && (toggleWorkBreak === 'work')) {
        timerOnOff = 'on';
        let sec = parseInt(bm() * 60);
        toggleWorkBreak = 'break';
        timer(sec);
    }
};

function stopTimer() {
    clearTimeout(timeoutID);
    timeoutID = undefined;
    timerOnOff = 'pause';
}

function toggleTimer() {
    clearTimeout(timeoutID);
    timeoutID = undefined;
    timerOnOff = 'off';
    startTimer();
}

let timer = (seconds) => {
    if (seconds <= 0) {
        toggleTimer();
        return;
    }

    moveSec(1.666666);
    seconds = seconds - 1;
    let mB = Math.floor(seconds / 60);
    let sB = seconds % 60;
    document.getElementById('seconds').innerHTML = checkTime(sB);
    document.getElementById('minutes').innerHTML = checkTime(mB);
    timeoutID = setTimeout(function () { timer(seconds); }, 1000);
};

let decreaseBreakMinutes = () => {  document.getElementById('breakminutes').innerHTML =  checkTime(parseInt(bm()) - parseInt(1));};

let increaseBreakMinutes = () => {  document.getElementById('breakminutes').innerHTML = checkTime(parseInt(bm()) + parseInt(1));};

let decreaseTimerMinutes = () => {
  let minutes = parseInt(tm()) - parseInt(1);
  document.getElementById('timerminutes').innerHTML = minutes;
  document.getElementById('minutes').innerHTML = checkTime(minutes);
};

let increaseTimerMinutes = () => {
  let minutes = parseInt(tm()) + parseInt(1);
  document.getElementById('timerminutes').innerHTML = minutes;
  document.getElementById('minutes').innerHTML = checkTime(minutes);
};

let reset = () =>  {
    var tm = document.getElementById('timerminutes').innerHTML;
    clearTimeout(timeoutID);
    timeoutID = undefined;
    timerOnOff = 'off';
    secondsCounter = 0;
    document.getElementById('minutes').innerHTML = tm;
    document.getElementById('seconds').innerHTML = checkTime(0);
    document.querySelector('#movingSec').style.transform = 'translateY(0%)';
    document.querySelector('#movingMin').style.transform = 'translateY(0%)';
};

let startButton = document.getElementById('start-button');
startButton.addEventListener('click', function () { startTimer(); }, false);

let stopButton = document.getElementById('stop-button');
stopButton.addEventListener('click', function () { stopTimer(); }, false);

let resetButton = document.getElementById('resetButton');

moveSec = (x = (1.666666)) => {
    let d;
    secondsCounter = secondsCounter + x;
    if (secondsCounter > 99.5) {
        secondsCounter = 0;
        d = 'translateX(' + secondsCounter + '%)';

        moveMin(m());
    } else {
        d = 'translateX(' + secondsCounter + '%)';
    }

    console.log(d);
    document.querySelector('#movingSec').style.transform = d;
};

moveMin = (x) => {
  // document.getElementById('minutes').innerHTML = x - 1;
  minutesCounter = minutesCounter + 100 / x;
  let d = 'translateX(' + minutesCounter + '%)';
  document.querySelector('#movingMin').style.transform = d;
};

let increaseBreakButton = document.getElementById('increaseBreakMinutes');
increaseBreakButton.addEventListener('click', function () { increaseBreakMinutes(); }, false);

let increaseTimerButton = document.getElementById('increaseTimerMinutes');
resetButton.addEventListener('click', function () { reset(); }, false);

let decreaseBreakButton = document.getElementById('decreaseBreakMinutes');
decreaseBreakButton.addEventListener('click', function () { decreaseBreakMinutes(); }, false);

increaseTimerButton.addEventListener('click', function () { increaseTimerMinutes(); }, false);

let decreaseTimerButton = document.getElementById('decreaseTimerMinutes');
decreaseTimerButton.addEventListener('click', function () { decreaseTimerMinutes(); }, false);

},{}]},{},[1]);
