// Date format function
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

// Random value generator function
function getRandomValue(max) { return Math.random() * max; };


function toggleDrawer() {
    drawer.classList.toggle("drawer--open");
    // Animate hamburger icon
    navToggle.classList.toggle("navToggle--active");

    if (drawer.classList.contains("drawer--open")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(7px, -7px)";
    } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
    }
    overlay.classList.toggle("overlay--open");
}

function toggleOverlay() {
    drawer.classList.remove("drawer--open");
    overlay.classList.remove("overlay--open");
    navToggle.classList.remove("navToggle--active");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
}

// Navigation DOM elements
const navToggle = document.querySelector(".navToggle");
const drawer = document.querySelector(".drawer");
const overlay = document.querySelector(".overlay");
const spans = navToggle.querySelectorAll(".navToggle__bar");
const pageTitle = document.querySelector('.page-title');

overlay.addEventListener("click", toggleOverlay);
navToggle.addEventListener("click", toggleDrawer);

// Apply random skew to page title
const skewX = getRandomValue(20) - 10; // Random value between -10 and 10
const rotate = getRandomValue(10) - 5; // Random value between -5 and 5 
pageTitle.style.transform = `skew(${skewX}deg) rotate(${rotate}deg)`;