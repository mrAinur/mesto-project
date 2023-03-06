import "./index.css";

import {
  popups, popupNewCard,  popupProfileOpen, popupCardAddOpen, profileFormElement,
  userNameProfile, userJobProfile, popupAvatar, popupAvatarOpen, formAddCard, formAddAvatar, openPopup, closePopup, profileHandleFormSubmit, makeNewAvatar, userAvatar
} from "./components/modal.js";
import { newCardForm, makeCards, getUserId } from "./components/card.js";
import { enableValidation, settings } from "./components/validate.js";
import { getUserProfile, getCards } from "./components/api.js";
import { getUserInfo, makeCardForm, checkInputs } from "./components/utils.js";


Promise.all([getUserProfile(), getCards()])
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