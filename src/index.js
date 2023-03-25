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
  settings,
  userName,
  userJob,
  profileSelectors,
  popupProfile,
} from "./utils/Constants.js";
import {
  openPopup,
  closePopup,
  profileHandleFormSubmit,
  makeNewAvatar,
} from "./components/modal.js";
import FormValidator from "./components/FormValidator.js";
import Api from "./components/Api.js";
import { getUserInfo, makeCardForm, checkInputs, getUserId, makeCards, items, renderInfo } from "./utils/Utils.js";
import  PopupWithForm  from "./components/PopupWithForm.js";
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
/*const cardsList = new Section({
  items: items, renderer: (item) => {
    const card = new Card(item, "#element");
    const cardElement = card.generate();
    cardsList.setItem(cardElement);
  }
}, cards);*/

/*Экземпляр формы реадкирования профиля*/
const formEditProfile = new FormValidator(settings, ".popup__form-profile");
formEditProfile.enableValidation()

/*Экземпляр формы добавления карточки*/
const formNewCard = new FormValidator(settings, ".popup__form-place");
formNewCard.enableValidation()

/*Экземпляр добавления фотографии пользователя*/
const formEditAvatar = new FormValidator(settings, ".popup__form-avatar");
formEditAvatar.enableValidation();


const userInformation = new UserInfo({
  userNameProfile: ".profile__user-name",
  userJobProfile: ".profile__user-job",
  userAvatar: ".profile__avatar-img",
}, (objInputs) => {                  // активировать попап для редактирования профиля
  renderInfo(true, popupProfileOpen);
  api
    .editUserInfo(objInputs.userName, objInputs.userJob)
    .then((result) => {
      infoUser.setUserInfo(result);
      popupWithForm.close();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      renderInfo(false, popupProfileOpen);
    });
});


Promise.all([api.getUserProfile(), api.getCards()])
  .then(([userInfo, cardsInfo]) => {
    userInformation.getUserInfo(userInfo);
    getUserId(`${userInfo._id}`);

    /*makeCards(cardsInfo);*/

    /*Экзепляр карточек*/
    const cardsList = new Section({
      items: cardsInfo, renderer: (item) => {
        const card = new Card(item, "#element");
        const cardElement = card.generate();
        cardsList.setItem(cardElement);
      }
    }, cards);
    cardsList.rendererItems();
  })
  .catch((rej) => {
    console.log(`Ошибка ${rej.status}`);
  });
//enableValidation(settings);

/*Добавляем работу кнопки для открытия попапа профиля*/
//popupProfileOpen.addEventListener("click", getUserInfo);         поправил сейчас

/*Добавляем работу кнопки для открытия попапа новой карты места*/
popupCardAddOpen.addEventListener("click", () => {
  formAddCard.reset();
  checkInputs(popupNewCard, formNewCard);
  openPopup(popupNewCard);
});

popupAvatarOpen.addEventListener("click", () => {
  formAddAvatar.reset();
  checkInputs(popupAvatar, formEditAvatar);
  openPopup(popupAvatar);
});

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












//const infoUser = new UserInfo(profileSelectors);
//экземпляр класса для открытия попапа аватара
// const popupImage = new PopupWithImage(".popup__card");
// const popupFormAvatar = new PopupWithForm(".popup__avatar", (objInputs) => {
//   renderInfo(true, popupAvatarOpen);
//   api
//     .editAvatar(objInputs.avatarProfile)
//     .then((result) => {
//       infoUser.setUserInfo(result);
//       popupFormAvatar.close();
//     })
//     .catch((err) => console.log(`Ошибка: ${err}`))
//     .finally(() => {
//       renderInfo(false, popupAvatarOpen);
//     });
// });
// popupImage.setEventListeners();
// popupFormAvatar.setEventListeners();
// popupAvatarOpen.addEventListener("mousedown", function () {
//   popupFormAvatar.open();
//   formEditAvatar.enableValidation();
// });



/*Экземпляр работы попапов*/
const popupWithForm = new PopupWithForm(popupProfile, popupNewCard, popupAvatar);






export { api, formEditProfile, formEditAvatar }