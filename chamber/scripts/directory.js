const hambutton = document.querySelector(".menu");
const mainnav = document.querySelector('#nav-bar');
const header = document.querySelector('header');
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
    header.classList.toggle('show');
})

document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;


async function loadCompanies() {
    const response = await fetch("data/members.json");
    const companies = await response.json();

    displayCompanies(companies);
}

const displayCompanies = (companies) => {
    const container = document.querySelector(".grid");
    container.innerHTML = "";
    companies.forEach(company => {
        const card = document.createElement("section");
        card.classList.add("company-card");

        card.innerHTML = `
      <img src="images/${company.image}" alt="Logo of ${company.name}" loading="lazy">
      <h2>${company.name}</h2>
      <p><strong>Address:</strong> ${company.address}</p>
      <p><strong>Phone:</strong> ${company.phone}</p>
      <p><strong>Website:</strong> <a href="${company.website}" target="_blank">${company.website}</a></p>
      <p><strong>Level:</strong> ${getMembershipName(company.membershipLevel)}</p>
    `;

        container.appendChild(card);
    });
}

function getMembershipName(level) {
    switch (level) {
        case 3: return "Gold";
        case 2: return "Silver";
        default: return "Member";
    }
}

loadCompanies();

gridbutton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
});

listbutton.addEventListener("click", showList);

function showList() {
    display.classList.add("list");
    display.classList.remove("grid");
}

