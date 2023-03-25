import { api } from "../index.js"
export class UserInfo {
  constructor({ userNameProfile, userJobProfile, userAvatar }) {
    /*Информация о пользователе, лежащая в HTML*/
    this._name = document.querySelector(userNameProfile);
    this._about = document.querySelector(userJobProfile);
    this._avatar = document.querySelector(userAvatar);
  }

  setUserInfo(userInfo) {
    api.editUserInfo(userInfo)
      .then((res) => {
        return getResponseData(res)
      })
      .then((obj) => {
        this._name.textContent = obj.name;
        this._about.textContent = obj.about;
        closePopup(popupProfile);
      })
      .catch((rej) => {
        console.log(`Ошибка ${rej.status}`);
      });
  }

  getUserInfo({ name, about, avatar }) {
      this._name.textContent = name,
      this._about.textContent = about,
      this._avatar.src = `${avatar}`
  }

}