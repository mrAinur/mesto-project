import "./index.css";
import {
  popupProfileOpen,
  popupCardAddOpen,
  popupNewCard,
  popupAvatarOpen,
  popupAvatar,
  cards,
  settings,
  popupProfile,
  cardsContainer
} from "./utils/Constants.js";
import FormValidator from "./components/FormValidator.js";
import Api from "./components/Api.js";
import { getUserId, renderInfo } from "./utils/Utils.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import UserInfo from "./components/UserInfo.js";
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

/*Экземпляр формы реадкирования профиля*/
const formEditProfile = new FormValidator(settings, ".popup__form-profile");
formEditProfile.enableValidation();

/*Экземпляр формы добавления карточки*/
const formNewCard = new FormValidator(settings, ".popup__form-place");
formNewCard.enableValidation();

/*Экземпляр добавления фотографии пользователя*/
const formEditAvatar = new FormValidator(settings, ".popup__form-avatar");
formEditAvatar.enableValidation();

/*Экземпляр работы попапа изменения данных пользователя*/
const popupUserInfo = new PopupWithForm({
  selector: ".popup__edit-profile", renderer: (item) => {
    userInformation.getUserInfo(item)
  }, hideInputError: (item) => {
    const form = item.querySelector(".form");
    const inupts = Array.from(form.querySelectorAll(".popup__input"));
    inupts.forEach((input) => {
      formEditProfile.hideInputError(form, input)
    });
  }
});
popupUserInfo.setEventListeners();

/*Экземпляр работы попапа добавления новой карточки*/
const popupNewPlace = new PopupWithForm({
  selector: ".popup__new-place", renderer: (item) => {
    renderInfo(true, popupNewCard);
    api.makeNewCard(item)
      .then((res) => {
        const arr = [res];
        const cardsList = new Section({
          items: arr, renderer: (item) => {
            const card = new Card(item, "#element",
              function addLike(id) {
                api.addLike(id)
                  .then((obj) => {
                    card.putLike(obj);
                  })
                  .catch((rej) => {
                    console.log(`Ошибка ${rej.status}`);
                  });
              },
              function deleteLike(id) {
                api.deleteLike(id)
                  .then((obj) => {
                    card.removeLike(obj);
                  })
                  .catch((rej) => {
                    console.log(`Ошибка ${rej.status}`);
                  });
              },
              function deleteCard(id) {
                api.deleteCard(id)
                  .then(res => {
                    if (res.ok) {
                      card.removeCard();
                    }
                  })
                  .catch((rej) => {
                    console.log(`Ошибка ${rej.status}`);
                  });
              });
            const cardElement = card.generate();
            cardsContainer.prepend(cardElement);
          }
        }, cards);
        cardsList.rendererItems();
        popupNewPlace.close();
      })
      .catch((rej) => {
        console.log(`Ошибка ${rej.status}`);
      })
      .finally(() => {
        renderInfo(false, popupNewCard);

      });
  }, hideInputError: (item) => {
    const form = item.querySelector(".form");
    const inupts = Array.from(form.querySelectorAll(".popup__input"));
    inupts.forEach((input) => {
      formEditProfile.hideInputError(form, input)
    });
  }
});
popupNewPlace.setEventListeners();

/*Экземпляр работы попапа изменения аватара пользователя*/
const popupUserAvatar = new PopupWithForm({
  selector: ".popup__avatar", renderer: (item) => {
    userInformation.getUserAvatar(item)
  },
  hideInputError: (item) => {
    const form = item.querySelector(".form");
    const inupts = Array.from(form.querySelectorAll(".popup__input"));
    inupts.forEach((input) => {
      formEditProfile.hideInputError(form, input)
    });
  }
});
popupUserAvatar.setEventListeners();

/*Экзепляр попапа открытия карточки*/
const openCardPopup = new PopupWithImage(".popup__card");
openCardPopup.setEventListeners();

/*Работа с изменениями данных пользователя*/
const userInformation = new UserInfo({
  name: ".profile__user-name", about: ".profile__user-job", avatar: ".profile__avatar-img", rendererUser: (item) => {
    renderInfo(true, popupProfile);
    api.editUserInfo(item)
      .then((res) => {
        userInformation.setUserInfo(res);
        popupUserInfo.close()
      })
      .catch((rej) => {
        console.log(`Ошибка ${rej.status}`);
      })
      .finally(() => {
        renderInfo(false, popupProfile);
      });
  }, rendererAvatar: (item) => {
    renderInfo(true, popupAvatar);
    api.editAvatar(item)
      .then((res) => {
        userInformation.setUserAvatar(res);
        popupUserAvatar.close();
      })
      .catch((rej) => {
        console.log(`Ошибка ${rej.status}`);
      })
      .finally(() => {
        renderInfo(false, popupAvatar);
      });
  }
})

Promise.all([api.getUserProfile(), api.getCards()])
  .then(([userInfo, cardsInfo]) => {
    userInformation.setUserInfo(userInfo);
    userInformation.setUserAvatar(userInfo);
    getUserId(`${userInfo._id}`)

    /*Экзепляр карточек*/
    const cardsList = new Section({
      items: cardsInfo, renderer: (item) => {
        const card = new Card(item, "#element",
          function addLike(id) {
            api.addLike(id)
              .then((obj) => {
                card.putLike(obj);
              })
              .catch((rej) => {
                console.log(`Ошибка ${rej.status}`);
              });
          },
          function deleteCard(id) {
            api.deleteLike(id)
              .then((obj) => {
                card.removeLike(obj);
              })
              .catch((rej) => {
                console.log(`Ошибка ${rej.status}`);
              });
          },
          function deleteCard(id) {
            api.deleteCard(id)
              .then(res => {
                if (res.ok) {
                  card.removeCard();
                }
              })
              .catch((rej) => {
                console.log(`Ошибка ${rej.status}`);
              });
          },
          function openCard(name, link) {
            openCardPopup.open(name, link)
          });
        const cardElement = card.generate();
        cardsList.setItem(cardElement);
      }
    }, cards);
    cardsList.rendererItems();
  })
  .catch((rej) => {
    console.log(`Ошибка ${rej.status}`);
  });

/*Добавляем работу кнопки для открытия попапа профиля*/
popupProfileOpen.addEventListener("click", () => popupUserInfo.open(popupProfile));

/*Добавляем работу кнопки для открытия попапа новой карты места*/
popupCardAddOpen.addEventListener("click", () => {
  popupNewPlace.open(popupNewCard)
});

popupAvatarOpen.addEventListener("click", () => popupUserAvatar.open(popupAvatar));