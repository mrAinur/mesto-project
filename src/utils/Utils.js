let userId; //Получаем id пользователя для дальнейшей реализации удаления своих карточек, а так же нахождения ранее лайкнутых фото или удаления лайков
const getUserId = function (id) {
    userId = id;
}
const renderInfo = (isLoading, item) => {
    const loading = item.querySelector(".popup__paragraph");
    if (isLoading) {
        loading.textContent = "Сохранение...";
    } else {
        loading.textContent = "Сохранить";
    }
}

const getResponseData = (res) => {
    if (res.ok) {
        return res = res.json();
    }
}

export { renderInfo, getResponseData, userId, getUserId};