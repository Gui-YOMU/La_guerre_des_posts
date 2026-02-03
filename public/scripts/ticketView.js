const todo = document.querySelector("#todo");
const ongoing = document.querySelector("#ongoing");
const done = document.querySelector("#done");
const drops = document.querySelectorAll(".drop");
let dragged;

async function getTickets() {
    let url = "http://localhost:3000/tickets";
    // if (employee) {
    //     url += `id=${employeeId}`;
    // }
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    });
    const ticketsList = await response.json();
    return ticketsList;
};

async function displayTickets() {
    let ticketsList = await getTickets();
    todo.replaceChildren();
    ongoing.replaceChildren();
    done.replaceChildren();
    let draggable;
    let title;
    let content;
    ticketsList.forEach(ticket => {
        draggable = document.createElement("div");
        draggable.setAttribute("draggable", "true");
        draggable.setAttribute("id", ticket._id);
        title = document.createElement("h4");
        title.textContent = ticket.title;
        content = document.createElement("p");
        content.textContent = ticket.content;
        draggable.appendChild(title);
        draggable.appendChild(content);
        draggable.addEventListener("dragstart", (e) => {
            dragged = e.target;
        })
        switch (ticket.category) {
            case "todo": {
                todo.appendChild(draggable);
                break;
            }
            case "ongoing": {
                ongoing.appendChild(draggable);
                break;
            }
            case "done": {
                done.appendChild(draggable);
                break;
            }
        }
    });
};

async function updateTicketCategory(id, category) {
    const response = await fetch(`http://localhost:3000/tickets/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ category }),
        headers: {
            "Content-type": "application/json"
        }
    });
    return response;
}

drops.forEach(drop => {
    drop.addEventListener("dragover", (e) => {
        e.preventDefault();
    });
    drop.addEventListener("drop", (e) => {
        e.preventDefault();
        updateTicketCategory(dragged.id, drop.id)
        dragged.parentNode.removeChild(dragged);
        e.target.appendChild(dragged);
        displayTickets();
    })
})

displayTickets();