import { userId } from "../utils/Utils";

export default class Card {
    constructor({ likes, link, name, _id, owner }, selector, addLike, deleteLike, deleteCard, openCard) {
        this._likes = likes;
        this._link = link;
        this._name = name;
        this._id = _id;
        this._ownerId = owner._id;
        this._selector = selector;
        this._addLike = addLike;
        this._deleteLike = deleteLike;
        this._deleteCard = deleteCard;
        this._openCard = openCard;
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

    removeCard(){
        this._cardDel.parentElement.remove();
    }

    _cardDelEventListener() {
        this._cardDel = this._card.querySelector(".element__delete");

        if (this._ownerId === userId) {
            this._cardDel.addEventListener("click", (evt) => {
                this._idCard = `${this._id}`;
                this._deleteCard(this._idCard);
            });
        } else {
            this._cardDel.remove();
        }
    }

    _cardOpenEventListener() {
        this._card
            .querySelector(".element__place-img")
            .addEventListener("click", () => {
                this._openCard(this._name, this._link)
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