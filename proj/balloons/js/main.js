'use strict'

var gBalloons = [
    { id: 1, bottom: 25, speed: 5 },
    { id: 2, bottom: 25, speed: 5 },
    { id: 3, bottom: 25, speed: 5 },
    { id: 4, bottom: 25, speed: 5 },
    { id: 5, bottom: 25, speed: 5 },
];
var gPopCount = 0;
var gInterval;

function createBaloons() {
    var elBaloonsArea = document.querySelector('.balloons')
    var leftSpace = 7;
    for (var i = 1; i <= gBalloons.length; i++) {
        elBaloonsArea.innerHTML += '<div class="balloon balloon' + i + '" onclick="pupBaloon(this)"></div>';
        var currBaloon = document.querySelector('.balloon' + i);
        currBaloon.style.backgroundColor = getRandomColor();
        currBaloon.style.left = leftSpace + '%';
        leftSpace += 20;
    }
    gInterval = setInterval(function () { setUpBaloons() }, 500);

}


function setUpBaloons() {
    var elBaloons = document.querySelectorAll('.balloon');
    for (var i = 0; i < elBaloons.length; i++) {
        var currBalloon = gBalloons[i];
        var elCurrBaloon = elBaloons[i];
        elCurrBaloon.style.bottom = currBalloon.bottom + 'px';
        currBalloon.bottom += currBalloon.speed;
    }
}

function pupBaloon(elBaloon) {
    var pupAudio = new Audio('pop.wav')
    pupAudio.play();
    elBaloon.style.opacity = 0;
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
