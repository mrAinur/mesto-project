import "./index.css";

import {
  popups, popupNewCard, popupProfile, popupProfileOpen, userName, userJob, popupCardAddOpen, formElement,
  userNameProfile, userJobProfile, popupAvatar, popupAvatarOpen, openPopup, closePopup, handleFormSubmit, makeNewAvatar, userAvatar
} from "./components/modal.js";
import { newCardForm, namePlaceInput, linkPlaceInput, renderCard, makeCards, getUserId } from "./components/card.js";
import { enableValidation, settings } from "./components/validate.js";
import { getUserProfile, getCards } from "./components/api.js";
import { renderInfo } from "./components/utils.js";


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
  });;
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
  renderInfo(true, evt.target);
  evt.preventDefault();
  const newCard = {
    name: `${namePlaceInput.value}`,
    link: `${linkPlaceInput.value}`
  };
  renderCard(newCard);
  closePopup(popupNewCard);
  evt.target.reset();
  renderInfo(false, evt.target);
});
