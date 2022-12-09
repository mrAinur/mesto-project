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

//Нахождение всех переменных

/*Реализация открытия попапов*/
const popups = document.querySelectorAll(".popup");
const popupProfile = document.querySelector(".popup__edit-profile");
const popupNewCard = document.querySelector(".popup__new-place");

const popupProfileOpen = document.querySelector(".profile__edit-button"); //Конпка для открытия попапа профиля
const popupProfileClose = popupProfile.querySelector(".popup__close"); //Кнопка закрытия попапа профиля
let userName = popupProfile.querySelector(".popup__name-info"); //Находим инпуты
let userJob = popupProfile.querySelector(".popup__job-info");

const popupCardAddOpen = document.querySelector(".profile__add-button"); //Конпка для открытия попапа добавления элемента
const popupCardClose = popupNewCard.querySelector(".popup__close"); //Кнопка закрытия попапа добавления элемента

const placeCard = document.querySelector(".popup__card"); //Открытие фотокарточки
const placeCardClose = placeCard.querySelector(".popup__close"); //Закрытие фотокарточки
const popupImg = placeCard.querySelector(".popup__image"); //находим в попапе нужный нам класс
const popupName = placeCard.querySelector(".popup__place-name"); //находим в попапе элемент для записи названия

//Находим форму в DOM
const formElement = document.querySelector(".popup__form-profile");

/*Находим нужные значения форм*/
const nameValue = formElement.querySelector(".popup__name-info");
const jobValue = formElement.querySelector(".popup__job-info");

//Получите значение полей jobInput и nameInput из свойства value
const userNameProfile = document.querySelector(".profile__user-name");
const Profile = document.querySelector(".profile__user-job");

//Находим форму карточек и копируем в переменную
let cards = document.querySelector(".elements");
const cardElement = document.querySelector("#element").content;

/*Поиск всех карт*/
let cardsPlace = document.querySelectorAll(".element");
const popupCard = document.querySelector(".popup__card");

/*Реализация добавления новых карточек*/
const newCardForm = document.querySelector(".popup__form-place");
const namePlaceInput = newCardForm.querySelector(".popup__place-info");
const linkPlaceInput = newCardForm.querySelector(".popup__place-link"); 


/*Реализация всех функций*/

/*Открытие попапов*/
function openPopup(item) {
  item.classList.add("popup_opened");
}

/*Добавляем работу кнопки для открытия попапа профиля*/
popupProfileOpen.addEventListener("click", function () {
  userName = userName.value;
  userJob = userJob.value;
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

/*Добавляем реализацию закрытия попапов (и вправду удобно)*/
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});


// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
// редактирование профиля
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Выберите элементы, куда должны быть вставлены значения полей

  userNameProfile.textContent = nameValue.value;
  Profile.textContent = jobValue.value;
  // Вставьте новые значения с помощью textContent

  closePopup(popupProfile);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

/*Добавление карточек*/
initialCards.forEach(function (item) {
  createCard(item);
});

/*Создание новой карточки*/
function createCard(item) {
    const card = cardElement.querySelector(".element").cloneNode(true);
    card.querySelector(".element__place-img").src = item.link;
    card.querySelector(".element__place-img").alt = item.name;
    card.querySelector(".element__place-name").textContent = item.name;
    cards.prepend(card);
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
      placeCard.classList.add("popup_opened");
      popupImg.src = item.link;
      popupName.textContent = item.name;
    });
  return cardElement;
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет, Новая карта
// Прикрепляем обработчик к форме
// он будет следить за событием “submit” - «отправка»
newCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  let newCard = {
    name: namePlaceInput.value,
    link: linkPlaceInput.value,
  };
  createCard(newCard);
  closePopup(popupNewCard);
  namePlaceInput.value = "";
  linkPlaceInput.value = "";
});

//Открытие карточек в попапе
function openCard(evt) {
  const cardInfo = evt; 
  popupImg.src = cardInfo.src; //присваиваем значение картинки в попап
  const cardDiv = cardInfo.closest;
  const cardName = cardDiv.querySelector(".element__place-name"); //находим у ближайшего соседа от кликнутого элемента нужный нам элемент по классу;
  popupName.textContent = cardName.textContent;
  openPopup(placeCard); //открываем попап
}
