function getRandomBenefits(arr, count = 6) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}

async function showSpotlightBenefits() {
    try {
        const response = await fetch("data/benefits.json");
        if (!response.ok) throw new Error("Failed to fetch benefits data.");

        const benefits = await response.json();
        const selectedBenefits = getRandomBenefits(benefits);

        const container = document.getElementById('spotlight');
        container.innerHTML = "";

        selectedBenefits.forEach(biz => {
            const card = document.createElement('div');
            card.classList.add('spotlight-card');
            const image = document.createElement('img');
            image.src = `${biz.image}`;
            image.alt = `Logo of ${biz.name}`;
            image.loading = 'lazy';
            card.appendChild(image);
            const details = document.createElement('div');
            details.classList.add('spotlight-details');
            details.innerHTML = `
                <h2>${biz.name}</h3>
                <p>${biz.description}</p>
            `;
            card.appendChild(details);

            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading benefits:", error);
    }
}

// Run it
showSpotlightBenefits();
