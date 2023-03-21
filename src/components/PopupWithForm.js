import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this.popup.querySelector(".form");
    this._submitButton = this._form.querySelector(".popup__paragraph");
    this._inputList = this._form.querySelectorAll(".popup__input");
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
}