
import express from "express";

import {ajouterEmploye, 
        recupererEmployes, 
        recupererUnEmploye, 
        modifierUnEmploye, 
        supprimerUnEmploye, 
        loginByMail
    } from "../controllers/employeController.js"

export const employeRouter = express.Router();


employeRouter.post("/employe", ajouterEmploye) //creer


employeRouter.get("/employe", recupererEmployes) // liste
employeRouter.get("/employe/:id", recupererUnEmploye) 
employeRouter.post("/login",loginByMail) //connexion

employeRouter.patch("/employe/:id", modifierUnEmploye)

employeRouter.delete("/employe/:id", supprimerUnEmploye)

