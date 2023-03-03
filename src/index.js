import "./index.css";

import {
  popups, popupNewCard, popupProfile, popupProfileOpen, userName, userJob, popupCardAddOpen, formElement,
  userNameProfile, userJobProfile, popupAvatar, popupAvatarOpen, openPopup, closePopup, handleFormSubmit, makeNewAvatar
} from "./components/modal.js";
import { newCardForm, namePlaceInput, linkPlaceInput, renderCard } from "./components/card.js";
import { enableValidation, settings } from "./components/validate.js";
import { getUserProfile, getCards } from "./components/api.js";

getUserProfile();
getCards();
enableValidation(settings);

/*Добавляем работу кнопки для открытия попапа профиля*/
popupProfileOpen.addEventListener("click", function () {
  userName.value = userNameProfile.textContent;
  userJob.value = userJobProfile.textContent;
  openPopup(popupProfile);
});

/*Добавляем работу кнопки для открытия попапа новой карты места*/
popupCardAddOpen.addEventListener("click", function () {
  openPopup(popupNewCard);
});

popupAvatarOpen.addEventListener("click", function () {
  openPopup(popupAvatar);
})

formElement.addEventListener("submit", handleFormSubmit);

popupAvatar.addEventListener("submit", makeNewAvatar);

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

newCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newCard = {
    name: `${namePlaceInput.value}`,
    link: `${linkPlaceInput.value}`
  };
  renderCard(newCard);
  closePopup(popupNewCard);
  evt.target.reset();
});
