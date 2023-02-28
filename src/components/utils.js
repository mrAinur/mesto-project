import { userNameProfile, userJobProfile, userAvatar } from "./modal.js";

const cohortId = "plus-cohort-20";
const token = "a6c9ce5b-7a95-47f3-900e-0e9cffd9e4f4";

function getUserInfo() {
    fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
        headers: {
            authorization: `${token}`
        }
    })
        .then(res => res.json())
        .then((obj) => {
            console.log(obj);
            userNameProfile.textContent = obj.name;
            userJobProfile.textContent = obj.about;
            userAvatar.src = `<%=require("${obj.avatar}")%>`;
        })
        .catch((rej) => {
            console.log(`Ошибка ${rej.status}`);
        });
};

export { getUserInfo }