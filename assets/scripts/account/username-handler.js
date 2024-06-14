import { getCookie } from "../cookie-manager.js";

//change uname form
document.getElementById("username-change-form").addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const jsonData = {}

    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    jsonData['access_token'] = getCookie('access_token');

    changeUsername(jsonData);
});

function changeUsername(jsonData) {
    const url = "http://localhost:5000/users/change_username";

    fetch(url, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        if(!response.ok) {
            if(response.status == 409) {
                alert("Já existe um usuário com este nome");
                throw new Error("Error: " + response.status);
            }
            if(response.status == 401) {
                alert("Não foi possível trocar o nome de usuário. Informacoes de debug estão no console.");
                throw new Error("Error: " + response.status);
            }
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert("Nome de usuário trocado com sucesso!");
        window.location.href='conta.html';
    })
    .catch(error => {
        console.log(error);
    });
}
