import mongoose from "mongoose";
import { Ticket } from "../models/ticket.js";

export async function getTickets(req, res) {
  try {
    const { employee, role } = req.query;
    let filter = {};

    if (role !== "admin" && employee) {
      filter = { employee };
    }

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
    const { employee, role } = req.query;

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

    if (role !== "admin" && ticket.employee.toString() !== employee) {
      return res.status(403).json({
        error: "Accès interdit à ce ticket.",
      });
    }

    return res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur récupération ticket.",
    });
  }
};

// pas forcément utile pour l'admin qui peut mettre à jour tout le ticket
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { employee, role } = req.query;

    // id valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Identifiant du ticket invalide.",
      });
    }

    // status valide
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

    if (role !== "admin" && ticket.employee.toString() !== employee) {
      return res.status(403).json({
        error: "Accès interdit à ce ticket.",
      });
    }

    ticket.status = status;
    await ticket.save();

    return res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur mise à jour ticket.",
    });
  }
};
