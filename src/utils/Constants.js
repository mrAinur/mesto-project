/*Реализация открытия попапов*/
const popupProfile = document.querySelector(".popup__edit-profile");
const popupNewCard = document.querySelector(".popup__new-place");
const popupAvatar = document.querySelector(".popup__avatar");
const popupProfileOpen = document.querySelector(".profile__edit-button"); //Конпка для открытия попапа профиля
const popupCardAddOpen = document.querySelector(".profile__add-button"); //Конпка для открытия попапа добавления элемента
const popupAvatarOpen = document.querySelector(".profile__avatar-btn");

//Находим форму в DOM
const profileFormElement = document.querySelector(".popup__form-profile");

/*Находим нужные значения форм*/
const nameValue = profileFormElement.querySelector(".popup__name-info");
const jobValue = profileFormElement.querySelector(".popup__job-info");

const cardsContainer = document.querySelector(".elements");

const settings = {
    formSelector: '.form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_active',
    errorParagraph: "popup__paragraph_inactive"
};

export {
    popupProfile,
    popupNewCard,
    popupAvatar,
    popupProfileOpen,
    popupCardAddOpen,
    popupAvatarOpen,
    profileFormElement,
    nameValue,
    jobValue,
    settings,
    cardsContainer,
};