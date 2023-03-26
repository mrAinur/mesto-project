export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  setItem(element) {
    this._container.append(element);
  }

  rendererItems() { 
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}