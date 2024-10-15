// script to make header's items at least square

const items = document.querySelectorAll("header > *");
const header = document.querySelectorAll("header")[0];

function updateHeaderSizes() {
    items.forEach(item => {
        item.style.minWidth = header.offsetHeight + "px";
    });
}

updateHeaderSizes();
header.addEventListener("resize", updateHeaderSizes);