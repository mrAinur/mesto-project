import { userName, userJob, userNameProfile, userJobProfile, openPopup, popupProfile, popupNewCard, closePopup } from "./modal.js";
import { namePlaceInput, linkPlaceInput, renderCard } from "./card.js";

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
    closePopup(popupNewCard);
    evt.target.reset();
    renderInfo(false, evt.target);
}

const checkInputs = (item) => {
    const inputs = Array.from(item.querySelectorAll(".popup__input"));
    return inputs.forEach((input) => {
            input.classList.remove("popup__input_type_error");
            const span = Array.from(item.querySelectorAll(".popup__error"));
            span.forEach((err) => {
                err.classList.remove("popup__error_active");
                err.textContent = ""
            })
    })
}

export { renderInfo, getResponseData, getUserInfo, makeCardForm, checkInputs };