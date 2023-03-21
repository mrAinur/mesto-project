import {
    nameValue,
    jobValue,
    userNameProfile,
    userJobProfile,
    userAvatar,
    popupProfile,
    popupAvatar
} from "../utils/Constants.js"

import { api } from "./Api.js";

import { renderInfo, getResponseData } from "../utils/Utils.js";

/*Открытие попапов*/
const openPopup = (item) => {
    item.classList.add("popup_opened");
    document.addEventListener("keydown", closeByEscape);
}

/*Закртыие попапов*/
const closePopup = (item) => {
    item.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeByEscape);
}

const closeByEscape = (evt) => {
    if (evt.key === "Escape") {
        const openPopup = document.querySelector(".popup_opened");
        closePopup(openPopup);
    }
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
// редактирование профиля
const profileHandleFormSubmit = (evt) => {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Выберите элементы, куда должны быть вставлены значения полей
    const userInfo = {
        name: nameValue.value,
        about: jobValue.value
    }
    api.editUserInfo(userInfo)
        .then((res) => {
            return getResponseData(res)
        })
        .then((obj) => {
            userNameProfile.textContent = obj.name;
            userJobProfile.textContent = obj.about;
            closePopup(popupProfile);
        })
        .catch((rej) => {
            console.log(`Ошибка ${rej.status}`);
        });
}

const makeNewAvatar = (evt) => {
    renderInfo(true, evt.target);
    evt.preventDefault();
    const avatar = popupAvatar.querySelector(".popup__input").value;
    const avatarUrl = {
        avatar: avatar
    };
    api.editAvatar(avatarUrl)
        .then((res) => {
            return getResponseData(res)
        })
        .then((obj) => {
            userAvatar.src = `${obj.avatar}`;
            closePopup(popupAvatar);
            evt.target.reset();
        })
        .catch((rej) => {
            console.log(`Ошибка ${rej.status}`);
        })
        .finally(() => {
            renderInfo(false, evt.target);
        });
}

export { openPopup, closePopup, profileHandleFormSubmit, closeByEscape, makeNewAvatar };