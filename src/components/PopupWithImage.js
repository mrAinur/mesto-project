import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image"); //изображение в попапе, определенном по селектору из Popup
    this._title = this._popup.querySelector(".popup__place-name"); //подпись изображения в попапе, определенном по селектору из Popup
  }

  open(name, link) {        //метод для открытия попапа
    this._title.textContent = name;
    this._image.alt = name;
    this._image.src = link;
    super.open();
  }

  close(){
    super.close();
  }

}