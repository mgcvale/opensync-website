import { deleteCookie, getCookie } from "../cookie-manager.js";

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
        window.location.reload();
    })
    .catch(error => {
        console.log(error);
    });
}


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
        document.getElementById("username").innerHTML = "Username: " + data.username;
        document.getElementById("privilegios").innerHTML = "Privilégios: " + data.privileges;
    })
    .catch(error => {
        console.log("Error: " + error);
    })
}

if(document.getElementById("account-info-container").style.display != 'none')
    getUserData();  