import {
    userName,
    userJob,
    popupProfile,
    userNameProfile,
    userJobProfile,
    namePlaceInput,
    linkPlaceInput,
    settings,
    cards
} from "./Constants.js";

import { openPopup } from "../components/modal.js";

import { renderCard, createCard, card } from "../components/Card.js";

import { hideInputError } from "../components/FormValidator.js";

let userId; //Получаем id пользователя для дальнейшей реализации удаления своих карточек, а так же нахождения ранее лайкнутых фото или удаления лайков
const getUserId = function (id) {
    userId = id;
}

/*Добавление карточек*/
const makeCards = (obj) => {
    //debugger;
    obj.forEach((item) => {
        console.log(item);
        cards.append(createCard(item))
    });
}

const renderInfo = (isLoading, item) => {
    const loading = item.querySelector(".popup__paragraph");
    if (isLoading) {
        loading.textContent = "Сохранение...";
    } else {
        loading.textContent = "Сохранить";
    }
}

const getResponseData = (res) => {
    if (res.ok) {
        return res = res.json();
    }
}

const getUserInfo = () => {
    userName.value = userNameProfile.textContent;
    userJob.value = userJobProfile.textContent;
    checkInputs(popupProfile);
    openPopup(popupProfile);
}

const makeCardForm = (evt) => {
    renderInfo(true, evt.target);
    evt.preventDefault();
    const newCard = {
        name: `${namePlaceInput.value}`,
        link: `${linkPlaceInput.value}`
    };
    renderCard(newCard);
    evt.target.reset();
    renderInfo(false, evt.target);
}

const checkInputs = (item) => {
    const form = item.querySelector(".form");
    const inupts = Array.from(form.querySelectorAll(".popup__input"));
    inupts.forEach((input) => {
        hideInputError(form, input, settings)
    });
}
export { renderInfo, getResponseData, getUserInfo, makeCardForm, checkInputs, userId, getUserId, makeCards };