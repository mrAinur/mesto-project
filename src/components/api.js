import { getResponseData } from "./Utils";

const cohortId = "plus-cohort-20";
const token = "a6c9ce5b-7a95-47f3-900e-0e9cffd9e4f4";
const url = "https://nomoreparties.co/v1/";

const getUserProfile = () => {
    return fetch(`${url}${cohortId}/users/me`, {
        headers: {
            authorization: `${token}`
        }
    })
        .then((res) => {
            return getResponseData(res)
        })
};

const getCards = () => {
    return fetch(`${url}${cohortId}/cards`, {
        headers: {
            authorization: `${token}`
        }
    })
        .then((res) => {
            return getResponseData(res)
        })
}

const editUserInfo = (userInfo) => {
    return fetch(`${url}${cohortId}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: `${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
}

const makeNewCard = (cardInfo) => {
    return fetch(`${url}${cohortId}/cards`, {
        method: 'POST',
        headers: {
            authorization: `${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardInfo)
    })
}

const deleteCard = (item) => {
    return fetch(`${url}${cohortId}/cards/${item}`, {
        method: 'DELETE',
        headers: {
            authorization: `${token}`
        }
    })
}

const addLike = (item) => {
    return fetch(`${url}${cohortId}/cards/likes/${item}`, {
        method: 'PUT',
        headers: {
            authorization: `${token}`
        }
    })
}

const deleteLike = (item) => {
    return fetch(`${url}${cohortId}/cards/likes/${item}`, {
        method: 'DELETE',
        headers: {
            authorization: `${token}`
        }
    })
}

const editAvatar = (item) => {
    return fetch(`${url}${cohortId}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: `${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
}

export { getUserProfile, editUserInfo, getCards, makeNewCard, deleteCard, addLike, deleteLike, editAvatar }