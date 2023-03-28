export default class FormValidator {
    constructor({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }, selector) {
        this._formSelector = formSelector;
        this._inputSelector = inputSelector;
        this._submitButtonSelector = submitButtonSelector;
        this._inactiveButtonClass = inactiveButtonClass;
        this._inputErrorClass = inputErrorClass;
        this._errorClass = errorClass;
        this._selector = selector;
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _toggleButtonState(inputList, buttonElement) {
        const buttonText = buttonElement.querySelector(".popup__paragraph");
        if (this._hasInvalidInput(inputList)) {
            buttonText.classList.add("popup__paragraph_inactive");
            buttonElement.disabled = true;
            buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            buttonText.classList.remove("popup__paragraph_inactive");
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
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        const buttonElement = formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
        formElement.addEventListener('reset', () => {
            setTimeout(() => {
                this._toggleButtonState(inputList, buttonElement), 0
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