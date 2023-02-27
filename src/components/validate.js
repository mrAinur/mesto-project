const settings = {
    formSelector: '.form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_active'
};

const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings["inputErrorClass"]); //понял как надо, спасибо!
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings["errorClass"]);
};

const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings["inputErrorClass"]);
    errorElement.classList.remove(settings["errorClass"]);
    errorElement.textContent = "";
};


const checkInputValidity = (formElement, inputElement, settings) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
    const buttonText = buttonElement.querySelector(".popup__paragraph")
    if (hasInvalidInput(inputList)) {
        buttonText.classList.add("popup__paragraph_inactive");
        buttonElement.disabled = true;
        buttonElement.classList.add(settings["inactiveButtonClass"]);
    } else {
        buttonText.classList.remove("popup__paragraph_inactive");
        buttonElement.disabled = false;
        buttonElement.classList.remove(settings["inactiveButtonClass"]);
    }
};

const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings["inputSelector"]));
    const buttonElement = formElement.querySelector(settings["submitButtonSelector"]);
    toggleButtonState(inputList, buttonElement, settings);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, settings);
            toggleButtonState(inputList, buttonElement, settings);
        });
    });
    formElement.addEventListener('reset', () => { 
        setTimeout(() => {  
            toggleButtonState(inputList, buttonElement, settings), 0
        })
    })
};

const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings["formSelector"]));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, settings);
    });
};

export { enableValidation, settings }