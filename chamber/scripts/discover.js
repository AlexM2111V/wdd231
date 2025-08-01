

async function loadPlaces() {
    const response = await fetch("data/places.json");
    const places = await response.json();

    displayPlaces(places);
}

const displayPlaces = (places) => {
    const container = document.querySelector("#places");
    container.innerHTML = "";
    places.forEach(place => {
        const card = document.createElement("section");
        card.classList.add("place-card");

        card.innerHTML = `
        <img src="images/${place.image}" alt="image of ${place.name}" loading="lazy">
        <h2>${place.name}</h2>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button>Learn More</button>
        `;

        container.appendChild(card);
    });
}

loadPlaces();

const messageDiv = document.getElementById('visit-message');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (!lastVisit) {
    messageDiv.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const diff = now - Number(lastVisit);
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const daysBetween = Math.floor(diff / millisecondsPerDay);

    if (daysBetween < 1) {
        messageDiv.textContent = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
        messageDiv.textContent = "You last visited 1 day ago.";
    } else {
        messageDiv.textContent = `You last visited ${daysBetween} days ago.`;
    }
}

localStorage.setItem('lastVisit', now.toString());