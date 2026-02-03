import express from "express";
import * as adminController from "../controllers/administrateurController.js";

const router = express.Router();

// Admin CRUD tickets
router.post("/tickets", adminController.createTicket);
router.get("/tickets", adminController.listTickets);
router.get("/tickets/:id", adminController.getTicketById);
router.put("/tickets/:id", adminController.updateTicket);
router.delete("/tickets/:id", adminController.deleteTicket);

// Admin actions
router.patch("/tickets/:id/assign", adminController.assignEmployee);
router.patch("/tickets/:id/status", adminController.updateStatus);

export default router;



