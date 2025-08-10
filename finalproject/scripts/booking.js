
document.getElementById("booking-form").addEventListener("submit", function () {

    const city = document.querySelector('select[name="city"]').value;
    const roomType = document.querySelector('input[name="room-preference"]:checked').value;
    const bookingDate = document.querySelector('input[name="booking-date"]').value;

    localStorage.setItem("city", city);
    localStorage.setItem("roomType", roomType);
    localStorage.setItem("bookingDate", bookingDate);
});

const savedCity = localStorage.getItem("city");
const savedRoomType = localStorage.getItem("roomType");
const savedDate = localStorage.getItem("bookingDate");

if (savedCity && savedRoomType && savedDate) {
    const today = new Date();

    // Parse the date manually to avoid timezone issues
    const [year, month, day] = savedDate.split("-");
    const booking = new Date(year, month - 1, day);

    // Format date for display
    const formattedDate = booking.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    if ( booking < today ) {
        document.getElementById("room-booked").textContent = "You had a reservation for a " + savedRoomType + " room in " + savedCity + ", scheduled for " + formattedDate + ".";
    } else {
        document.getElementById("room-booked").textContent = "You have a reservation for a " + savedRoomType + " room in " + savedCity + ", scheduled for " + formattedDate + ".";
    }

}
