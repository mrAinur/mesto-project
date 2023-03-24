import Popup from "./Popup.js";
import { formAddAvatar, popupImg, popupName } from "../utils/Constants.js"
import { formEditAvatar, popupUserInfo } from "../index.js";
import { checkInputs } from "../utils/Utils.js";


export default class PopupWithForm extends Popup {

  constructor(popupUserInfo, popupUserAvatar, popupUserCard) {
    super();
    this._popupUserInfo = popupUserInfo;
    this._popupNameValue = this._popupUserInfo.querySelector(".popup__name-info");
    this._popupJobValue = this._popupUserInfo.querySelector(".popup__job-info");
    this._popupSubmitBtnUser = this._popupUserInfo.querySelector(".popup__submit");

    this._popupNewCard = popupUserCard;
    this._popupNameValue = this._popupNewCard.querySelector(".popup__name-info");
    this._popupJobValue = this._popupNewCard.querySelector(".popup__job-info");
    this._popupSubmitBtnCard = this._popupNewCard.querySelector(".popup__submit");

    this._popupUserAvatar = popupUserAvatar;
    this._popupAvatarValue = this._popupUserAvatar.querySelector(".popup__place-link");
    this._popupSubmitBtnAvatar = this._popupUserAvatar.querySelector(".popup__submit");

  }

  //собирает данные импутов формы
  _getInputValues() {
    this._objInputs = {};
    this._inputList.forEach((inputElement) => {
      this._objInputs[inputElement.name] = inputElement.value;
    });
    return this._objInputs;
  }

  setEventListeners() {
    super.setEventListeners();       // забирает из родительского класса обработчик закрытия попапа
    this._form.addEventListener("submit", (event) => {       //обработчик клика "сохранить" в форме
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues()); // исполняет функцию сохранения, взяв данные, которые ввели в инпуты формы
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  _handleFormProfile() {
    popupProfileOpen.addEventListener("mousedown", function () {
      this._popupNameValue = infoUser.getUserInfo().name;
      this._popupJobValue = infoUser.getUserInfo().about;
    });
  }

  _popupClose(popup) {
    popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        close(popup);
      }
      if (evt.target.classList.contains("popup__close")) {
        close(popup);
      }
    });
  }

  _popupOpen() {
    this._popupUserAvatar.addEventListener("click", () => {
      formAddAvatar.reset();
      checkInputs(this._popupUserAvatar, formEditAvatar);
      open(this._popupUserAvatar);
    })
  }

  popupsEventListeners() {
    this._popupClose(this._popupUserInfo);
    this._popupClose(this._popupUserAvatar);
    this.__popupOpen(this._popupUserInfo);
    this.__popupOpen(this._popupUserAvatar);
  }

  getUserInfo() {
    return {
      id: this._id,
      name: this._name,
      about: this._about,
      avatar: this._avatar,
    };
  }

  setUserInfo({ name, about, avatar, _id }) {
    //деструктурируем полученный объект
    this._id = _id;
    this._name = name;
    this._about = about;
    this._avatar = avatar;
  }
}