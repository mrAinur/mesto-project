export default class UserInfo {
  constructor({ name, about, avatar, rendererUser, rendererAvatar }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
    this._rendererUser = rendererUser;
    this._rendererAvatar = rendererAvatar;
  }

  getUserInfo(item) {
    this._userInfo = this._rendererUser(item);
    return this.setUserInfo(this._userInfo);
  }

  setUserInfo(item) {
    this._name.textContent = item.name;
    this._about.textContent = item.about;
  }

  getUserAvatar(item) {
    this._userAvatar = this._rendererAvatar(item);
    return this.setUserAvatar(this._userAvatar);
  }

  setUserAvatar(item) {
    this._avatar.src = `${item.avatar}`;
  }
}