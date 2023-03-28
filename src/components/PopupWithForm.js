import Popup from "./Popup.js";

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