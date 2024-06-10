import { getCookie } from "../cookie-manager.js";


console.log("lKAJSLKJSAD");
document.getElementById("image-upload").addEventListener('submit', function(event) {
    event.preventDefault();

    var formData = new FormData(event.target);
    formData.append("access_token", getCookie("access_token"));
    uploadFiles(formData);
});

function uploadFiles(formData) {
    const url = "http://localhost:5000/files/upload";
    const cookie = getCookie("access_token");

    fetch(url, {
        method: "POST",
        body: formData
    })
    .then(response => {
        if(!response.ok) {
            alert("erro ao enviar mensagens");
            throw new Error(response.status);
        }
        alert("imagens enviadas com sucesso");
        return response.json;
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log("Error: " + error);
    });
    
}