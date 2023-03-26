export class UserInfo {
  constructor({ name, about, avatar, rendererUser, rendererAvatar }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
    this._rendererUser = rendererUser;
    this._rendererAvatar = rendererAvatar;
  }

  getUserInfo(item) {
    this._userInfo = item;
    this._name.textContent = this._userInfo.name;
    this._about.textContent = this._userInfo.about;
  }

  setUserInfo(item) {
    this._rendererUser(item);
  }

  getUserAvatar(item) {
    this._userAvatar = item;
    this._avatar.src = `${this._userAvatar.avatar}`;
  }

  setUserAvatar(item) {
    this._rendererAvatar(item);
  }
}