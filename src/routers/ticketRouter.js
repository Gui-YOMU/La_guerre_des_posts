import express from "express";
import { addTicket, deleteTicket, getTickets, updateTicket } from "../controllers/ticketController.js";

export const ticketRouter = express.Router();

ticketRouter.get("/tickets", getTickets);
ticketRouter.post("/tickets", addTicket);
ticketRouter.patch("/tickets/:id", updateTicket);
ticketRouter.delete("/tickets/:id", deleteTicket);