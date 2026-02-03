
import mongoose from "mongoose";

const ticketModel = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Un titre est requis."]
    },
    content: {
        type: String,
        required: [true, "Une description est requise."]
    },
    category: {
        type: String, default: "todo"
    },
    employee: {
        type: String
    }
})

export const Ticket = mongoose.model("tickets", ticketModel);

