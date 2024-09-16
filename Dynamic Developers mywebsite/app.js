let navBtn = document.getElementById("nav-toggle");
let navLinks = document.getElementById("nav-links");

navBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show-links");
});
