const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "В ожидании нового года",
    link: "https://images.unsplash.com/photo-1577046848358-4623c0859b8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Космос",
    link: "https://images.unsplash.com/photo-1669824137550-7bb7e1a55c9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1998&q=80",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
/*Добавляем работу кнопки для открытия попапа профиля*/
const profileForm = document.querySelector(".popup__edit-profile");
const profileFormButton = document.querySelector(".profile__edit-button");
profileFormButton.addEventListener("click", function () {
  profileForm.classList.add("popup__edit-profile_opened");
});

/*Добавляем работу кнопки для открытия попапа новой карты места*/
const newPlaceForm = document.querySelector(".popup__new-place");
const newPlaceFormButton = document.querySelector(".profile__add-button");
newPlaceFormButton.addEventListener("click", function () {
  newPlaceForm.classList.add("popup__new-place_opened");
});

/*Добавляем реализацию закрытия попапа профиля*/
const profileFormClose = profileForm.querySelector(".popup__close");
profileFormClose.addEventListener("click", function () {
  profileForm.classList.remove("popup__edit-profile_opened");
});
profileForm.addEventListener("click", function (overlayProfile) {
  if (overlayProfile.target === profileForm) {
    profileForm.classList.remove("popup__edit-profile_opened");
  }
});

/*Добавляем реализацию закрытия новой карты места*/
const newPlaceFormClose = newPlaceForm.querySelector(".popup__close");
newPlaceFormClose.addEventListener("click", function () {
  newPlaceForm.classList.remove("popup__new-place_opened");
});
newPlaceForm.addEventListener("click", function (overlayNewPlace) {
  if (overlayNewPlace.target === newPlaceForm) {
    newPlaceForm.classList.remove("popup__new-place_opened");
  }
});

// Находим форму в DOM
const formElement = document.querySelector(".popup__form-profile");
const nameInput = formElement.querySelector(".popup__name-info");
const jobInput = formElement.querySelector(".popup__job-info");

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  let nameValue = formElement.querySelector(".popup__name-info").value;
  let jobValue = formElement.querySelector(".popup__job-info").value;
  // Получите значение полей jobInput и nameInput из свойства value
  let userName = document.querySelector(".profile__user-name");
  let userJob = document.querySelector(".profile__user-job");
  // Выберите элементы, куда должны быть вставлены значения полей
  userName.textContent = nameValue;
  userJob.textContent = jobValue;
  // Вставьте новые значения с помощью textContent
  profileForm.classList.remove("popup__edit-profile_opened");
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

/*Добавление карточек пр помощи innerHTML*/
let cards = document.querySelector(".elements");
function addCards(initialCards) {
  for (let i = 0; i < initialCards.length; i++) {
    cards.insertAdjacentHTML(
      "beforeend",
      `
    <li class="element">
        <img src="${initialCards[i].link}" alt="Фотография пользователя" class="element__place-img">
        <button type="button" class="element__delete"></button>
        <div class="element__text">
          <h2 class="element__place-name">${initialCards[i].name}</h2>
          <button type="button" class="element__heart"></button>
        </div>
    </li>
    `
    );
  }
}
addCards(initialCards);

/*Реализация добавления новых карточек*/
const newCardForm = document.querySelector(".popup__form-place");
const namePlaceInput = newCardForm.querySelector(".popup__place-info");
const linkPlaceInput = newCardForm.querySelector(".popup__place-link"); //сделать обязательные поля ввода 

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function NewCard(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  /*получваем знаения из полей value*/
  let placeValue = newCardForm.querySelector(".popup__place-info").value;
  let linkValue = newCardForm.querySelector(".popup__place-link").value;
  /*передаём значения в массив*/
  let newCard = {
    name: placeValue,
    link: linkValue,
  };
  initialCards.push(newCard);
  /*Создаём новую карту*/
  cards.insertAdjacentHTML(
    "afterbegin",
    `
  <li class="element">
      <img src="${initialCards[initialCards.length-1].link}" alt="Фотография пользователя" class="element__place-img">
      <button type="button" class="element__delete"></button>
      <div class="element__text">
        <h2 class="element__place-name">${initialCards[initialCards.length-1].name}</h2>
        <button type="button" class="element__heart"></button>
      </div>
  </li>
  `
  );

  newPlaceForm.classList.remove("popup__new-place_opened");
}

// Прикрепляем обработчик к форме
// он будет следить за событием “submit” - «отправка»
newCardForm.addEventListener("submit", NewCard);

/*Реализация открытия окна просмотра карточки*/
const card = document.querySelectorAll(".element");
const cardForm = document.querySelector(".popup__view-card");
