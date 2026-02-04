import express from "express";
import {
  getTickets,
  getTicketById,
  updateStatus,
} from "../controllers/ticketController.js";

export const ticketRouter = express.Router();

ticketRouter.get("/", getTickets);
ticketRouter.get("/:id", getTicketById);
ticketRouter.patch("/:id/status", updateStatus);
