'use strict'

var VICTORY_SOUND = new Audio('./sound/claps.mp3');
var BUZZER_SOUND = new Audio('./sound/buzzer.mp3');
var BOARD_SIZE = 16;

var gNumsArr = setNumsArr(BOARD_SIZE);
shuffle(gNumsArr);

var gNextNum = 1;
var gTimeInterval;
var gTime;
var gSeconds = 0;
var gMinute = 0;
var gElNextNum;

var elTimeBox = document.querySelector('.timer-box');
var gElFinishMsg;
// var gElFinishMsg=document.querySelector('.finish-msg');
elTimeBox.innerHTML = 'Time: 00:00';

function init() {
    setBoardSize(document.querySelector('.ra'))
}

function setBoardSize(elRadio) {
    resetTimer();
    BOARD_SIZE = +elRadio.defaultValue;
    gNumsArr = setNumsArr(BOARD_SIZE);
    shuffle(gNumsArr);
    gNextNum = 1;
    renderBoard();
    gElFinishMsg.innerHTML='';
}

function renderBoard() {
    console.log('BOARD_SIZE', BOARD_SIZE);
    var strHTML = '';
    var size = Math.sqrt(BOARD_SIZE);
    gElNextNum = document.querySelector('.next-num-box');
    gElNextNum.innerHTML = `<h3 class="next-num" data-nextNum=${gNextNum}>Next number is:  ${gNextNum}</h3>`;
    for (var i = 0; i < size; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < size; j++) {
            var cellNum = gNumsArr.pop();
            strHTML += `<td data-num=${cellNum} onclick="cellClicked(this,${cellNum})" > ${cellNum} </td>`;
        }
        strHTML += '</tr>';
    }

    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML
}


function cellClicked(elCell, cellNum) {
    if (cellNum === 1 && gNextNum === 1) renderTimer();
    if (cellNum === gNextNum) {
        var color = getRandomColor();
        elCell.style.backgroundColor = color;
        if (cellNum === BOARD_SIZE && gNextNum === BOARD_SIZE) finishGame();
        else {
            gNextNum++;
            gElNextNum.innerHTML = `<h3  class="next-num" data-nextNum=${gNextNum}>Next number is: ${gNextNum}</h3>`;
        }
    }
    else {
        BUZZER_SOUND.play()
        elCell.style.backgroundColor = 'red';
        setTimeout(function () {
            elCell.style.backgroundColor = '';
        }, 2000);
    }
}

function renderTimer() {
    gTimeInterval = setInterval(countTimer, 1000);
}

function setNumsArr(size) {
    var nums = [];
    for (var i = 0; i < size; i++) {
        nums.push(i + 1);
    }
    return nums;
}

function countTimer() {
    var strTime = '';
    gSeconds++;
    if (gSeconds === 60) {
        gMinute++;
        gSeconds = 0;
    }
    if (gSeconds < 10 && gMinute < 10) strTime = 'Time: 0' + gMinute + ':0' + gSeconds;
    else if (gSeconds < 10) strTime = 'Time: ' + gMinute + ':0' + gSeconds;
    else if (gMinute < 10) strTime = 'Time: 0' + gMinute + ':' + gSeconds;
    elTimeBox.innerHTML = strTime;
    gTime = strTime;
}

function resetTimer() {
    elTimeBox.innerHTML = 'Time: 00:00';
    clearInterval(gTimeInterval);
    gSeconds = 0;
    gMinute = 0;
}

function finishGame() {
    VICTORY_SOUND.play();
    resetTimer();
    gElFinishMsg = document.querySelector('.finish-msg');
    gElFinishMsghMsg.innerHTML = '<h3>You finish the game! <br>Your time is ' + gTime + '</h3>'
}


function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
