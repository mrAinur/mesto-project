/*Реализация открытия попапов*/
const popups = document.querySelectorAll(".popup");
const popupProfile = document.querySelector(".popup__edit-profile");
const popupNewCard = document.querySelector(".popup__new-place");
const popupAvatar = document.querySelector(".popup__avatar");

const formAddCard = document.querySelector(".popup__form-place");
const formAddAvatar = document.querySelector(".popup__form-avatar");

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

const placeCard = document.querySelector(".popup__card"); //Открытие фотокарточки
const popupImg = placeCard.querySelector(".popup__image"); //находим в попапе нужный нам класс
const popupName = placeCard.querySelector(".popup__place-name"); //находим в попапе элемент для записи названия

//Находим форму карточек и копируем в переменную
const cards = ".elements";
const cardElement = document.querySelector("#element").content;

/*Реализация добавления новых карточек*/
const newCardForm = document.querySelector(".popup__form-place");
const namePlaceInput = newCardForm.querySelector(".popup__place-info");
const linkPlaceInput = newCardForm.querySelector(".popup__place-link");

const cohortId = "plus-cohort-20";

const settings = {
    formSelector: '.form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_active'
};

export {
    popups,
    popupProfile,
    popupNewCard,
    popupAvatar,
    formAddCard,
    formAddAvatar,
    popupProfileOpen,
    userName,
    userJob,
    popupCardAddOpen,
    popupAvatarOpen,
    profileFormElement,
    nameValue,
    jobValue,
    userNameProfile,
    userJobProfile,
    userAvatar,
    placeCard,
    popupImg,
    popupName,
    cards,
    cardElement,
    newCardForm,
    namePlaceInput,
    linkPlaceInput,
    settings,
    cohortId
};