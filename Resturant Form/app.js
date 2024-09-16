document.getElementById('reservation-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission for now

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const guests = document.getElementById('guests').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const requests = document.getElementById('special-requests').value;

    if (name && email && phone && guests && date && time) {
        alert('Reservation Successful! We have received your booking.');
    } else {
        alert('Please fill out all required fields.');
    }
});
