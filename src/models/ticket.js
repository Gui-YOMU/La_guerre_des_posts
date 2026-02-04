import mongoose from "mongoose";

const ticketModel = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Un titre est requis."],
    },
    content: {
      type: String,
      required: [true, "Une description est requise."],
    },
    category: {
      type: String,
      enum: ["todo", "doing", "done"],
      default: "todo",
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employe",
      default: null,
    },
  },
  { timestamps: true },
);

export const Ticket = mongoose.model("tickets", ticketModel);
