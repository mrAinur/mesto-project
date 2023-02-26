import "./index.css";

import { popups, popupNewCard, popupProfile, popupProfileOpen, userName, userJob, popupCardAddOpen, formElement, userNameProfile, userJobProfile, openPopup, closePopup, handleFormSubmit, closeByEscape } from "./components/modal.js";
import { newCardForm, namePlaceInput, linkPlaceInput, makeCards, renderCard } from "./components/card.js";
import { enableValidation } from "./components/validate.js";

makeCards();
enableValidation();

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

formElement.addEventListener("submit", handleFormSubmit);

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

document.addEventListener("keydown", closeByEscape);

newCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newCard = {
    name: namePlaceInput.value,
    link: linkPlaceInput.value,
  };
  renderCard(newCard);
  closePopup(popupNewCard);
  evt.target.reset();
});
