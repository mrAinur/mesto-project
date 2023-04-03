let userId; //Получаем id пользователя для дальнейшей реализации удаления своих карточек, а так же нахождения ранее лайкнутых фото или удаления лайков
const getUserId = function (id) {
    userId = id;
}

export {
    userId, 
    getUserId};