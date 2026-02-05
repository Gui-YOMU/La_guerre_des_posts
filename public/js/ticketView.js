const todo = document.querySelector("#todo");
const doing = document.querySelector("#doing");
const done = document.querySelector("#done");
const drops = document.querySelectorAll(".drop");
let dragged;
const messWelcome = document.querySelector("h1");
const lastname = sessionStorage.getItem("lastname");
const firstname = sessionStorage.getItem("firstname");

messWelcome.textContent = "bienvenue " + lastname + " " + firstname;
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
      "Content-type": "application/json",
    },
  });
  const ticketsList = await response.json();
  return ticketsList;
}

// Fonction d'affichage de la liste des tickets

async function displayTickets() {
  let ticketsList = await getTickets();
  todo.replaceChildren();
  doing.replaceChildren();
  done.replaceChildren();
  let draggable;
  let title;
  let content;
  ticketsList.forEach((ticket) => {
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
    });
    switch (ticket.status) {
      case "todo": {
        todo.appendChild(draggable);
        break;
      }
      case "doing": {
        doing.appendChild(draggable);
        break;
      }
      case "done": {
        done.appendChild(draggable);
        break;
      }
      default:
        console.log("status inconnu", ticket.status);
    }
  });
}

// Fonction de modification de la catégorie pour que le ticket reste affiché dans sa nouvelle catégorie

async function updateTicketStatus(id, status) {
  const response = await fetch(`http://localhost:3000/tickets/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  return response;
}

drops.forEach((dropZone) => {
  // Ajout à chaque catégorie d'un event "drop"
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  dropZone.addEventListener("drop", async (e) => {
    e.preventDefault();

    const newStatus = dropZone.id;
    const ticketId = dragged.id;

    console.log("drop sur:", newStatus);
    console.log("ticket:", ticketId);

    await updateTicketStatus(ticketId, newStatus);

    dropZone.appendChild(dragged);
  });
});

displayTickets();
