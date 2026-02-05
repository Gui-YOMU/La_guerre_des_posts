import mongoose from "mongoose";
import { Ticket } from "../models/ticket.js";

export async function getTickets(req, res) {
  try {
    //const { id, role } = req.user;
    const role = "employe"; // ou admin ou employe temporaire pour le test
    const employeeId = "698349f6792f119cbc759e76";

    const filter = role === "admin" ? {} : { employee: employeeId };

    const tickets = await Ticket.find(filter).sort({ createdAt: -1 });

    res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "La requête d'affichage a échoué.",
    });
  }
}

export const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;

    // Simulation en attendant la connexion
    const role = "employe"; //ou admin
    const employeeId = "698349f6792f119cbc759e7";

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Identifiant du ticket invalide.",
      });
    }

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({
        error: "Ticket introuvable.",
      });
    }

    if (
      role !== "admin" &&
      (!ticket.employee || ticket.employee.toString() !== employeeId)
    ) {
      return res.status(403).json({
        error: "Accès interdit à ce ticket",
      });
    }

    return res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erreur lors du chargement du ticket.",
    });
  }
};

// pas forcément utile pour l'admin qui peut mettre à jour tout le ticket
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    //temporaire on simule l'id de l'employé
    const employeeId = "698349f6792f119cbc759e76";

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Identifiant du ticket invalide.",
      });
    }

    if (!["todo", "doing", "done"].includes(status)) {
      return res.status(400).json({
        error: "Statut invalide.",
      });
    }

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({
        error: "Ticket introuvable.",
      });
    }

    if (!ticket.employee || ticket.employee.toString() !== employeeId) {
      return res.status(403).json({
        error: "Accès interdit à ce ticket.",
      });
    }

    ticket.status = status;
    await ticket.save();

    return res.status(200).json(ticket);
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors du changement de statut.",
    });
  }
};
