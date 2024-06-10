import { getCookie } from "../cookie-manager.js";


export function checkForLogin() {
    if(getCookie("access_token")) {
        removeLoginWarning();
        addUserContent();
    } else {
        reoveUserContent();
        addLoginWarning();
    }
}

function reoveUserContent() {
    document.getElementById("user-content").style.display = 'none';
}

function removeLoginWarning() {
    document.getElementById("login-warning").style.display = 'none';
}

function addUserContent() {
    document.getElementById("user-content").style.display = '';
}

function addLoginWarning() {
    document.getElementById("login-warning").style.display = '';
}

checkForLogin();