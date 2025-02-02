const purchaseResult = document.getElementById('purchaseResult');
const purchaseResultTemplate = document.getElementById('purchaseResultTemplate');
const formContainer = document.getElementById("buyTicketFormContainer");
const loader = document.querySelector(".loader");

/**
 * Add a purchase to the purchase result
 * @param {Object} data - The purchase data
 * @param {string} data.username - The username of the purchase
 * @param {number} data.price - The price of the purchase
 * @param {number} data.quantity - The quantity of the purchase
 * @returns {void}
 **/
function addPurchaseToResult(ticketInfo) {
    const clone = purchaseResultTemplate.content.cloneNode(true);
    const purchaseCard = clone.getElementById("purchaseCard").classList.add("purchaseCard--success");  
    clone.getElementById("purchaseCardUsername").textContent = `${ticketInfo.username}`;
    clone.getElementById("purchaseCardQuantity").textContent = `${ticketInfo.quantity}`;
    clone.getElementById("purchaseCardPrice").textContent = `$${ticketInfo.price * ticketInfo.quantity}`;
    purchaseResult.appendChild(clone);
}

function addPurchaseErrorToResult(data) {
    const clone = purchaseResultTemplate.content.cloneNode(true);
    clone.getElementById("purchaseCardUsername").textContent = `${data.username}`;
    clone.getElementById("purchaseCardQuantity").textContent = `${data.quantity}`;
    clone.getElementById("purchaseCardPrice").textContent = `$${data.price}`;
    purchaseResult.appendChild(clone);
}

// Handle form submission
function handleForm(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
    // css alternative
    formContainer.style.display = "none";
    loader.classList.add("loader--open");
    // Add purchase to the purchase result
    fetch('https://raffle-draw-server-mu.vercel.app/api/v1/tickets/b/sell', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, price, quantity })
    })
        .then(res => res.json())
        .then(data => {
            const ticketInfo = {
                username: data[0].username,
                price: data[0].price,
                quantity: data.length
            };
            addPurchaseToResult(ticketInfo);
            loader.classList.remove("loader--open");
        })
        .catch(error => {
            console.error('Error:', error);
            // addPurchaseToResult({ username, price, quantity });
        });
}

document.getElementById('buyTicketForm').addEventListener('submit', handleForm);