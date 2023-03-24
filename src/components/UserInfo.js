export class UserInfo {
  constructor({ userNameProfile, userJobProfile, userAvatar }) {
    /*Информация о пользователе, лежащая в HTML*/
    this._name = userNameProfile;
    this._about = userJobProfile;
    this._avatar = userAvatar;
  }

  getUserInfo({name, about, avatar}){
    this._name = name,
    this._about = about,
    this._avatar = `${avatar}`
  }  

}