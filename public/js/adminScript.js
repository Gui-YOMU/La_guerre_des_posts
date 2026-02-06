const idAdmin = sessionStorage.getItem("id");
const logout = document.querySelector("a");

if (!idAdmin) {
  window.location.href = "/src/views/login.html";
}

logout.addEventListener("click", (e) => {
  sessionStorage.clear();
});

document.addEventListener("DOMContentLoaded", () => {
  loadTickets();
});

const url = "http://localhost:3000/admin";

async function loadTickets() {
  try {
    const response = await fetch(url + "/tickets");
    const tickets = await response.json();

    document.getElementById("todo-cards").innerHTML = "";
    document.getElementById("doing-cards").innerHTML = "";
    document.getElementById("done-cards").innerHTML = "";

    tickets.forEach((ticket) => {
      const ticketElement = createTicketHTML(ticket);

      if (ticket.status === "todo") {
        document.getElementById("todo-cards").appendChild(ticketElement);
      } else if (ticket.status === "doing") {
        document.getElementById("doing-cards").appendChild(ticketElement);
      } else if (ticket.status === "done") {
        document.getElementById("done-cards").appendChild(ticketElement);
      }
    });
  } catch (error) {
    console.error("Erreur lors du chargement des tickets :", error);
    alert("Impossible de charger les tickets.");
  }
}

function createTicketHTML(ticket) {
  const div = document.createElement("div");
  div.className = "ticket";

  div.innerHTML = `
    <h4>${ticket.title}</h4>
    <p>${ticket.content}</p>

    <div class="actions">
      ${
        ticket.status !== "doing"
          ? `<button onclick="updateStatus('${ticket._id}', 'doing')">➔ En cours</button>`
          : ""
      }
      ${
        ticket.status !== "done"
          ? `<button onclick="updateStatus('${ticket._id}', 'done')">➔ Terminé</button>`
          : ""
      }
      <button class="delete-btn" onclick="deleteTicket('${ticket._id}')">
        Supprimer
      </button>
    </div>
  `;

  return div;
}

async function createTicket() {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title || !content) {
    alert("Veuillez remplir le titre et la description.");
    return;
  }

  try {
    const response = await fetch(url + "/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      const data = await response.json();
      alert(data.error || "Erreur lors de la création du ticket.");
      return;
    }

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    loadTickets();
  } catch (error) {
    console.error("Erreur création ticket :", error);
    alert("Erreur serveur.");
  }
}
document.querySelector("button").addEventListener("click", createTicket);

async function updateStatus(ticketId, status) {
  try {
    await fetch(url + `/tickets/${ticketId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    loadTickets();
  } catch (error) {
    console.error("Erreur changement de statut :", error);
    alert("Impossible de changer le statut.");
  }
}

async function assignEmployee(ticketId, employeeId) {
  try {
    await fetch(url + `/tickets/${ticketId}/assign`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employeeId }),
    });

    loadTickets();
  } catch (error) {
    console.error("Erreur assignation :", error);
    alert("Impossible d’assigner l’employé.");
  }
}

async function deleteTicket(ticketId) {
  if (!confirm("Voulez-vous vraiment supprimer ce ticket ?")) return;

  try {
    await fetch(url + `/tickets/${ticketId}`, {
      method: "DELETE",
    });

    loadTickets();
  } catch (error) {
    console.error("Erreur suppression :", error);
    alert("Impossible de supprimer le ticket.");
  }
}
