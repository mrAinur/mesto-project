import { api } from "../index.js";
import { getResponseData } from "../utils/Utils.js";
import popupWithForm from "./PopupWithForm.js";
export class UserInfo {
  constructor({ name, about, avatar, rendererUser, rendererAvatar }) {

    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
    this._rendererUser = rendererUser;
    this._rendererAvatar = rendererAvatar;
  }

  getUserInfo(item) {
    this._rendererUser(item);
  }

  setUserInfo(item) {
    console.log(item);
    this._userInfo = this.getUserInfo(item);
    this._name.textContent = this._userInfo.name;
    this._about.textContent = this._userInfo.about;
  }

  getUserAvatar(item) {
    this._rendererAvatar(item);
  }

  setUserAvatar(item) {
    this._userAvatar = this.getUserAvatar(item);
    this._avatar.src = `${this._userAvatar.avatar}`
  }

  startUserInfo(item) {
    this._userInfo = item;
    this._name.textContent = this._userInfo.name,
    this._about.textContent = this._userInfo.about,
    this._avatar.src = `${this._userInfo.avatar}`
  }
}