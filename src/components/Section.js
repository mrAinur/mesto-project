export class Section {
  constructor({ items = [], renderer }, selector) {
    this._items = items;
    this.selector = selector;
    this._renderer = renderer;
    this.container = document.querySelector(selector);
  }

  //добавляет все карточки в контейнер
  renderAll(cards, userId) {
    this.container.innerHTML = "";
    cards.forEach((element) => {
      this.container.append(this._renderer(element, userId));
    });
  }

  //Добавляет дом-элемент в контейнер
  addItem(element, userId) {
    this.container.prepend(this._renderer(element, userId));
  }

  //Добавлят информацию о карточках
  setItems(info) {
    return this._items = Array.from(info);
  }

  //Покажет итемы в консоль
  showItems() {
    console.log(this._items);
  }
}