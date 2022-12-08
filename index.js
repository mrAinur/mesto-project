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

/*Реализация открытия попапов*/
const popupProfile = document.querySelector(".popup__edit-profile");
const popupNewCard = document.querySelector(".popup__new-place");

const popupProfileOpen = document.querySelector(".profile__edit-button"); // Конпка для открытия попапа профиля
const popupProfileClose = popupProfile.querySelector(".popup__close"); //Кнопка закрытия попапа профиля

const popupCardAddOpen = document.querySelector(".profile__add-button"); // Конпка для открытия попапа добавления элемента
const popupCardClose = popupNewCard.querySelector(".popup__close"); //Кнопка закрытия попапа добавления элемента

const placeCard = document.querySelector(".popup__card"); //Открытие фотокарточки
const placeCardClose = placeCard.querySelector(".popup__card-close"); // Закрытие фотокарточки

/*Открытие попапов*/
function openPopup(item) {
  item.classList.add("popup_opened");
}

/*Добавляем работу кнопки для открытия попапа профиля*/
popupProfileOpen.addEventListener("click", function () {
  openPopup(popupProfile);
});

/*Добавляем работу кнопки для открытия попапа новой карты места*/
popupCardAddOpen.addEventListener("click", function () {
  openPopup(popupNewCard);
});

/*Закртыие попапов*/
function closePopup(item) {
  item.classList.remove("popup_opened");
}

/*Добавляем реализацию закрытия попапа профиля*/
popupProfileClose.addEventListener("click", function () {
  closePopup(popupProfile);
});
popupProfile.addEventListener("click", function (overlayProfile) {
  if (overlayProfile.target === popupProfile) {
    closePopup(popupProfile);
  }
});

/*Добавляем реализацию закрытия новой карты места*/
popupCardClose.addEventListener("click", function () {
  closePopup(popupNewCard);
});
popupNewCard.addEventListener("click", function (overlayNewPlace) {
  if (overlayNewPlace.target === popupNewCard) {
    closePopup(popupNewCard);
  }
});

/*Добавляем реализацию закрытия карты места*/
placeCardClose.addEventListener("click", function () {
  closePopup(placeCard);
});
placeCard.addEventListener("click", function (overlayplaceCard) {
  if (overlayplaceCard.target === placeCard) {
    closePopup(placeCard);
  }
});

// Находим форму в DOM
const formElement = document.querySelector(".popup__form-profile");
const nameInput = formElement.querySelector(".popup__name-info");
const jobInput = formElement.querySelector(".popup__job-info");

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
// редактирование профиля
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
  popupProfile.classList.remove("popup_opened");
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

/*Добавление карточек*/
let cards = document.querySelector(".elements");
initialCards.forEach(function (item) {
  const cardElement = document.querySelector("#element").content;
  const card = cardElement.querySelector(".element").cloneNode(true);
  card.querySelector(".element__place-img").src = item.link;
  card.querySelector(".element__place-name").textContent = item.name;
  cards.append(card);

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
      const popupCard = document.querySelector(".popup__card");
      popupCard.classList.add("popup_opened");
      popupCard.querySelector(".popup__image").src = item.link;
      popupCard.querySelector(".popup__place-name").textContent = item.name;
    });
});

/*Поиск всех карт*/
let cardsPlace = document.querySelectorAll(".element");
const popupCard = document.querySelector(".popup__card");

/*Реализация добавления новых карточек*/
const newCardForm = document.querySelector(".popup__form-place");
const namePlaceInput = newCardForm.querySelector(".popup__place-info");
const linkPlaceInput = newCardForm.querySelector(".popup__place-link"); //сделать обязательные поля ввода

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
// Новая карта
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
  const cardElement = document.querySelector("#element").content;
  const card = cardElement.querySelector(".element").cloneNode(true);
  card.querySelector(".element__place-img").src =
    initialCards[initialCards.length - 1].link;
  card.querySelector(".element__place-name").textContent =
    initialCards[initialCards.length - 1].name;
  cards.prepend(card);

  /*Открываем новую карту*/
  card
    .querySelector(".element__place-img")
    .addEventListener("click", function (evt) {
      const cardInfo = evt.target; 
      openCard(cardInfo);
    });
  /*Реализация лайка*/
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

  popupNewCard.classList.remove("popup_opened");
}

// Прикрепляем обработчик к форме
// он будет следить за событием “submit” - «отправка»
newCardForm.addEventListener("submit", NewCard);
function openCard(evt) {
  const cardInfo = evt; //проверяем верность записи
  const popupCard = document.querySelector(".popup__card");
  const popupImg = popupCard.querySelector(".popup__image"); //находим в попапе нужный нам класс
  popupImg.src = cardInfo.src; //присваиваем значение картинки в попап
  const cardDiv = cardInfo.parentElement;
  const cardName =  cardDiv.querySelector(".element__place-name")//находим у ближайшего соседа от кликнутого элемента нужный нам элемент по классу;
  const popupName = popupCard.querySelector(".popup__place-name"); //находим в попапе элемент для записи названия
  popupName.textContent = cardName.textContent;
  openPopup(popupCard); //открываем попап
}
