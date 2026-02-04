import express from "express";

import {
  ajouterEmploye,
  recupererEmployes,
  recupererUnEmploye,
  modifierUnEmploye,
  supprimerUnEmploye,
} from "../controllers/employeController.js";

export const employeRouter = express.Router();

employeRouter.post("/", ajouterEmploye); //creer

employeRouter.get("/", recupererEmployes); // liste
employeRouter.get("/:id", recupererUnEmploye);

employeRouter.patch("/:id", modifierUnEmploye);

employeRouter.delete("/:id", supprimerUnEmploye);
