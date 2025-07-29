const myInfo = new URLSearchParams(window.location.search);
let formattedDate = '';

const rawTimestamp = myInfo.get("timestamp");
if (rawTimestamp) {
    const decodedTimestamp = decodeURIComponent(rawTimestamp);

    const date = new Date(decodedTimestamp);
    const options = {
        weekday: 'long', year: 'numeric', month: 'long',
        day: 'numeric', hour: '2-digit', minute: '2-digit',
        timeZoneName: 'short'
    };
    formattedDate = date.toLocaleString(undefined, options);
}

document.querySelector("#results").innerHTML = `
<h1>Thank you for your application to join the Molina Chamber of Commerce</h1>
<p>We appreciate your interest in becoming a valued member of our business community.</p>
<p>Your application was submitted on ${formattedDate}.</p>
<p>It has been successfully received with the following details:</p>
<p><strong>Name:</strong> ${myInfo.get('firstName')} ${myInfo.get('lastName')}<br>
<strong>Company:</strong> ${myInfo.get('organization')}<br>
<strong>Email:</strong> ${myInfo.get('email')}<br>
<strong>Phone:</strong> ${myInfo.get('mobile')}</p>
<p> A member of our team will review your submission and follow up with next steps within 2–3 business days.
If you have any immediate questions, please contact us at info@molinachamber.org or call us directly at (123) 456‑7890.
We look forward to supporting your growth and success.</p>
<p><strong>Warm regards<br>
The Molina Chamber of Commerce Team</strong></p>
`;