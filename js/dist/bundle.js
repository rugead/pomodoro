(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var timeoutID = void 0;
var timerOnOff = 'off';
var m = function m() {
    return document.getElementById('minutes').innerHTML;
};
var s = function s() {
    return document.getElementById('seconds').innerHTML;
};
var tm = function tm() {
    return document.getElementById('timerminutes').innerHTML;
};
var bm = function bm() {
    return document.getElementById('breakminutes').innerHTML;
};
var rotateDegrees = 0;

var checkTime = function checkTime(i) {
    if (i < 10) {
        i = '0' + i;
    }return i;
};

var toggleWorkBreak = 'break';

var startTimer = function startTimer() {
    if (timerOnOff === 'pause') {
        timerOnOff = 'on';
        var t = parseInt(m()) * 60 + parseInt(s());
        console.log(t);
        timer(t);
    }

    if (timerOnOff === 'off' && toggleWorkBreak === 'break') {
        timerOnOff = 'on';
        console.log('TIMERONOFF', timerOnOff);
        var sec = parseInt(tm() * 60);
        toggleWorkBreak = 'work';
        timer(sec);
    }

    if (timerOnOff === 'off' && toggleWorkBreak === 'work') {
        timerOnOff = 'on';
        console.log('TIMERONOFF', timerOnOff);
        var _sec = parseInt(bm() * 60);
        toggleWorkBreak = 'break';
        timer(_sec);
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

var timer = function timer(seconds) {
    if (seconds <= 0) {
        toggleTimer();
        return;
    }
    rotation(6);
    console.log('SECONDS', seconds);
    console.log('TIMEOUTID', toggleWorkBreak);
    seconds = seconds - 1;
    var mB = Math.floor(seconds / 60);
    var sB = seconds % 60;
    document.getElementById('seconds').innerHTML = checkTime(sB);
    document.getElementById('minutes').innerHTML = checkTime(mB);
    timeoutID = setTimeout(function () {
        timer(seconds);
    }, 1000);
};

var decreaseBreakMinutes = function decreaseBreakMinutes() {
    document.getElementById('breakminutes').innerHTML = parseInt(bm()) - parseInt(1);
};

var increaseBreakMinutes = function increaseBreakMinutes() {
    document.getElementById('breakminutes').innerHTML = parseInt(bm()) + parseInt(1);
};

var decreaseTimerMinutes = function decreaseTimerMinutes() {
    document.getElementById('timerminutes').innerHTML = parseInt(tm()) - parseInt(1);
};

var increaseTimerMinutes = function increaseTimerMinutes() {
    document.getElementById('timerminutes').innerHTML = parseInt(tm()) + parseInt(1);
};

var reset = function reset() {
    var tm = document.getElementById('timerminutes').innerHTML;
    var bm = document.getElementById('breakminutes').innerHTML;
    clearTimeout(timeoutID);
    timeoutID = undefined;
    timerOnOff = 'off';
    console.log('stop', timerOnOff);
    document.getElementById('timerminutes').innerHTML = tm;
    document.getElementById('breakminutes').innerHTML = bm;
    document.querySelector(".wedge").style.transform = 'rotateZ(0deg)';
    rotateDegrees = 0;
};
var startButton = document.getElementById('start-button');
var stopButton = document.getElementById('stop-button');
var resetButton = document.getElementById('resetButton');

var increaseBreakButton = document.getElementById('increaseBreakMinutes');
var decreaseBreakButton = document.getElementById('decreaseBreakMinutes');
var increaseTimerButton = document.getElementById('increaseTimerMinutes');
var decreaseTimerButton = document.getElementById('decreaseTimerMinutes');

stopButton.addEventListener('click', function () {
    stopTimer();
}, false);

startButton.addEventListener('click', function () {
    startTimer();
}, false);

resetButton.addEventListener('click', function () {
    reset();
}, false);

increaseBreakButton.addEventListener('click', function () {
    increaseBreakMinutes();rotation(6);
}, false);
decreaseBreakButton.addEventListener('click', function () {
    decreaseBreakMinutes();
}, false);
increaseTimerButton.addEventListener('click', function () {
    increaseTimerMinutes();
}, false);
decreaseTimerButton.addEventListener('click', function () {
    decreaseTimerMinutes();
}, false);

// --> rotation
function rotation(degrees) {
    rotateDegrees = rotateDegrees + degrees;
    var d = 'rotate(' + rotateDegrees + 'deg)';
    document.querySelector(".wedge").style.transform = d;
}

},{}]},{},[1])
//# sourceMappingURL=app.js.map
