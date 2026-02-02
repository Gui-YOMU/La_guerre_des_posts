import { Ticket } from "../models/ticket.js";

export async function getTickets(req, res) {
    try {
        const allTickets = await Ticket.find();
        res.json(allTickets);
    } catch (error) {
        console.error(error);
        res.json({ message: "La requête d'affichage a échoué." });
    }
}

export async function addTicket(req, res) {
    try {
        const newTicket = new Ticket(req.body);
        await newTicket.save();
        res.json({ message: "Le ticket a été ajouté avec succès." });
    } catch (error) {
        console.error(error);
        res.json({ message: "L'ajout du ticket a échoué." });
    }
}

export async function updateTicket(req, res) {
    try {
        const updatedTicket = new Ticket(req.body);
        await Ticket.updateOne({ _id: req.params.id }, req.body);
        res.json({ message: "Le ticket a été modifié avec succès." });
    } catch (error) {
        console.error(error);
        res.json({ message: "La modification du ticket a échoué." });
    }
}

export async function updateTicketCategory(req, res) {
    try {
        const updatedTicket = new Ticket(req.body);
        await Ticket.updateOne({ _id: req.params.id }, req.body);
        res.json({ message: "Le ticket a été déplacé avec succès." });
    } catch (error) {
        console.error(error);
        res.json({ message: "Le déplacement du ticket a échoué." });
    }
}

export async function deleteTicket(req, res) {
    try {
        await Ticket.deleteOne({ _id: req.params.id });
        res.json({ message: "Le ticket a été supprimé avec succès." });
    } catch (error) {
        console.error(error);
        res.json({ message: "La suppression du ticket a échoué." });
    }
}