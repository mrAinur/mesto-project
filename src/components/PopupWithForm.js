import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({selector, renderer, hideInputError}) {
    super(selector);
    this._renderer = renderer;
    this._hideInputError = hideInputError;
    this._inputs = this._popup.querySelectorAll(".popup__input");
    this._form = this._popup.querySelector(".form");
  }

  _getInputValues() {
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
    });
  }

  close(){
    super.close();
    this._hideInputError(this._popup);
    this._form.reset();
  }
}