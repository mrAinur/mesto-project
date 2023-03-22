import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.image = this.popup.querySelector(".popup__image"); //изображение в попапе, определенном по селектору из Popup
    this.title = this.popup.querySelector(".popup__place-name"); //подпись изображения в попапе, определенном по селектору из Popup
  }

  open(name, link) {        //метод для открытия попапа
    this.title.textContent = name;
    this.image.alt = name;
    this.image.src = link;
    super.open();
  }
}