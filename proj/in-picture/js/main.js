'use strict'

var QUESTS_NUM = 10;
var gNextId = 1;
var gQuests = createQests(QUESTS_NUM);
var gCurrQuestIdx = 0;
var gIsCorrect;
var gCorrectAnsCount = 0;


function createQests(questsNum) {
    var quests = [];
    for (var i = 0; i < questsNum; i++) {
        var quest = createQest();
        quests.push(quest);
        for (var j = 0; j <= 1; j++) {
            quest.opts[j] = setAnswer(quest, i, j);
        }
    }
    return quests;
}

function createQest() {
    return {
        id: gNextId++,
        opts: [],
        correctOptUndex: getRandomInt(0, 1)
    }
}

function init() {
    renderQuest()
}

function renderQuest() {
    var strHTML = '';
    document.querySelector('.finish-area').style.display = 'none'
    var elImg = document.querySelector('.img-area');
    elImg.innerHTML = '<img src="./img/' + (gCurrQuestIdx + 1) + '.jpg" />'
    for (var j = 0; j < 2; j++) {
        strHTML += '<button class="answer-btn" value="' + j + '" onclick="checkAnswer(' + j + ')">' + gQuests[gCurrQuestIdx].opts[j] + '</button> <br/>'
    }
    var elBtn = document.querySelector('.answer-area');
    elBtn.innerHTML = strHTML;
}


function checkAnswer(optIdx) {
    gIsCorrect = (gQuests[gCurrQuestIdx].correctOptUndex === optIdx) ? true : false;
    if (gIsCorrect) {
        gCorrectAnsCount++;
        gCurrQuestIdx++;
        if (gCurrQuestIdx < QUESTS_NUM) renderQuest();
        else {
            var elImg = document.querySelector('.finish-area');
            elImg.style.display = 'block';
            if (isPassTheory()) {
                var msg = 'You pass! ' + getMsg();
                var style = style = "background-color:green"
            }
            else {
                var msg = 'You failed! ' + getMsg();
                var style = style = "background-color:red"
            }
            elImg.innerHTML = '<div style="' + style + '">' + msg + '</div>';
            setFinishButton();
        }
    }
    else {
        gCurrQuestIdx++;
        if (gCurrQuestIdx < QUESTS_NUM) renderQuest();
        else {
            var elImg = document.querySelector('.finish-area');
            elImg.style.display = 'block';
            var msg = 'You failed! ' + getMsg();
            elImg.innerHTML = '<div class="finish-msg" style="background-color:red">' + msg + '</div>';
            setFinishButton();
        }
    }
}

function setFinishButton() {
    var elBtn = document.querySelector('.answer-area');
    elBtn.innerHTML = '<button class="answer-btn" onclick="reset()"> Start Again </button>';
}

function reset() {
    gCurrQuestIdx = 0;
    gIsCorrect;
    gCorrectAnsCount = 0;
    gNextId = 1;
    gQuests = createQests(QUESTS_NUM);
    renderQuest();
}

function setAnswer(quest, questIdx, answerIdx) {
    switch (questIdx) {
        case 0: {
            if (quest.correctOptUndex === answerIdx) return 'You must  stop!';
            else return 'You can drive';
        }
        case 1: {
            if (quest.correctOptUndex === answerIdx) return 'Roadworks, drive carefully';
            else return 'You must  stop!';
        }
        case 2: {
            if (quest.correctOptUndex === answerIdx) return 'No sign-in!';
            else return 'Perform U-turn';
        }
        case 3: {
            if (quest.correctOptUndex === answerIdx) return 'Bicycle traffic nearby';
            else return 'Bicycle lane only';
        }
        case 4: {
            if (quest.correctOptUndex === answerIdx) return 'Skating hazard';
            else return 'Road Games';
        }
        case 5: {
            if (quest.correctOptUndex === answerIdx) return 'No U-turn';
            else return 'no left turn';
        }
        case 6: {
            if (quest.correctOptUndex === answerIdx) return 'Congealed road';
            else return 'Bumper in front of you';
        }
        case 7: {
            if (quest.correctOptUndex === answerIdx) return 'Dead end road';
            else return 'Node T before you';
        }
        case 8: {
            if (quest.correctOptUndex === answerIdx) return 'Square before you';
            else return 'Road turns';
        }
        case 9: {
            if (quest.correctOptUndex === answerIdx) return 'No stop or parking';
            else return 'No stop for heavy vehicle';
        }
    }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getMsg() {
    return 'You answer correct on ' + gCorrectAnsCount + ' / ' + QUESTS_NUM + ' questions' +
        '<br/>Press "Start Again" to reset the Theoretical driving test';

}
function isPassTheory() {
    return (gCorrectAnsCount < QUESTS_NUM) ? false : true;
}

