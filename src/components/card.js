import {
    popupNewCard,
    cardElement,
    popupImg,
    popupName,
    placeCard,
    cards,
} from "../utils/Constants.js";

import { openPopup, closePopup } from "./modal.js";

import { api } from "../index.js";

import { getResponseData, userId } from "../utils/Utils";

export default class Card {

    constructor({ likes, link, name, _id, owner }, selector, addLike, deleteLike, deleteCard) {
        this._likes = likes;
        this._link = link;
        this._name = name;
        this._id = _id;
        this._ownerId = owner._id;
        this._selector = selector;
        this._addLike = addLike;
        this._deleteLike = deleteLike;
        this._deleteCard = deleteCard;
    }

    _getCard() {
        const cardElement = document.querySelector(this._selector).content.cloneNode(true);
        return cardElement;
    }

    _makeCard() {
        this._card.querySelector(".element__place-img").src = this._link;
        this._card.querySelector(".element__place-img").alt = this._name;
        this._card.querySelector(".element__place-name").textContent = this._name;
        this._numLikes = this._card.querySelector(".element__num-likes");
        this._numLikes.textContent = this._likes.length;
        this._heart = this._card.querySelector(".element__heart");

        /*Проверяем лайкал ли ранее пользователь данную карту*/
        this._likes.forEach((user) => {
            if (user._id === userId) {
                this._heart.classList.add("element__heart_active");
            }
        })
        return this._card;
    }

    _likesEventListeners() {
        this._numLikes = this._card.querySelector(".element__num-likes");
        this._card
            .querySelector(".element__heart")
            .addEventListener("click", (evt) => {
                this._idCard = `${this._id}`;
                if (!(evt.target.classList.contains(`element__heart_active`))) {
                    this._addLike(this._idCard);
                } else {
                    this._deleteLike(this._idCard);
                }
            });
    }

    putLike(obj) {
        this._numLikes.textContent = obj.likes.length;
        this._heart.classList.add("element__heart_active");
    }

    removeLike(obj){
        this._numLikes.textContent = obj.likes.length;
        this._heart.classList.remove("element__heart_active");
    }

    _cardDelEventListener() {
        this._cardDel = this._card.querySelector(".element__delete");

        if (this._ownerId === userId) {
            this._cardDel.addEventListener("click", (evt) => {
                this._idCard = `${this._id}`;
                this._deleteCard(this._idCard, this._card);
            });
        } else {
            this._cardDel.remove();
        }
    }

    _cardOpenEventListener() {
        this._card
            .querySelector(".element__place-img")
            .addEventListener("click", () => {
                popupImg.src = this._link;
                popupImg.alt = this._name;
                popupName.textContent = this._name;
                openPopup(placeCard);
            });
    }

    generate() {
        this._card = this._getCard();
        this._makeCard();
        this._likesEventListeners();
        this._cardDelEventListener();
        this._cardOpenEventListener();
        return this._card;
    }

}

const createCard = (item) => {
    const card = cardElement.querySelector(".element").cloneNode(true);
    card.querySelector(".element__place-img").src = item.link;
    card.querySelector(".element__place-img").alt = item.name;
    card.querySelector(".element__place-name").textContent = item.name;
    const numLikes = card.querySelector(".element__num-likes");
    numLikes.textContent = item.likes.length;

    /*Проверяем лайкал ли ранее пользователь данную карту*/
    item.likes.forEach((user) => {
        if (user._id === userId) {
            const heart = card.querySelector(".element__heart");
            heart.classList.add("element__heart_active");
        }
    })

    /*Реализация кнопки лайка*/
    card
        .querySelector(".element__heart")
        .addEventListener("click", function (evt) {
            const idCard = `${item._id}`;
            if (!(evt.target.classList.contains(`element__heart_active`))) {
                api.addLike(idCard)
                    .then((res) => {
                        return getResponseData(res);
                    })
                    .then((obj) => {
                        this._numLikes.textContent = obj.likes.length;
                        evt.target.classList.add("element__heart_active");
                    })
                    .catch((rej) => {
                        console.log(`Ошибка ${rej.status}`);
                    });
            } else {
                api.deleteLike(idCard)
                    .then((res) => {
                        return getResponseData(res);
                    })
                    .then((obj) => {
                        console.log(obj);
                        evt.target.classList.remove("element__heart_active");
                        this._numLikes.textContent = obj.likes.length;
                    })
                    .catch((rej) => {
                        console.log(`Ошибка ${rej.status}`);
                    });
            }
        });

    /*Реализация удаления карты*/
    const cardDel = card.querySelector(".element__delete");
    if (item.owner._id === userId) {
        cardDel.addEventListener("click", (evt) => {
            const idCard = `${item._id}`;
            api.deleteCard(idCard)
                .then(res => {
                    if (res.ok) {
                        evt.target.parentElement.remove();
                    }
                })
                .catch((rej) => {
                    console.log(`Ошибка ${rej.status}`);
                });
        });
    } else {
        cardDel.remove();
    }

    /*Реализация открытия карточки*/
    card
        .querySelector(".element__place-img")
        .addEventListener("click", function () {
            popupImg.src = item.link;
            popupImg.alt = item.name;
            popupName.textContent = item.name;
            openPopup(placeCard);
        });
    return card;
}



/*Вставка новой карточки в Дом*/
const renderCard = (item) => {
    api.makeNewCard(item)
        .then((res) => {
            return getResponseData(res);
        })
        .then((res) => {
            cards.prepend(createCard(res));
            return closePopup(popupNewCard);
        })
        .catch((rej) => {
            console.log(`Ошибка ${rej.status}`);
        });
}

export { renderCard, createCard };