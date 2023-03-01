import { userNameProfile, userJobProfile, userAvatar } from "./modal.js";
import { makeCards } from "./card.js";

const cohortId = "plus-cohort-20";
const token = "a6c9ce5b-7a95-47f3-900e-0e9cffd9e4f4";

function getUserProfile() {
    fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
        headers: {
            authorization: `${token}`
        }
    })
        .then(res => res.json())
        .then((obj) => {
            userNameProfile.textContent = obj.name;
            userJobProfile.textContent = obj.about;
            userAvatar.src = `${obj.avatar}`;
        })
        .catch((rej) => {
            console.log(`Ошибка ${rej.status}`);
        });
};

function getCards() {
    fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
        headers: {
            authorization: `${token}`
        }
    })
        .then(res => res.json())
        .then((obj) => {
            makeCards(obj);
        })
        .catch((rej) => {
            console.log(`Ошибка ${rej.status}`);
        })
}

function editUserInfo(userInfo) {
    fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: `${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    });
    getUserProfile()
}

function makeNewCard(cardInfo) {
    fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
        method: 'POST',
        headers: {
            authorization: `${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardInfo)
    });
    getCards();
}

export { getUserProfile, editUserInfo, getCards, makeNewCard }