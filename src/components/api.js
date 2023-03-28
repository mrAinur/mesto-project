export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res = res.json();
        } else {
            return Promise.reject(`Ошибка ${res.status}`);
        }
    }

    getUserProfile() {
        return fetch(`${this._baseUrl}/plus-cohort-20/users/me`, {
            headers: this._headers
        })
            .then((res) => {
                return this._checkResponse(res)
            })
    };

    getCards() {
        return fetch(`${this._baseUrl}/plus-cohort-20/cards`, {
            headers: this._headers
        })
            .then((res) => {
                return this._checkResponse(res)
            })
    };

    editUserInfo(userInfo) {
        return fetch(`${this._baseUrl}/plus-cohort-20/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(userInfo)
        })
            .then((res) => {
                return this._checkResponse(res)
            })
    }

    makeNewCard(cardInfo) {
        return fetch(`${this._baseUrl}/plus-cohort-20/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(cardInfo)
        })
            .then((res) => {
                return this._checkResponse(res)
            })
    }

    deleteCard(item) {
        return fetch(`${this._baseUrl}/plus-cohort-20/cards/${item}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then((res) => {
                return this._checkResponse(res)
            })
    }

    addLike(item) {
        return fetch(`${this._baseUrl}/plus-cohort-20/cards/likes/${item}`, {
            method: 'PUT',
            headers: this._headers
        })
            .then((res) => {
                return this._checkResponse(res)
            })
    }

    deleteLike(item) {
        return fetch(`${this._baseUrl}/plus-cohort-20/cards/likes/${item}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then((res) => {
                return this._checkResponse(res)
            })
    }

    editAvatar(item) {
        return fetch(`${this._baseUrl}/plus-cohort-20/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(item)
        })
            .then((res) => {
                return this._checkResponse(res)
            })
    }
}