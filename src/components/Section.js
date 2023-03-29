export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  
  rendererItems(items) { 
    items.reverse().forEach(item => {
      this._renderer(item);
    });
  }
}