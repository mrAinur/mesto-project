export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  //метод для открытия попапа
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  //метод для закрытия попапа
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  //метод для закрытия попапа при нажатии ESC
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this._openPopup = document.querySelector(".popup_opened");
      this.close(this._openPopup);
    }
  };

  //метод для навешивания слушателей
  setEventListeners(item) {
    item.addEventListener("mousedown", (event) => {
      if (event.target.classList.contains("popup_opened")) {
        this.close();
      }
      if (event.target.classList.contains("popup__close")) {
        this.close();
      }
    });
  }
}