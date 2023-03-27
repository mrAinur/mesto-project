import Popup from "./Popup.js";
//import { formAddAvatar, popupImg, popupName } from "../utils/Constants.js"
//import { formEditAvatar, popupUserInfo, userInformation } from "../index.js";
//import { checkInputs } from "../utils/Utils.js";


export default class PopupWithForm extends Popup {

  constructor({selector, renderer}) {
    super(selector);
    
    this._renderer = renderer;
  }

  _getInputValues() {
    this._inputs = this._popup.querySelectorAll(".popup__input");
    this._objInputs = {};
    this._inputs.forEach((inputElement) => {
    this._objInputs[inputElement.name] = inputElement.value;
    });
    return this._objInputs;
  }

  setEventListeners(){
    super.setEventListeners(this._popup);
    this._popup.addEventListener("submit", (event) => {       //обработчик клика "сохранить" в форме
      event.preventDefault();
      this._inputsValuse = this._getInputValues(); // исполняет функцию сохранения, взяв данные, которые ввели в инпуты формы
      this._renderer(this._inputsValuse);
      this.close(this._popup)
    });
  }

  close(item){
    super.close(item);
    this._popup.querySelector(".form").reset();
  }

}


















//собирает данные импутов формы
/*_getInputValues() {
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

_popupOpen(item, form) {
  if (item === this._popupUserInfo) {
    item.addEventListener("click", () => {
      userInformation.
      checkInputs(item, form);
      open(item);)
  } else {
    item.addEventListener("click", () => {
      form.reset();
      checkInputs(item, form);
      open(item);
    })
  }
}

popupsEventListeners() {
  this._popupOpen(this._popupUserInfo);
  this._popupOpen(this._popupNewCard)
  this._popupOpen(this._popupUserAvatar);

  this._popupClose(this._popupUserInfo);
  this._popupClose(this._popupNewCard)
  this._popupClose(this._popupUserAvatar);

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
}*/