import { getResponseData } from "../utils/Utils.js";
import { cohortId } from "../utils/Constants.js";


export default class Api {

    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getInfo() {
        console.log(this._baseUrl);
        console.log(this._headers);
    }

    getUserProfile() {
        return fetch(`${this._baseUrl}${cohortId}/users/me`, {
            headers: this._headers
        })
            .then((res) => {
                return getResponseData(res)
            })
    };

    getCards() {
        return fetch(`${this._baseUrl}${cohortId}/cards`, {
            headers: this._headers
        })
            .then((res) => {
                return getResponseData(res)
            })
    };

    editUserInfo(userInfo) {
        return fetch(`${this._baseUrl}${cohortId}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(userInfo)
        })
    }

    makeNewCard(cardInfo) {
        return fetch(`${this._baseUrl}${cohortId}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(cardInfo)
        })
    }

    deleteCard(item) {
        return fetch(`${this._baseUrl}${cohortId}/cards/${item}`, {
            method: 'DELETE',
            headers: this._headers
        })
    }

    addLike(item) {
        return fetch(`${this._baseUrl}${cohortId}/cards/likes/${item}`, {
            method: 'PUT',
            headers: this._headers
        })
    }

    deleteLike(item) {
        return fetch(`${this._baseUrl}${cohortId}/cards/likes/${item}`, {
            method: 'DELETE',
            headers: this._headers
        })
    }

    editAvatar(item) {
        return fetch(`${this._baseUrl}${cohortId}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(item)
        })
    }

}