const myInfo = new URLSearchParams(window.location.search);
const unformattedDate = myInfo.get('booking-date');

// Parse the date manually to avoid timezone shifts
const [year, month, day] = unformattedDate.split("-");
const formattedDate = new Date(year, month - 1, day).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

document.querySelector("#confirmation-message").innerHTML = `
<h1>Booking Confirmation</h1>
<p>Thank you, ${myInfo.get('firstName')} ${myInfo.get('lastName')} for booking with CasaLatina.</p>
<p>We’re thrilled to confirm your reservation for a ${myInfo.get('room-preference')} room in ${myInfo.get('city')} on ${formattedDate}.
 Your journey to experience the heart and soul of South America begins here.
    A confirmation email has been sent to ${myInfo.get('email')} and we may contact you at ${myInfo.get('mobile')} if needed.</p>
<p>One of our local hosts will be in touch soon to make sure everything is perfect for your stay. In the meantime, feel free to explore local guides, events, and community perks available on our website.
    We’re excited to welcome you to CasaLatina — your home in South America!</p>`;
