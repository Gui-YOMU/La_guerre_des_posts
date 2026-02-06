const todo = document.querySelector("#todo");
const doing = document.querySelector("#doing");
const done = document.querySelector("#done");
const drops = document.querySelectorAll(".drop");
const messWelcome = document.querySelector("h1");
const lastname = sessionStorage.getItem("lastname");
const firstname = sessionStorage.getItem("firstname");
const idEmploye = sessionStorage.getItem("id");
const logout = document.querySelector("a");

let dragged;

if (!idEmploye) {
  window.location.href = "/src/views/login.html";
}
logout.addEventListener("click", () => {
  sessionStorage.clear();


});
messWelcome.textContent = "bienvenue " + lastname + " " + firstname;
// Fonction de récupération de la liste des tickets via API

async function getTickets() {
  const idEmploye = sessionStorage.getItem("id");
  let url = "http://localhost:3000/tickets";
  if (idEmploye) {
    url += `?employee=${idEmploye}`;
  }

  console.log("URL tickets appelée :", url);

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
      dragged = e.currentTarget;
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
  const employee = sessionStorage.getItem("id");
  const response = await fetch(
    `http://localhost:3000/tickets/${id}?employee=${employee}`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ status }),
    },
  );
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
