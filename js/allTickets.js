// Render tickets.
function renderTickets() {
    const grid = document.querySelector(".data-grid");
    const template = document.getElementById("ticket-template");
    const loader = document.querySelector(".loader");
    loader.classList.add("loader--open");
    fetch("https://raffle-draw-server-mu.vercel.app/api/v1/tickets")
        .then((res) => res.json())
        .then((tickets) => {
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
                loader.classList.remove("loader--open");
            });
        }).catch((err) => {
            console.error(err);
        });
}

renderTickets();