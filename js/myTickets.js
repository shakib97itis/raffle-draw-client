const grid = document.getElementById("ticket-results");
const template = document.getElementById("ticketTemplate");
const loader = document.querySelector(".loader");

function renderTickets(tickets) {
    tickets.forEach((ticket) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".ticketCard__id").textContent = `ID: ${ticket.id}`;
        clone.querySelector(".ticketCard__username").textContent = `${ticket.username}`;
        clone.querySelector(".ticketCard__price").textContent = `$${ticket.price}`;
        clone.querySelector(".ticketCard__date").textContent = `${formatDate(ticket.updateDate)}`;
        // Apply random transform to card
        const rotate = getRandomValue(30) - 15; // Random value between -5 and 5 
        clone.querySelector(".ticketCard").style.transform = `rotate(${rotate}deg)`;
        grid.appendChild(clone);
    });
}

document.getElementById('findTicketForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = event.target.querySelector('input').value;
    grid.innerHTML = '';
    loader.classList.add("loader--open");
    fetch(`https://raffle-draw-server-mu.vercel.app/api/v1/tickets/b/${username}`)
        .then(res => res.json())
        .then(data => {
            if (data.length > 0) {
                renderTickets(data);
                loader.classList.remove("loader--open");
            } else {
                grid.innerHTML = '<p>No tickets found for this username.</p>';
            }
        })
});