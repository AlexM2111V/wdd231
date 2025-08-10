const hambutton = document.querySelector("#menu");
const mainnav = document.querySelector('#nav-bar');
const header = document.querySelector('header');

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
    header.classList.toggle('show');
})

document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;