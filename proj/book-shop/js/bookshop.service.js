'use strict'

const KEY = 'books' // key to local storage
var gBooks;

_createBooks();

function _createBooks() {
    var books = loadFromStorage(KEY);
    if (!books || !books.length) {
        books = [];
        books.push(_createBook('Departing', 99, 'departing'));
        books.push(_createBook('Divergent', 119, 'divergent'));
        books.push(_createBook('Supernova', 55, 'supernova'));
    }
    gBooks = books;
    _saveBooksToStorage()
}

function _createBook(name, price, imgUrl = 'supernova') {
    return {
        name,
        price,
        id: makeId(),
        imgUrl,
        summary: makeLorem(),
        rate: 0
    };
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks);
}

function getBooks() {
    return gBooks;
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    });
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}

function addBook(name, price) {
    var book = _createBook(name, price);
    gBooks.push(book);
    _saveBooksToStorage();
}

function updateBook(bookId, price) {
    var book = getBookById(bookId)
    book.price = price;
    _saveBooksToStorage();
}

function getBookById(bookId) {
    return gBooks.find(function (book) {
        return book.id === bookId;
    });
}

function updateRate(rate, bookId) {
    var book = getBookById(bookId)
    book.rate = rate;
    _saveBooksToStorage();
}