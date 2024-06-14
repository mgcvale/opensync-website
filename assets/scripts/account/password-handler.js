import { deleteCookie, getCookie } from "../cookie-manager.js";


document.getElementById('changepwd-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const jsonData = {};

    const new_password = formData.get('new_password');
    console.log(new_password);
    console.log(formData.get('confirm-password'));
    if(new_password != formData.get('confirm-password')) {
        alert("As duas senhas não se coincidem!");
        return;
    }

    jsonData['new_password'] = formData.get('new_password');
    jsonData['access_token'] = getCookie('access_token');

    console.log(jsonData);
    changePassword(jsonData);
});


export function changePassword(jsonData) {
    const url = "http://localhost:5000/users/change_password";

    fetch(url, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        if(!response.ok){
            if(response.status == 401)
                alert("Falha na autenticacao! Tente relogar e tentar novamente");
            throw new Error("Error: " + response.status);
        } else {
            deleteCookie('access_token');
            alert("Senha trocada com sucesso!");
            window.location.href = 'conta.html';
        }
    })
    .catch(error => {
        console.log(error);
    });
}
