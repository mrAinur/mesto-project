export default class UserInfo {
  constructor({ name, about, avatar, rendererUser, rendererAvatar }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
    this._rendererUser = rendererUser;
    this._rendererAvatar = rendererAvatar;
  }

  getUserInfo(item) {
    return this._rendererUser(item);
  }

  setUserInfo(item) {
    this._name.textContent = item.name;
    this._about.textContent = item.about;
  }

  setPopupValue() {
    this._userInfo = {
      name: this._name.textContent,
      info: this._about.textContent
    }
    return this._userInfo
  }

  getUserAvatar(item) {
    return this._rendererAvatar(item);
  }

  setUserAvatar(item) {
    this._avatar.src = `${item.avatar}`;
  }
}