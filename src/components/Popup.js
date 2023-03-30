export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //метод для открытия попапа
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose);
  }

  //метод для закрытия попапа
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //метод для закрытия попапа при нажатии ESC
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  //метод для навешивания слушателей
  setEventListeners() {
    document.addEventListener("mousedown", () => {
      if (this._popup.classList.contains("popup_opened")) {
        this.close();
      }
      if (this._popup.classList.contains("popup__close")) {
        this.close();
      }
    });
  }
}