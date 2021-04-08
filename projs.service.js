'use strict'


var gProjs;

createProjs();
function createProjs() {
    var projs = [];
    projs.push(_createProj('book-shop', 'lets manage ', '/img/portfolio/01-bookshop', 'March 2021', 'https://vakofek.github.io/bookshop-manage','Bookends','GitHup pages','JavaScript'));
    projs.push(_createProj('mine-sweeper', 'lets play ', '/img/portfolio/02-mine-sweeper', 'April 2021', 'https://vakofek.github.io/MineSweeper','Nintendo','GitHup pages','JavaScript'));
    gProjs = projs;
}

function _createProj(id, title, img, date, url,client,server,code) {
    return {
        id,
        name: id,
        title: title + id,
        desc: makeLorem(),
        url: url,
        img,
        publisheAt: date,
        labels: {
            client,
            server,
            code
        }
    };
}

function getProjs() {
    return gProjs;
}

function getProjById(id) {
    return gProjs.find(function (proj) {
        return proj.id === id;
    })
}