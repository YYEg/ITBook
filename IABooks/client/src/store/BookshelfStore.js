import {makeAutoObservable} from "mobx";
import {deleteBookFromBookshelf} from "../http/bookAPI";

export default class BookshelfStore {
    
    //Конструктор класса книжные полки т.е. списка избранных пользователем книг
    constructor() {
        this._bookshelf = [];
        makeAutoObservable(this);
    }

    //Метод удаляющий книгу из списка избранного
    async setDeleteItemBookshelf(book, isAuth = false) {
        if(isAuth) {
            await deleteBookFromBookshelf(book.id).then(() => {
                this._bookshelf = this._bookshelf.filter(item => item.id !== book.id);
            });
        } else {
            this._bookshelf = this._bookshelf.filter(item => item.id !== book.id);

            localStorage.setItem("bookshelf", JSON.stringify(this._bookshelf));
        }
    }

    // Метод определения книжной полки кокретного пользователя

    setBookshelf(item, isAuth = false) {
        const checkBookInBookshelf = this._bookshelf.findIndex(film => film.id === item.id);
        if(checkBookInBookshelf < 0) {
            this._bookshelf = [...this._bookshelf, { count: 1, ...item}];
        }

        if(!isAuth) {
            localStorage.setItem("bookshelf", JSON.stringify(this._bookshelf));
        }
    }

    //Метод удаляющий все книги из списка избранного
    setDeleteAllBookFromBookshelf() {
        return this._bookshelf = [];
    }

    //Метод очищающий список избранных
    resetBookshelf() {
        this._bookshelf = [];
        localStorage.removeItem('bookshelf');
    }

    //Метод возвращающий список избранных

    get Bookshelf() {
        return this._bookshelf;
    }
}
