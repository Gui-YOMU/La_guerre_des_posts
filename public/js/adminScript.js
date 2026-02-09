const idAdmin = sessionStorage.getItem("id");
const logout = document.getElementById("logout");
let employeesMap = {};

if (!idAdmin) {
  window.location.href = "/src/views/login.html";
}
+logout.addEventListener("click", () => {
  sessionStorage.clear();
  window.location.href = "/src/views/login.html";
});

document.addEventListener("DOMContentLoaded", () => {
  loadTickets();
});

const url = "http://localhost:3000/admin";

async function loadTickets() {
  try {
    const response = await fetch("http://localhost:3000/tickets");
    const tickets = await response.json();

    const unassigned = document.getElementById("unassigned");
    const assigned = document.getElementById("assigned");

    unassigned.innerHTML = "";
    assigned.innerHTML = "";

    tickets.forEach((ticket) => {
      const ticketElement = createTicketHTML(ticket);

      if (ticket.employee) {
        assigned.appendChild(ticketElement);
      } else {
        unassigned.appendChild(ticketElement);
      }
    });
  } catch (error) {
    alert("Impossible de charger les tickets.");
  }
}

function createTicketHTML(ticket) {
  const div = document.createElement("div");
  div.className = "ticket";

  let employeeName = "";

  if (ticket.employee) {
    employeeName = employeesMap[ticket.employee] || ticket.employee;
  }

  div.innerHTML = `
    <h4>${ticket.title}</h4>
    <p>${ticket.content}</p>
    ${
      ticket.employee
        ? `<span class="badge">Assigné à ${employeeName}</span>`
        : `<button class="assign-btn">Assigner</button>`
    }
    <button class="delete-btn" data-id="${ticket._id}">Supprimer</button>
  `;

  return div;
}

async function createTicket() {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  const employee = document.getElementById("employeeSelect")?.value || null;

  if (!title) {
    alert("Titre requis");
    return;
  }

  try {
    const response = await fetch(url + "/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, employee }),
    });

    if (!response.ok) {
      alert("Erreur création");
      return;
    }

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    loadTickets();
  } catch (error) {
    console.error(error);
  }
}

document
  .querySelector("#createTicketBtn")
  .addEventListener("click", createTicket);

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

async function openAssign(ticketId) {
  const employeeId = prompt("ID de l'employé :");

  if (!employeeId) return;

  await assignEmployee(ticketId, employeeId);
}

async function loadEmployees() {
  try {
    const res = await fetch("http://localhost:3000/employe");
    const employees = await res.json();

    employees.forEach((emp) => {
      employeesMap[emp._id] = emp.lastname; // ou emp.username
    });
  } catch (e) {
    console.error("Erreur chargement employés");
  }
}

async function init() {
  await loadEmployees();
  await loadTickets();

  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const id = e.target.dataset.id;

      const confirmDelete = confirm("Supprimer ce ticket ?");
      if (!confirmDelete) return;

      try {
        await fetch(`http://localhost:3000/admin/tickets/${id}`, {
          method: "DELETE",
        });

        await loadTickets();
      } catch (err) {
        alert("Erreur suppression");
      }
    }
  });
}

init();
