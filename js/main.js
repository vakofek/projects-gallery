'use strict'
var gProjs = getProjs();

function initPage() {
    renderPage();
}

function renderPage() {
    var projs = gProjs;
    var strHTML = projs.map(function (proj) {
        return `<div class=" col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal"  data-id="${proj.id}" onclick="renderModal(this)" href="#portfolioModal1">
        <div class="portfolio-hover">
        <div class="portfolio-hover-content">
        <i class="fa fa-plus fa-3x"></i>
        </div>
        </div>
        <img class="img-fluid" src="${proj.img}.jpg" >
        </a>
        <div class="portfolio-caption">
        <h4>${proj.name}</h4>
        <p class="text-muted">${proj.title}</p>
        </div>
        </div>`;
    });

    var elProjs = document.querySelector('.projs-area');
    elProjs.innerHTML = strHTML.join('');
}

function renderModal(el) {
    var projId = el.dataset.id;
    var proj = getProjById(projId);
    var strHTML = `
    <h2>${proj.name}</h2>
    <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
    <img class="img-fluid d-block mx-auto" src="${proj.img}-full.jpg" alt="">
    <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est
      blanditiis
      dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae
      cupiditate,
      maiores repudiandae, nostrum, reiciendis facere nemo!</p>
    <ul class="list-inline">
      <li>${proj.publisheAt}</li>
      <li>Client: ${proj.labels.client}</li>
      <li>Server: ${proj.labels.server}</li>
      <li>Code lang: ${proj.labels.code}</li>
    </ul>
    <button class="btn btn-primary"  onclick="openWebSite('${proj.url}')" type="button" style="margin:10px;">Show</button> <br>
    
    <button class="btn btn-primary" data-dismiss="modal" type="button">
      <i class="fa fa-times"></i>
      Close Project</button> `;
    var elModal = document.querySelector('.modal-body');
    elModal.innerHTML = strHTML;
}

function openWebSite(url) {
    window.open(url);
}

function sendMessage() {
var email=document.querySelector('input[name=email]').value;
var subject=document.querySelector('input[name=subject]').value;
var message=document.querySelector('input[name=message]').value;
window.location.href=`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${message}`;

}