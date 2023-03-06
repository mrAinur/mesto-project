import { editUserInfo, editAvatar } from "./api.js";
import { renderInfo, getResponseData, checkInputs } from "./utils.js";

/*Реализация открытия попапов*/
const popups = document.querySelectorAll(".popup");
const popupProfile = document.querySelector(".popup__edit-profile");
const popupNewCard = document.querySelector(".popup__new-place");
const popupAvatar = document.querySelector(".popup__avatar");

const popupProfileOpen = document.querySelector(".profile__edit-button"); //Конпка для открытия попапа профиля
const userName = popupProfile.querySelector(".popup__name-info"); //Находим инпуты
const userJob = popupProfile.querySelector(".popup__job-info");

const popupCardAddOpen = document.querySelector(".profile__add-button"); //Конпка для открытия попапа добавления элемента

const popupAvatarOpen = document.querySelector(".profile__avatar-btn");

//Находим форму в DOM
const profileFormElement = document.querySelector(".popup__form-profile");

/*Находим нужные значения форм*/
const nameValue = profileFormElement.querySelector(".popup__name-info");
const jobValue = profileFormElement.querySelector(".popup__job-info");

//Получите значение полей jobInput и nameInput из свойства value
const userNameProfile = document.querySelector(".profile__user-name");
const userJobProfile = document.querySelector(".profile__user-job");
const userAvatar = document.querySelector(".profile__avatar-img");

/*Открытие попапов*/
const openPopup = (item) => {
    checkInputs(item);
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
    editUserInfo(userInfo)
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
    editAvatar(avatarUrl)
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

export { popups, popupNewCard, popupProfile, popupProfileOpen, userName, userJob, popupCardAddOpen, profileFormElement, userNameProfile, userJobProfile, userAvatar, popupAvatar, popupAvatarOpen, openPopup, closePopup, profileHandleFormSubmit, closeByEscape, makeNewAvatar };