const todo = document.querySelector("#todo");
const ongoing = document.querySelector("#ongoing");
const done = document.querySelector("#done");
const drops = document.querySelectorAll(".drop");
let dragged;
const messWelcome = document.querySelector("h1")
const lastname = sessionStorage.getItem("lastname")
const firstname = sessionStorage.getItem("firstname")
const idEmploye = sessionStorage.getItem("id")
const logout = document.querySelector("a")



if (!idEmploye) {
    window.location.href = "/src/views/login.html"

}
logout.addEventListener("click",(e)=>{
    sessionStorage.clear()
})

messWelcome.textContent = "Bonjour " + lastname + " " + firstname 


// Fonction de récupération de la liste des tickets via API

async function getTickets() {
    let url = "http://localhost:3000/tickets";

    // Une fois l'accès à l'id de l'employé connecté, modification de l'url pour ne récupérer que les tickets liés à l'employé
    // if (employee) {
    //     url += `?id=${employeeId}`;
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

// Fonction d'affichage de la liste des tickets

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

        // Ajout à chaque ticket d'un event "drag"
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

// Fonction de modification de la catégorie pour que le ticket reste affiché dans sa nouvelle catégorie

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
    // Ajout à chaque catégorie d'un event "drop"
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