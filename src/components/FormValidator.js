export default class FormValidator {
    constructor({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, errorParagraph }, selector) {
        this._formSelector = formSelector;
        this._inputSelector = inputSelector;
        this._submitButtonSelector = submitButtonSelector;
        this._inactiveButtonClass = inactiveButtonClass;
        this._inputErrorClass = inputErrorClass;
        this._errorClass = errorClass;
        this._selector = selector;
        this._errorParagraph = errorParagraph;
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            this._buttonText.classList.add(this._errorParagraph);
            buttonElement.disabled = true;
            buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            this._buttonText.classList.remove(this._errorParagraph);
            buttonElement.disabled = false;
            buttonElement.classList.remove(this._inactiveButtonClass);
        }
    };

    _showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    };

    _checkInputValidity(formElement, inputElement) {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity("");
        }

        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this.hideInputError(formElement, inputElement);
        }
    };

    _setEventListeners(formElement) {
        this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = formElement.querySelector(this._submitButtonSelector);
        this._buttonText = this._buttonElement.querySelector(".popup__paragraph");

        this._toggleButtonState(this._inputList, this._buttonElement);
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement);
                this._toggleButtonState(this._inputList, this._buttonElement);
            });
        });
        formElement.addEventListener('reset', () => {
            setTimeout(() => {
                this._toggleButtonState(this._inputList, this._buttonElement), 0
            })
        })
    }

    _getForm(){
        const formElement = document.querySelector(this._selector);
        return formElement;
    }

    enableValidation() {
        this._formElement = this._getForm()
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners(this._formElement);
        return this._formElement;
    }
}