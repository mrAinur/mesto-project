import { openPopup } from "./modal.js";
import { makeNewCard } from "./api.js";

import Arxyz from "../images/arkhyz.jpg";
import Elbrus from "../images/elbrus.jpg";
import Dombay from "../images/dombay.jpg";
import Ivanovo from "../images/ivanovo.jpg";
import Karachaevsk from "../images/karachaevsk.jpg";
import Baikal from "../images/baikal.jpg";


const initialCards = [
    {
        name: "Архыз",
        link: Arxyz,
    },
    {
        name: "Эльбрус",
        link: Elbrus,
    },
    {
        name: "Домбай",
        link: Dombay,
    },
    {
        name: "Иваново",
        link: Ivanovo,
    },
    {
        name: "Карачаевск",
        link: Karachaevsk,
    },
    {
        name: "Байкал",
        link: Baikal,
    },
];

const placeCard = document.querySelector(".popup__card"); //Открытие фотокарточки
const popupImg = placeCard.querySelector(".popup__image"); //находим в попапе нужный нам класс
const popupName = placeCard.querySelector(".popup__place-name"); //находим в попапе элемент для записи названия

//Находим форму карточек и копируем в переменную
const cards = document.querySelector(".elements");
const cardElement = document.querySelector("#element").content;

/*Реализация добавления новых карточек*/
const newCardForm = document.querySelector(".popup__form-place");
const namePlaceInput = newCardForm.querySelector(".popup__place-info");
const linkPlaceInput = newCardForm.querySelector(".popup__place-link");

function createCard(item) {
    const card = cardElement.querySelector(".element").cloneNode(true);
    card.querySelector(".element__place-img").src = item.link;
    card.querySelector(".element__place-img").alt = item.name;
    card.querySelector(".element__place-name").textContent = item.name;
    card.querySelector(".element__num-likes").textContent = item.likes.length;

    /*Реализация кнопки лайка*/
    card
        .querySelector(".element__heart")
        .addEventListener("click", function (evt) {
            evt.target.classList.toggle("element__heart_active");
        });

    /*Реализация удаления карты*/
    const cardDel = card.querySelector(".element__delete");
    cardDel.addEventListener("click", function () {
        const cardItem = cardDel.closest(".element");
        cardItem.remove();
    });

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

/*Добавление карточек*/
function makeCards(obj) {
    obj.forEach(function (item) {
        cards.append(createCard(item))
    });
}

/*Вставка новой карточки в Дом*/
function renderCard(item) {
    const cards = Array.from(document.querySelectorAll(".element"));
    cards.forEach((item) => {
        item.remove();
    });
    makeNewCard(item);
}

export { newCardForm, namePlaceInput, linkPlaceInput, makeCards, renderCard };