import { openPopup } from "./modal.js";
import { makeNewCard, deleteCard, addLike, deleteLike, getCards } from "./api.js";

const placeCard = document.querySelector(".popup__card"); //Открытие фотокарточки
const popupImg = placeCard.querySelector(".popup__image"); //находим в попапе нужный нам класс
const popupName = placeCard.querySelector(".popup__place-name"); //находим в попапе элемент для записи названия

//Находим форму карточек и копируем в переменную
const cards = document.querySelector(".elements");
const cardElement = document.querySelector("#element").content;

/*Реализация добавления новых карточек*/
const newCardForm = document.querySelector(".popup__form-place");
const namePlaceInput = newCardForm.querySelector(".popup__place-info");
const linkPlaceInput = newCardForm.querySelector(".popup__place-link");

let userId; //Получаем id пользователя для дальнейшей реализации удаления своих карточек, а так же нахождения ранее лайкнутых фото или удаления лайков
const getUserId = (id) => {
    userId = id;
}

function createCard(item) {
    const card = cardElement.querySelector(".element").cloneNode(true);
    card.querySelector(".element__place-img").src = item.link;
    card.querySelector(".element__place-img").alt = item.name;
    card.querySelector(".element__place-name").textContent = item.name;
    const numLikes = card.querySelector(".element__num-likes");
    numLikes.textContent = item.likes.length;

    /*Проверяем лайкал ли ранее пользователь данную карту*/
    item.likes.forEach((user) => {
        if (user._id === userId) {
            const heart = card.querySelector(".element__heart");
            heart.classList.add("element__heart_active");
        }
    })

    /*Реализация кнопки лайка*/
    card
        .querySelector(".element__heart")
        .addEventListener("click", function (evt) {
            const idCard = `${item._id}`;
            if (!(evt.target.classList === `element__heart_active`)) {
                addLike(idCard)
                    .then(res => {
                        if (res.ok) {
                            return res = res.json();
                        }
                    })
                    .then((obj) => {
                        numLikes.textContent = obj.likes.length;
                        evt.target.classList.add("element__heart_active");
                    })
                    .catch((rej) => {
                        console.log(`Ошибка ${rej.status}`);
                    });
            } else {
                deleteLike(idCard)
                    .then(res => {
                        if (res.ok) {
                            return res = res.json();
                        }
                    })
                    .then((obj) => {
                        console.log(obj);
                        evt.target.classList.remove("element__heart_active");
                        numLikes.textContent = obj.likes.length;
                    })
                    .catch((rej) => {
                        console.log(`Ошибка ${rej.status}`);
                    });
            }
        });

    /*Реализация удаления карты*/
    const cardDel = card.querySelector(".element__delete");
    if (item.owner._id === userId) {
        cardDel.addEventListener("click", (evt) => {
            const idCard = `${item._id}`;
            deleteCard(idCard)
                .then(res => {
                    if (res.ok) {
                        evt.target.parentElement.remove();
                    }
                })
                .catch((rej) => {
                    console.log(`Ошибка ${rej.status}`);
                });
        });
    } else {
        cardDel.remove();
    }

    /*Реализация открытия карточки*/
    card
        .querySelector(".element__place-img")
        .addEventListener("click", function () {
            popupImg.src = item.link;
            popupImg.alt = item.name;
            popupName.textContent = item.name;
            openPopup(placeCard);
        });
    return card;
}

/*Добавление карточек*/
function makeCards(obj) {
    obj.forEach(function (item) {
        cards.append(createCard(item))
    });
}

/*Вставка новой карточки в Дом*/
function renderCard(item) {
    const cards = Array.from(document.querySelectorAll(".element"));
    cards.forEach((item) => {
        item.remove();
    });
    makeNewCard(item)
        .then(res => {
            if (res.ok) {
                return res = res.json();
            }
        })
        .then((res) => {
            getCards()
                .then((res) => {
                    makeCards(res)
                })
                .catch((rej) => {
                    console.log(`Ошибка ${rej.status}`);
                })
        })
        .catch((rej) => {
            console.log(`Ошибка ${rej.status}`);
        });
}

export { userId, newCardForm, namePlaceInput, linkPlaceInput, makeCards, renderCard, createCard, getUserId };