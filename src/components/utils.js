function renderInfo(isLoading, item) {
    const loading = item.querySelector(".popup__paragraph");
    if (isLoading) {
        loading.textContent = "Сохранение...";
    } else {
        loading.textContent = "Сохранение";
    }
}

export { renderInfo };