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
  settings
} from "./utils/Constants.js";

import {
  openPopup,
  closePopup,
  profileHandleFormSubmit,
  makeNewAvatar,
} from "./components/modal.js";

import { makeCards, getUserId } from "./components/Card.js";

import { enableValidation } from "./components/FormValidator.js";

import { api } from "./components/Api.js";

import { getUserInfo, makeCardForm, checkInputs } from "./utils/Utils.js";

Promise.all([api.getUserProfile(), api.getCards()])
  .then(([userInfo, cardsInfo]) => {
    userNameProfile.textContent = userInfo.name;
    userJobProfile.textContent = userInfo.about;
    userAvatar.src = `${userInfo.avatar}`;
    getUserId(`${userInfo._id}`);
    makeCards(cardsInfo);
  })
  .catch((rej) => {
    console.log(`Ошибка ${rej.status}`);
  });
enableValidation(settings);

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