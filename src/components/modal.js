/*Реализация открытия попапов*/
const popups = document.querySelectorAll(".popup");
const popupProfile = document.querySelector(".popup__edit-profile");
const popupNewCard = document.querySelector(".popup__new-place");

const popupProfileOpen = document.querySelector(".profile__edit-button"); //Конпка для открытия попапа профиля
const userName = popupProfile.querySelector(".popup__name-info"); //Находим инпуты
const userJob = popupProfile.querySelector(".popup__job-info");

const popupCardAddOpen = document.querySelector(".profile__add-button"); //Конпка для открытия попапа добавления элемента

//Находим форму в DOM
const formElement = document.querySelector(".popup__form-profile");

/*Находим нужные значения форм*/
const nameValue = formElement.querySelector(".popup__name-info");
const jobValue = formElement.querySelector(".popup__job-info");

//Получите значение полей jobInput и nameInput из свойства value
const userNameProfile = document.querySelector(".profile__user-name");
const userJobProfile = document.querySelector(".profile__user-job");

/*Открытие попапов*/
function openPopup(item) {
    item.classList.add("popup_opened");
}

/*Закртыие попапов*/
function closePopup(item) {
    item.classList.remove("popup_opened");
}

function closeByEscape(evt) {
    if(evt.key==="Escape"){
        const openPopup = document.querySelector(".popup_opened");
        closePopup(openPopup);
    }
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
// редактирование профиля
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Выберите элементы, куда должны быть вставлены значения полей

    userNameProfile.textContent = nameValue.value;
    userJobProfile.textContent = jobValue.value;
    // Вставьте новые значения с помощью textContent

    closePopup(popupProfile);
}

export { popups, popupNewCard, popupProfile, popupProfileOpen, userName, userJob, popupCardAddOpen, formElement, userNameProfile, userJobProfile, openPopup, closePopup, handleFormSubmit, closeByEscape };