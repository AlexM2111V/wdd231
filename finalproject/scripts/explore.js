const bogota = document.querySelector('#bogota');
const brasilia = document.querySelector('#brasilia');
const buenosAires = document.querySelector('#buenos-aires');
const lima = document.querySelector('#lima');
const montevideo = document.querySelector('#montevideo');
const quito = document.querySelector('#quito');
const santiago = document.querySelector('#santiago');

async function apiFetchCurrentWeather(lat, lon) {
    try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1e171324472fcfc2632278098ef86959&units=metric`;
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            // displayResults(data);
            console.log(data);
            return data;
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

async function showPlaces(cityName) {
    try {
        const response = await fetch("/finalproject/data/places.json");
        if (!response.ok) throw new Error("Failed to fetch places data.");

        const places = await response.json();

        const filtered = places.filter(place => place.city === cityName);

        console.log(filtered);

        const container = document.getElementById('places');
        container.innerHTML = "";

        const cityInfo = document.createElement("div");
        cityInfo.classList.add("city-info");

        const flag = document.createElement("div");
        flag.classList.add("flag");
        flag.innerHTML = `
            <img src="images/${filtered[0].flag}" alt="image of ${filtered[0].city}" loading="lazy">
            `;
        
        const info = document.createElement("div");
        info.classList.add("info");

        const weather = await apiFetchCurrentWeather(filtered[0].latitude, filtered[0].longitude);

        info.innerHTML = `
            <h1>${filtered[0].city}</h1>
            <p>${filtered[0]['city-info']} ${weather.main.temp}&deg;C.</p>
            `;
        container.appendChild(cityInfo);
        cityInfo.appendChild(flag);
        cityInfo.appendChild(info);

        const placesSection = document.createElement("div");
        placesSection.classList.add("places-section");
 
        filtered.forEach(place => {
            const card = document.createElement("section");
            card.classList.add("place-card");

            card.innerHTML = `
                <img src="images/${place.image}" alt="image of ${place.name}" loading="lazy">
                <h2>${place.name}</h2>
                <address>${place.address}</address>
                <p>${place.description}</p>
                `;

            placesSection.appendChild(card);
        });

        container.appendChild(placesSection);

    } catch (error) {
        console.error("Error loading places card:", error);
    }
}

bogota.addEventListener('click', () => {
    showPlaces("Bogotá");
})

brasilia.addEventListener('click', () => {
    showPlaces("Brasília");
})

buenosAires.addEventListener('click', () => {
    showPlaces("Buenos Aires");
})

lima.addEventListener('click', () => {
    showPlaces("Lima");
})

montevideo.addEventListener('click', () => {
    showPlaces("Montevideo");
})

quito.addEventListener('click', () => {
    showPlaces("Quito");
})

santiago.addEventListener('click', () => {
    showPlaces("Santiago");
})