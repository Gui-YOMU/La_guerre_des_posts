import mongoose from "mongoose";
import { Ticket } from "../models/ticket.js";

const STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const ALLOWED_STATUS = ["todo", "doing", "done"];
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// --- ADMIN CRUD ---

export const createTicket = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (
      !title ||
      typeof title !== "string" ||
      title.trim().length < 3 ||
      title.trim().length > 50
    ) {
      return res.status(STATUS.BAD_REQUEST).json({
        error: "Le titre doit contenir entre 3 et 50 caractères.",
      });
    }

    if (
      !content ||
      typeof content !== "string" ||
      content.trim().length < 3 ||
      content.trim().length > 500
    ) {
      return res.status(STATUS.BAD_REQUEST).json({
        error: "Le contenu doit contenir entre 3 et 500 caractères.",
      });
    }

    const newTicket = new Ticket({
      title: title.trim(),
      content: content.trim(),
      category: "todo",
    });

    await newTicket.save();
    return res.status(STATUS.CREATED).json(newTicket);
  } catch (error) {
    return res.status(STATUS.SERVER_ERROR).json({
      error: "Erreur lors de la création du ticket.",
    });
  }
};

/*export const listTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    return res.status(STATUS.OK).json(tickets);
  } catch (error) {
    return res.status(STATUS.SERVER_ERROR).json({
      error: "Impossible de charger la liste des tickets.",
    });
  }
};*/

export const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(STATUS.BAD_REQUEST).json({
        error: "Identifiant du ticket invalide.",
      });
    }

    const updates = {};
    if (typeof req.body.title === "string")
      updates.title = req.body.title.trim();
    if (typeof req.body.content === "string")
      updates.content = req.body.content.trim();

    const updated = await Ticket.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(STATUS.NOT_FOUND).json({
        error: "Ticket introuvable.",
      });
    }

    return res.status(STATUS.OK).json(updated);
  } catch (error) {
    return res.status(STATUS.BAD_REQUEST).json({
      error: "Échec de la modification du ticket.",
    });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(STATUS.BAD_REQUEST).json({
        error: "Identifiant du ticket invalide.",
      });
    }

    const deleted = await Ticket.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(STATUS.NOT_FOUND).json({
        error: "Ticket introuvable.",
      });
    }

    return res.status(STATUS.OK).json({
      message: "Ticket supprimé avec succès.",
    });
  } catch (error) {
    return res.status(STATUS.BAD_REQUEST).json({
      error: "Erreur lors de la suppression du ticket.",
    });
  }
};

// --- ADMIN ACTIONS ---

export const assignEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { employeeId } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(STATUS.BAD_REQUEST).json({
        error: "Identifiant du ticket invalide.",
      });
    }

    if (!employeeId || !isValidObjectId(employeeId)) {
      return res.status(STATUS.BAD_REQUEST).json({
        error: "Identifiant de l’employé invalide.",
      });
    }

    const updated = await Ticket.findByIdAndUpdate(
      id,
      { employee: employeeId },
      { new: true, runValidators: true },
    );

    if (!updated) {
      return res.status(STATUS.NOT_FOUND).json({
        error: "Ticket introuvable.",
      });
    }

    return res.status(STATUS.OK).json(updated);
  } catch (error) {
    console.error("ASSIGN ERROR =", error);

    return res.status(500).json({
      error: error.message,
    });
  }
};
