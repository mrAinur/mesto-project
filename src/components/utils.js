import { userName, userJob, userNameProfile, userJobProfile, openPopup, popupProfile } from "./modal.js";
import { namePlaceInput, linkPlaceInput, renderCard } from "./card.js";
import { settings, hideInputError } from "./validate.js";

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
export { renderInfo, getResponseData, getUserInfo, makeCardForm, checkInputs };