'use strict'

function onInit() {
    renderBooks();
}

function renderBooks() {
    var books = getBooks();
    var booksTable = books.map(function (book) {
        return `
        <tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>$ ${book.price}</td>
        <td class="avtions">
        <button style="background-color: rgb(246, 248, 143);" onclick="onRead('${book.id}')" >Read</button>
        <button style="background-color: rgb(241, 186, 65);" onclick="onUpdateBook('${book.id}')">Update</button>
        <button style="background-color: rgb(240, 118, 81);" onclick="onRemoveBook('${book.id}')">Delete</button>
        </td>
        </tr>
        `
    });

    var elTable = document.querySelector('.books-table');
    elTable.innerHTML = booksTable.join('');

}
function onSortArea(){
    document.querySelector('.sort-container').style.display='flex';
}

function onRead(bookId) {
    document.querySelector('.detail-model').style.display = 'flex';
    renderBookModel(bookId);
}

function onUpdateBook(bookId) {
    var price = +prompt('Enter update book price');
    updateBook(bookId, price);
    renderBooks();
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function onAddBook() {
    document.querySelector('.form-container').style.display = "flex";
}

function onAddBookSubmit(ev) {
    ev.preventDefault();
    var name = document.querySelector('input[name="bookName"]').value;
    var price = document.querySelector('input[name="bookPrice"]').value;
    if (!name || !price) {
        document.querySelector('.form-container').style.display = "none";
        return;
    }
    addBook(name, price);
    renderBooks();
    document.querySelector('.form-container').style.display = "none";
}

function renderBookModel(bookIdx) {
    var currBook = getBookById(bookIdx);
    var strHtml = `
    <h3>${currBook.name}</h3>
    <img src="img/${currBook.imgUrl}.jpeg"/>
    <p>${currBook.summary}</p>
    <section class="rate-control-area">
    <button class="rate" onclick="onUpdateRate(${currBook.rate} , '${currBook.id}','down' )">-</button>
    <span class="rate">${currBook.rate}</span>
    <button class="rate" onclick="onUpdateRate(${currBook.rate} , '${currBook.id}','up')">+</button>
    </section>
    <button class="close-modal" onclick="onHiddenModel()" >Close</button>
`;

    var elModel = document.querySelector('.detail-model');
    elModel.innerHTML = strHtml;
    elModel.hidden = false;
}

function onHiddenModel() {
    document.querySelector('.detail-model').style.display = 'none';
    // document.querySelector('.detail-model').hidden = true;
}
function onUpdateRate(rate, bookId, action) {
    var updatedRate = (action === 'up') ? ++rate : --rate
    if (updatedRate < 0 || updatedRate > 10) return;
    updateRate(updatedRate, bookId);
    renderBookModel(bookId);
}
