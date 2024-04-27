import {makeAutoObservable} from "mobx";

export default class BookStore {
    //Конструктор Книжный Магазин
    
    constructor() {
        this._genres = [];
        this._authors = [];
        this._books = [];
        this._selectedGenre = {};
        this._selectedAuthor = {};
        this._page = 1;
        this._totalCount = 0;
        this._limit = 45;
        makeAutoObservable(this);
    }

    //геттеры и сеттеры класса Книжный Магазин

    setSelectedGenre(selectedGenre) {
        this.setPage(1);
        this._selectedGenre = selectedGenre;
    }
    setSelectedAuthor(selectedAuthor) {
        this.setPage(1);
        this._selectedAuthor = selectedAuthor;
    }
    setGenres(genres) {
        this._genres = genres;
    }
    setAuthors(authors) {
        this._authors = authors;
    }
    setBooks(books) {
        this._books = books;
    }
    setPage(page) {
        this._page = page;
    }
    setTotalCount(totalCount) {
        this._totalCount = totalCount;
    }

    get genres() {
        return this._genres;
    }
    get author() {
        return this._authors;
    }
    get books() {
        return this._books;
    }
    get selectedGenre() {
        return this._selectedGenre;
    }
    get selectedAuthor() {
        return this._selectedAuthor;
    }
    get page() {
        return this._page;
    }
    get totalCount() {
        return this._totalCount;
    }
    get limit() {
        return this._limit;
    }
}
