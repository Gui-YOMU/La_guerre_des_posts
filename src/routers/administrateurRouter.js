import express from "express";
import * as adminController from "../controllers/administrateurController.js";

export const administrateurRouter = express.Router();

// Admin CRUD tickets
administrateurRouter.post("/tickets", adminController.createTicket);
administrateurRouter.get("/tickets", adminController.listTickets);
administrateurRouter.get("/tickets/:id", adminController.getTicketById);
administrateurRouter.put("/tickets/:id", adminController.updateTicket);
administrateurRouter.delete("/tickets/:id", adminController.deleteTicket);

// Admin actions
administrateurRouter.patch("/tickets/:id/assign", adminController.assignEmployee);
administrateurRouter.patch("/tickets/:id/status", adminController.updateStatus);





