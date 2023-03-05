const cohortId = "plus-cohort-20";
const token = "a6c9ce5b-7a95-47f3-900e-0e9cffd9e4f4";

const getUserProfile = () => {
    return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
        headers: {
            authorization: `${token}`
        }
    })
        .then(res => {
            if (res.ok) {
                return res = res.json();
            }
        })
        .catch((rej) => {
            console.log(`Ошибка ${rej.status}`);
        });
};

const getCards = () => {
    return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
        headers: {
            authorization: `${token}`
        }
    })
        .then(res => {
            if (res.ok) {
                return res = res.json();
            }
        })
        .catch((rej) => {
            console.log(`Ошибка ${rej.status}`);
        })
}

const editUserInfo = (userInfo) => {
    return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: `${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
}

const makeNewCard = (cardInfo) => {
    return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
        method: 'POST',
        headers: {
            authorization: `${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardInfo)
    })
}

const deleteCard = (item) => {
    return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${item}`, {
        method: 'DELETE',
        headers: {
            authorization: `${token}`
        }
    })
}

const addLike = (item) => {
    return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${item}`, {
        method: 'PUT',
        headers: {
            authorization: `${token}`
        }
    })
}

const deleteLike = (item) => {
    return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${item}`, {
        method: 'DELETE',
        headers: {
            authorization: `${token}`
        }
    })
}

const editAvatar = (item) => {
    return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: `${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
}

export { getUserProfile, editUserInfo, getCards, makeNewCard, deleteCard, addLike, deleteLike, editAvatar }