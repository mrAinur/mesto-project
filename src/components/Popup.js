export default class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
    this.popup = document.querySelector(this.popupSelector);
  }

  //метод для открытия попапа
  open() {
    this.popup.classList.add("popup_opened");
    document.addEventListener("click", this._handleEscClose);
  }

  //метод для закрытия попапа
  close() {
    this.popup.classList.remove("popup_opened");
    document.removeEventListener("click", this._handleEscClose);
  }

  //метод для закрытия попапа при нажатии ESC
  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      this._openPopup = document.querySelector(".popup_opened");
      this.close(this._openPopup);
    }
  };

  //метод для навешивания слушателей
  setEventListeners() {
    this.popup.addEventListener("click", (event) => {
      if (event.target.classList.contains("popup_opened")) {
        this.close();
      }
      if (event.target.classList.contains("popup__close")) {
        this.close();
      }
    });
  }
}