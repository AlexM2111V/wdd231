const weatherIcon = document.querySelector('#weather-icon');
const description = document.querySelector('#description');
const temperature = document.querySelector('#temperature');
const high = document.querySelector('#high');
const low = document.querySelector('#low');
const humidity = document.querySelector('#humidity');
const info = document.querySelector("#info");

function getMembershipName(level) {
    switch (level) {
        case 3: return "Gold";
        case 2: return "Silver";
        default: return "Member";
    }
}

const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=-12.08&lon=-76.92&appid=1e171324472fcfc2632278098ef86959&units=metric';

async function apiFetchCurrentWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetchCurrentWeather();

function displayResults(data) {
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    desc = desc.charAt(0).toUpperCase() + desc.slice(1);
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    description.innerHTML = `${desc}`;
    temperature.innerHTML = `${data.main.temp}&deg;C`;
    high.innerHTML = `${data.main.temp_max}&deg;C`;
    low.innerHTML = `${data.main.temp_min}&deg;C`;
    humidity.innerHTML = `${data.main.humidity}%`;
}


const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=-12.08&lon=-76.92&appid=1e171324472fcfc2632278098ef86959&units=metric';

async function apiFetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

function displayForecast(data) {
    const forecastList = data.list;
    const addedDates = new Set();
    const forecastContainer = document.querySelector('.forecast-list');


    forecastList.forEach(item => {
        const date = new Date(item.dt_txt);
        const hour = date.getHours();

        if (hour === 12 && addedDates.size < 3) {
            const day = date.toLocaleDateString("en-US", { weekday: 'long' });
            const temp = Math.round(item.main.temp);
            const desc = item.weather[0].description;

            // Create forecast card
            const card = document.createElement('p');
            card.innerHTML = `
            ${day}: <strong>${temp}&deg;C</strong>
        `;

            forecastContainer.appendChild(card);
            addedDates.add(date.toDateString());
        }
    });
}

apiFetchForecast();


function getRandomBusinesses(arr, count = 3) {
    const shuffled = [...arr]; // Copy array
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}

async function showSpotlightCompanies() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("Failed to fetch business data.");

        const businesses = await response.json();
        const filtered = businesses.filter(biz => biz.membershipLevel === 2 || biz.membershipLevel === 3);
        const selectedBusinesses = getRandomBusinesses(filtered);

        const container = document.getElementById('spotlight');
        container.innerHTML = "";

        selectedBusinesses.forEach(biz => {
            const card = document.createElement('div');
            card.classList.add('spotlight-card');
            const title = document.createElement('div');
            title.classList.add('spotlight-title');
            title.innerHTML = `<h2>${biz.name}</h2><p>${getMembershipName(biz.membershipLevel)}</p>`;
            card.appendChild(title);

            const image = document.createElement('img');
            image.src = `images/${biz.image}`;
            image.alt = `Logo of ${biz.name}`;
            image.loading = 'lazy';
            card.appendChild(image);

            const details = document.createElement('div');
            details.classList.add('spotlight-details');
            details.innerHTML = `
                <p><strong>Phone:</strong> ${biz.phone}</p>
                <p><strong>Address:</strong> ${biz.address}</p>
                <p><strong>URL:</strong> ${biz.website}</p>
            `;
            card.appendChild(details);

            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading spotlight businesses:", error);
    }
}

// Run it
showSpotlightCompanies();
