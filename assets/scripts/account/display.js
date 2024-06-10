import { deleteCookie, getCookie } from "../cookie-manager.js";
import { getUserData } from "./user-handler.js";


export function checkForLogin() {
    const access_token = getCookie("access_token");
    if(access_token != null) {
        console.log(access_token);
        removeLoginForm();
        addAccountInfoForm();
        getUserData();
    } else {
        addLoginForm();
        removeAccountInfoForm();
    }
}

function removeLoginForm() {
    document.getElementById("login-form-container").style.display = 'none';
}

function addLoginForm() {
    document.getElementById("login-form-container").style.display = '';
}

function removeAccountInfoForm() {
    document.getElementById("account-info-container").style.display = 'none';
}


function addAccountInfoForm() {
    document.getElementById("account-info-container").style.display = '';
}

checkForLogin();


document.getElementById("logout-button").addEventListener('click', function(event) {
    deleteCookie('access_token');
    checkForLogin();
})