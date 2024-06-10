import { checkForLogin } from "./conta.js";
import { getCookie, deleteCookie, setCookie } from "../cookie-manager.js";


document.getElementById("login-form").addEventListener('submit', function(event){
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const url = 'http://localhost:5000/users/get_token';

    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    console.log("AAAAAAA");
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        setCookie("access_token", data.access_token, 30, false);
        checkForLogin();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});