import express from "express";

import {ajouterEmploye, 
        recupererEmployes, 
        recupererUnEmploye, 
        modifierUnEmploye, 
        supprimerUnEmploye, 
        loginByMail
    } from "../controllers/employeController.js"
import {
  ajouterEmploye,
  recupererEmployes,
  recupererUnEmploye,
  modifierUnEmploye,
  supprimerUnEmploye,
} from "../controllers/employeController.js";

export const employeRouter = express.Router();

employeRouter.post("/", ajouterEmploye); //creer

employeRouter.post("/employe", ajouterEmploye) //creer
employeRouter.post("/login",loginByMail) //connexion

employeRouter.get("/employe", recupererEmployes) // liste
employeRouter.get("/employe/:id", recupererUnEmploye) 

employeRouter.patch("/employe/:id", modifierUnEmploye)
employeRouter.get("/", recupererEmployes); // liste
employeRouter.get("/:id", recupererUnEmploye);

employeRouter.patch("/:id", modifierUnEmploye);

employeRouter.delete("/:id", supprimerUnEmploye);
