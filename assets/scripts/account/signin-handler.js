import { getCookie } from "../cookie-manager.js";

document.getElementById("signin-form").addEventListener('submit', function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const jsonData = {};

    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    console.log(formData);
    if(jsonData.password != document.getElementById("confirm-password").value) {
        alert("As duas senhas não se coincidem!");
        return;
    }

    signIn(jsonData);
});

function signIn(jsonData) {
    const url = 'http://localhost:5000/users';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        if(!response.ok) {
            if(response.status == 409)
                alert("Já existe um usuário com este username!");
            throw new Error("HTTP Error: " + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert("Usuário criado com sucesso");
        window.location.href = "./conta.html";
    })
    .catch(error => {
        console.log("Error: " + error);
    });

}