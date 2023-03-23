import "./index.css";
import {
  userNameProfile,
  userJobProfile,
  userAvatar,
  popupProfileOpen,
  popupCardAddOpen,
  formAddCard,
  popupNewCard,
  popupAvatarOpen,
  formAddAvatar,
  popupAvatar,
  profileFormElement,
  popups,
  newCardForm,
  cards,
  settings
} from "./utils/Constants.js";
import {
  openPopup,
  closePopup,
  profileHandleFormSubmit,
  makeNewAvatar,
} from "./components/modal.js";
import FormValidator from "./components/FormValidator.js";
import Api from "./components/Api.js";
import { getUserInfo, makeCardForm, checkInputs, getUserId, makeCards, items } from "./utils/Utils.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { UserInfo } from "./components/UserInfo.js";
import Card from "./components/Card.js";
import Section from "./components/Section.js";


/*Экзепляр запроса Api*/
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/',
  headers: {
    authorization: "a6c9ce5b-7a95-47f3-900e-0e9cffd9e4f4",
    "Content-Type": "application/json"
  }
});

/*Экзепляр карточек*/
const cardsList = new Section({
  items: items, renderer: (item) => {
    const card = new Card(item, "#element");
    const cardElement = card.generate();
    cardsList.setItem(cardElement);
  }
}, cards);

/*Экземпляр формы реадкирования профиля*/
const formEditProfile = new FormValidator(settings, ".popup__form-profile");
formEditProfile.enableValidation()

/*Экземпляр формы добавления карточки*/
const formNewPlace = new FormValidator(settings, ".popup__form-place");
formNewPlace.enableValidation()

/*Экземпляр добавления фотографии пользователя*/
const formEditAvatar = new FormValidator(settings, ".popup__form-avatar");
formEditAvatar.enableValidation();


Promise.all([api.getUserProfile(), api.getCards()])
  .then(([userInfo, cardsInfo]) => {
    userNameProfile.textContent = userInfo.name;
    userJobProfile.textContent = userInfo.about;
    userAvatar.src = `${userInfo.avatar}`;
    getUserId(`${userInfo._id}`);
    makeCards(cardsInfo);
    cardsList.rendererItems();
  })
  .catch((rej) => {
    console.log(`Ошибка ${rej.status}`);
  });
//enableValidation(settings);

/*Добавляем работу кнопки для открытия попапа профиля*/
popupProfileOpen.addEventListener("click", getUserInfo);

/*Добавляем работу кнопки для открытия попапа новой карты места*/
popupCardAddOpen.addEventListener("click", () => {
  formAddCard.reset();
  checkInputs(popupNewCard);
  openPopup(popupNewCard);
});

popupAvatarOpen.addEventListener("click", () => {
  formAddAvatar.reset();
  checkInputs(popupAvatar);
  openPopup(popupAvatar);
})

profileFormElement.addEventListener("submit", profileHandleFormSubmit);

popupAvatar.addEventListener("submit", makeNewAvatar);

/*Добавляем реализацию закрытия попапов*/
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

newCardForm.addEventListener("submit", makeCardForm);

export { api }