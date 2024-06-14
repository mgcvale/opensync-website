import { deleteCookie, getCookie } from "../cookie-manager.js";

document.getElementById('changepwd-form').addEventListener('submit',  function(event){
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const jsonData = {};

    const new_password = formData.get('new_password');
    if(new_password != formData.get('confirm-password')) {
        alert('As duas senhas não coincidem!');
    }

    jsonData['new_password'] = new_password;
    jsonData['access_token'] = getCookie('access_token');

    changePassword(jsonData);
});

function changePassword(jsonData) {
    const url = 'http://localhost:5000/users/change_password';

    fetch(url, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        if(!response.ok) {
            if(response.status == 401) 
                alert("Erro na autenticacão, refaca login e tente novamente");
            throw new Error("Error: " + response.status);
        }
        alert("Senha trocada com sucesso");
        deleteCookie('access_token');
        window.location.href='conta.html';
    })
    .catch(error => {
        console.log(error);
    })
}