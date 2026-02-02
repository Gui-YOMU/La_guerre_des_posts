const todo = document.querySelector("#todo");
const ongoing = document.querySelector("#ongoing");
const done = document.querySelector("#done");

async function getTickets() {
    const response = await fetch("http://localhost:3000/tickets", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    });
    const ticketsList = await response.json();
    return ticketsList;
};

function displayTickets(ticketsList) {
    todo.replaceChildren();
    ongoing.replaceChildren();
    done.replaceChildren();
    let draggable;
    let title;
    let content;
    ticketsList.forEach(ticket => {
        draggable = document.createElement("div");
        draggable.setAttribute("draggable", "true");
        title = document.createElement("h4");
        title.textContent = ticket.title;
        content = document.createElement("p");
        content.textContent = ticket.content;
        draggable.appendChild(title);
        draggable.appendChild(content);
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
            default: {
                break;
            }
        }
    });
};

getTickets();
displayTickets();