import { deleteCookie, getCookie } from "../cookie-manager.js";


//delete account button
document.getElementById("delete-account-button").addEventListener('click', function() {

    const confirmed = confirm("Você tem certeza que quer deletar seu usuário? Essa acão não poderá ser desfeita.");
    if(!confirmed)
        return;
    const jsonData = {
        "access_token": getCookie("access_token")
    }
    deleteUser(jsonData);
});



function deleteUser(jsonData) {
    const url = "http://localhost:5000/users/delete";
    
    fetch(url, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        if(!response.ok) {
            alert("Não foi possível deletar o usuário. Informacoes de debug estão no console.");
            throw new Error("Error: " + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert("Usuário deletado com sucesso!");
        deleteCookie("access_token");
        window.location.reload();
    })
    .catch(error => {
        console.log(error);
    });
    
}

export function getUserData() {
    const url = "http://localhost:5000/users/info";
    const jsonData = {"access_token": getCookie("access_token")};

    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        if(response.status != 200) {
            alert("Houve um erro ao obter as informacoes sobre o seu usuário! Tente sair e logar novamente.");
            throw new Error("Error: " + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        document.getElementById("username-header").innerHTML = "Username: " + data.username;
        document.getElementById("privilege").innerHTML = "Privilégios: " + data.privileges;
    })
    .catch(error => {
        console.log("Error: " + error);
    })
}

if(getCookie('access_token')){
    getUserData();
}