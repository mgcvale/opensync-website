import { getCookie } from "../cookie-manager";

console.log("lKAJSLKJSAD");
document.getElementById("image-upload").addEventListener('submit', function(event) {
    event.preventDefault();

    formData = new FormData(event.target);
});

function uploadFiles(formData) {
    const url = "http://localhost:5000/files/test";
    const cookie = getCookie("access_token");
    
}