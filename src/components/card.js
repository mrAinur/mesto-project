import {
    popupNewCard,
    cardElement,
    popupImg,
    popupName,
    placeCard,
    cards,
} from "../utils/Constants.js";

import { openPopup, closePopup } from "./modal.js";

import { api } from "./Api.js";

import { getResponseData, userId } from "../utils/Utils";

export default class Card {

    constructor(item) {
        this._card = cardElement.querySelector(".element").cloneNode(true);
        this._numLikes = this._card.querySelector(".element__num-likes");
        this._cardDel = this._card.querySelector(".element__delete");
        this._item = item;
    }

    _createCard() {
        this._card.querySelector(".element__place-img").src = this._item.link;
        this._card.querySelector(".element__place-img").alt = this._item.name;
        this._card.querySelector(".element__place-name").textContent = this._item.name;
        this._numLikes.textContent = this._item.likes.length;

        /*Проверяем лайкал ли ранее пользователь данную карту*/
        this._item.likes.forEach((user) => {
            if (user._id === userId) {
                const heart = this._card.querySelector(".element__heart");
                heart.classList.add("element__heart_active");
            }
        })
    }

    _heartEventListener() {
        /*Реализация кнопки лайка*/
        this._card
            .querySelector(".element__heart")
            .addEventListener("click", function (evt) {
                const idCard = `${this._item._id}`;
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
                            evt.target.classList.remove("element__heart_active");
                            this._numLikes.textContent = obj.likes.length;
                        })
                        .catch((rej) => {
                            console.log(`Ошибка ${rej.status}`);
                        });
                }
            });
    }

    _cardDelEventListener() {
        if (this._item.owner._id === userId) {
            cardDel.addEventListener("click", (evt) => {
                const idCard = `${this._item._id}`;
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
    }

    _openCardEventListener(){
        this._card
        .querySelector(".element__place-img")
        .addEventListener("click", function () {
            popupImg.src = this._item.link;
            popupImg.alt = this._item.name;
            popupName.textContent = this._item.name;
            openPopup(placeCard);
        });
    }

    makeCard(){
        this._createCard(this._item);
        this._heartEventListener(this._item);
        this._cardDelEventListener(this._item);
        this._openCardEventListener(this._item);
        return this._card;
    }

}

const card = new Card();

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
                        numLikes.textContent = obj.likes.length;
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
                        numLikes.textContent = obj.likes.length;
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

export { renderCard, createCard, card};