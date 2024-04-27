import {makeAutoObservable} from "mobx";
import { jwtDecode } from "jwt-decode";

export default class UserStore {
    //конструктор класса пользователя
    
    constructor() {
        this._isAuth = false;
        this._user = {};
        makeAutoObservable(this);
        this.checkValidToken = this.checkValidToken.bind(this);
    }

    //Проверка валидности токена

    checkValidToken() {
        let isExpired = false;
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const dateNow = new Date();

        if (decodedToken.exp < dateNow.getTime()){
            isExpired = true;
        }

        return isExpired;
    }

    //геттеры и сеттеры для пользователя

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }

    get isAuth() {
        return this._isAuth;
    }

    get User() {
        return this._user;
    }
}
