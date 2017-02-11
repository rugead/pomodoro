(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var timeoutID = void 0;
var secondsCounter = 0;
var minutesCounter = 0;
var timerOnOff = 'off';
var moveSec = document.getElementById('moveingSec');
var moveMin = document.getElementById('moveingMin');
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

    moveSec(1.666666);
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
    document.getElementById('breakminutes').innerHTML = checkTime(parseInt(bm()) - parseInt(1));
};

var increaseBreakMinutes = function increaseBreakMinutes() {
    document.getElementById('breakminutes').innerHTML = checkTime(parseInt(bm()) + parseInt(1));
};

var decreaseTimerMinutes = function decreaseTimerMinutes() {
    var minutes = parseInt(tm()) - parseInt(1);
    document.getElementById('timerminutes').innerHTML = minutes;
    document.getElementById('minutes').innerHTML = checkTime(minutes);
};

var increaseTimerMinutes = function increaseTimerMinutes() {
    var minutes = parseInt(tm()) + parseInt(1);
    document.getElementById('timerminutes').innerHTML = minutes;
    document.getElementById('minutes').innerHTML = checkTime(minutes);
};

var reset = function reset() {
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

var startButton = document.getElementById('start-button');
startButton.addEventListener('click', function () {
    startTimer();
}, false);

var stopButton = document.getElementById('stop-button');
stopButton.addEventListener('click', function () {
    stopTimer();
}, false);

var resetButton = document.getElementById('resetButton');

moveSec = function moveSec() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.666666;

    var d = void 0;
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

moveMin = function moveMin(x) {
    // document.getElementById('minutes').innerHTML = x - 1;
    minutesCounter = minutesCounter + 100 / x;
    var d = 'translateX(' + minutesCounter + '%)';
    document.querySelector('#movingMin').style.transform = d;
};

var increaseBreakButton = document.getElementById('increaseBreakMinutes');
increaseBreakButton.addEventListener('click', function () {
    increaseBreakMinutes();
}, false);

var increaseTimerButton = document.getElementById('increaseTimerMinutes');
resetButton.addEventListener('click', function () {
    reset();
}, false);

var decreaseBreakButton = document.getElementById('decreaseBreakMinutes');
decreaseBreakButton.addEventListener('click', function () {
    decreaseBreakMinutes();
}, false);

increaseTimerButton.addEventListener('click', function () {
    increaseTimerMinutes();
}, false);

var decreaseTimerButton = document.getElementById('decreaseTimerMinutes');
decreaseTimerButton.addEventListener('click', function () {
    decreaseTimerMinutes();
}, false);

},{}]},{},[1])
//# sourceMappingURL=app.js.map
