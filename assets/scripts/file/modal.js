import { getCookie } from "../cookie-manager.js";

export function imagesLoaded() {
    var images = document.getElementsByClassName("gallery-image");
    const modal = document.getElementById('gallery-modal')
    const modalImage = document.getElementById("modal-image");
    const modalDownload = document.getElementById("modal-download");
    const modalDelete = document.getElementById("modal-delete");
    const modalClose = document.getElementById("modal-close");

    for (var i = 0; i < images.length; i++) {
        console.log(images[i]);
        images[i].onclick = function(event) {
            console.log("LAKSDJ");
            modal.style.display = "flex";
            document.body.classList.add("modal-open");

            modalImage.src = event.target.src;

            modalDownload.href = 'http://localhost:5000/files/download/' + getCookie('access_token') + '/' + event.target.id;
            modalDownload.download = 'imagem';
            modalDelete.removeEventListener('click', deleteImageHandler);
            modalDelete.addEventListener('click', deleteImageHandler);

            function deleteImageHandler() {
                deleteImage(event.target.id);
            }
        }
    }

    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    });

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.classList.remove("modal-open");
        }
    }
}

function deleteImage(imgname) {
    const url = 'http://localhost:5000/files/delete';
    const jsonData = {"access_token": getCookie('access_token'), 'filename': imgname}

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        if(!response.ok) {
            alert("Erro ao deletar arquivo!");
            throw new Error("Error: " + response.status);
        }
        alert("Arquivo deletado com sucesso");
        window.location.reload();
    })
    .catch(error => {
        console.log(error);
    });
}