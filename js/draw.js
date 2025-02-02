// http://localhost:8000/api/v1/tickets/draw

const grid = document.getElementById("dataGrid");
const template = document.getElementById("ticketTemplate");
const loader = document.querySelector(".loader");
const drawButton = document.getElementById("drawButton");

function renderTickets(tickets) {
    tickets.forEach((ticket) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".ticketCard__id").textContent = `ID: ${ticket.id}`;
        clone.querySelector(".ticketCard__username").textContent = `${ticket.username}`;
        clone.querySelector(".ticketCard__date").textContent = `${formatDate(ticket.updateDate)}`;
        // Apply random transform to card
        const rotate = getRandomValue(30) - 15; // Random value between -5 and 5 
        clone.querySelector(".ticketCard").style.transform = `rotate(${rotate}deg)`;
        grid.appendChild(clone);
    });
}

drawButton.addEventListener('click', function (event) {
    grid.innerHTML = '';
    event.target.classList.add("drawButton__hidden");
    loader.classList.add("loader--open");
    fetch(`https://raffle-draw-server-mu.vercel.app/api/v1/tickets/draw`)
        .then(res => res.json())
        .then(data => {
            if (data.length > 0) {
                renderTickets(data);
                loader.classList.remove("loader--open");
            } else {
                loader.classList.remove("loader--open");
                grid.innerHTML = '<p>Something went wrong!</p>';
            }
        })
});