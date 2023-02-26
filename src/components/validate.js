const infoForValidate = {
    formSelector: '.form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error'
};

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(infoForValidate["inputErrorClass"]);
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__error_active");
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(infoForValidate["inputErrorClass"]);
    errorElement.classList.remove("popup__error_active");
    errorElement.textContent = "";
};


const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    const buttonText = buttonElement.querySelector(".popup__paragraph")
    if (hasInvalidInput(inputList)) {
        buttonText.classList.add("popup__paragraph_inactive");
        buttonElement.disabled = true;
        buttonElement.classList.add(infoForValidate["inactiveButtonClass"]);
    } else {
        buttonText.classList.remove("popup__paragraph_inactive");
        buttonElement.disabled = false;
        buttonElement.classList.remove(infoForValidate["inactiveButtonClass"]);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(infoForValidate["inputSelector"]));
    const buttonElement = formElement.querySelector(infoForValidate["submitButtonSelector"]);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(infoForValidate["formSelector"]));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};

export { enableValidation }