document.addEventListener("DOMContentLoaded", function () {
    // Navigation toggle functionality
    const toggle = document.querySelector('#nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('show-navlinks');
    });

    let currentPage = 0;
    const eventsNumber = 6;

    function fetchData() {
        fetch('events.json')
            .then(response => response.json())
            .then(data => {
                let start = currentPage * eventsNumber;
                let end = start + eventsNumber;
                let eventsToShow = data.events.slice(start, end);

                const eventCardsContainer = document.getElementById('event-cards');
                eventsToShow.forEach(event => {
                    const eventCard = `
                        <article class="single-card">
                            <div class="card-details">
                                <div class="card-imgs">
                                    <img src="${event.image}" alt="card-image" class="card-img">
                                </div>
                                <div class="card-info">
                                    <h4>${event.eventName}</h4>
                                </div>
                            </div>
                            <div class="performance">
                                <a href="#">${event.month}</a>
                                <a href="#">${event.day}<sup>th</sup></a>
                                <a href="#">${event.location}</a>
                            </div>
                            <div class="card-description">
                                <p>${event.description}</p>
                            </div>
                            <a href="#" class="btn event-btn"
                                data-event-name="${event.eventName}" 
                                data-location="${event.location}" 
                                data-date="${event.date}" 
                                data-price="${event.price}"
                                data-month ="${event.month}">
                                <i class="fa-regular fa-calendar"></i> Book
                            </a>
                        </article>
                    `;
                    eventCardsContainer.innerHTML += eventCard;
                });

                if (end >= data.events.length) {
                    document.getElementById('show-more').style.display = 'none';
                }
                
                addEventListeners();
            })
            .catch(error => console.error('Error loading events:', error));
    }
    fetchData();

    document.getElementById('show-more').addEventListener('click', function() {
        currentPage++;
        fetchData();
    });

    function addEventListeners() {
        const eventButtons = document.querySelectorAll('.event-btn');
        const bookingEvent = document.querySelector('.booking');

        eventButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                bookingEvent.classList.add('show-booking');

                const sections = document.querySelectorAll("section");
                const bookingSection = document.getElementById("Booking");

                sections.forEach(section => {
                    section.style.display = "none";
                });
                bookingSection.style.display = "block";

                const eventName = button.getAttribute('data-event-name');
                const eventLocation = button.getAttribute('data-location');
                const eventDate = button.getAttribute('data-date');
                const priceEvent = button.getAttribute('data-price');

                document.querySelector("#evt-name").value = eventName;
                document.querySelector('#loca').value = eventLocation;
                document.querySelector("#tarikh").value = eventDate.split("/").reverse().join("-");

                const submitBtn = document.querySelector("#submit-btn");

                submitBtn.addEventListener("click", function (e) {
                    e.preventDefault();



                    const fullNameForm = document.getElementById('full-name').value;
                    const emailForm = document.getElementById('form-email').value;
                    const eventNameForm = document.getElementById('evt-name').value;
                    const locationForm = document.getElementById('loca').value;
                    const ticketsForm = document.getElementById('tickets').value;
                    const dateForm = document.getElementById('tarikh').value;

                    let gender;
                    if (document.getElementById('gender-male').checked) {
                        gender = 'Male';
                    } else if (document.getElementById('gender-female').checked) {
                        gender = 'Female';
                    } else {
                        gender = 'Prefer not to say';
                    }

                    // Validate the form fields
                    if (!fullNameForm) {
                        alert('Please enter your full name.');
                        event.preventDefault();
                        return false;
                    }

                    if (!emailForm) {
                        alert('Please enter your email address.');
                        event.preventDefault();
                        return false;
                    }

                    if (!ticketsForm || ticketsForm < 1 || ticketsForm > 10) {
                        alert('Please select a valid number of tickets (1-10).');
                        event.preventDefault();
                        return false;
                    }

                    if (!gender) {
                        alert('Please select your gender.');
                        event.preventDefault();
                        return false;
                    }

                    const totalPrice = priceEvent * ticketsForm;

                    document.querySelector(".container").style.display = "block";
                    document.querySelector(".form").style.display = "none";
                    document.querySelector("#price").innerText = `$${totalPrice}`;

                    const characters = '0123456789abcdef';
                    let result = '#';
                    for (let i = 0; i < 7; i++) {
                        const randomIndex = Math.floor(Math.random() * characters.length);
                        result += characters[randomIndex];
                    }
                    document.getElementById("UId").innerText = result;

                    const formData = {
                        fullNameForm,
                        emailForm,
                        eventNameForm,
                        ticketsForm,
                        locationForm,
                        dateForm,
                        gender
                    };

                    localStorage.setItem(result, JSON.stringify(formData));

                    const closePopup = document.querySelector("#closePopup");
                    closePopup.addEventListener("click", function () {
                        window.location.reload(); 
                    });
                });
            });
        });
    }

    addEventListeners();

    function searchEvents() {
        const searchText = document.getElementById('event-search').value.toLowerCase();
        const searchDate = document.getElementById('date-picker').value;
        const eventCards = document.querySelectorAll('.single-card');
    
        // Reverse the date from YYYY-MM-DD to DD/MM/YYYY
        let searchDateReversed = '';
        if (searchDate) {
            searchDateReversed = searchDate.split("-").reverse().join("/");
        }
    
        eventCards.forEach(card => {
            const eventButton = card.querySelector('.event-btn');
            const eventName = eventButton.getAttribute('data-event-name').toLowerCase();
            const eventMonth = eventButton.getAttribute('data-month').toLowerCase();
            const eventDate = eventButton.getAttribute('data-date'); // DD/MM/YYYY format in JSON
    
            /// Check if event name, month, or date matches the search criteria
            const isNameMatch = searchText && eventName.includes(searchText);
            const isMonthMatch = searchText && eventMonth.includes(searchText);
            const isDateMatch =  eventDate === searchDateReversed;
            
            console.log("name ", isNameMatch);
            console.log("month ", isMonthMatch);
            console.log("date ", isDateMatch);
    
            // If any of the conditions are true, show the card
            if (isDateMatch || isNameMatch || isMonthMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Add event listener to the search button
    document.getElementById('search-btn').addEventListener('click', searchEvents);
    
    // Show all cards when clearing the search input
    document.getElementById('event-search').addEventListener('input', function () {
        const searchText = document.getElementById('event-search').value;
        if (searchText === '') {
            const eventCards = document.querySelectorAll('.single-card');
            eventCards.forEach(card => {
                card.style.display = 'block';
            });
        }
    });
    
    document.getElementById('date-picker').addEventListener('input', function () {
        const searchDate = document.getElementById('date-picker').value;
        if (searchDate === '') {
            const eventCards = document.querySelectorAll('.single-card');
            eventCards.forEach(card => {
                card.style.display = 'block';
            });
        }
    });
    
});

