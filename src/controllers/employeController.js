import mongoose from "mongoose";
import { Employe } from "../models/employe.js";
import bcrypt from "bcrypt";
import { Admin } from "../models/administrateur.js";

export async function ajouterEmploye(req, res) {
  // ok
  try {
    const data = req.body;
    const employe = new Employe(data);
    await employe.save();
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.json({ ok: false, error });
  }
}

export async function recupererEmployes(req, res) {
  try {
    const employes = await Employe.find();
    res.json(employes);
  } catch (error) {
    console.error(error);
    res.json({ ok: false, error });
  }
}

export async function loginByMail(req, res) {
  try {
    const { email, motDePasse } = req.body;

    const employLogin = await Employe.findOne({ email }).select(
      "motDePasse email firstname lastname",
    );

    if (!employLogin) {
      const adminLogin = await Admin.findOne({ email }).select(
      "motDePasse email firstname lastname");
 
      if(!adminLogin){
        throw new Error("Adresse mail introuvable");
      }
      // connexion Admin
        res.json({
          ok: true,
          message: "Connexion réussie",
          id: adminLogin._id,
          lastname: adminLogin.lastname,
          firstname: adminLogin.firstname,
          role:"admin"
        });
      
    }
    // connexion  Employé
    else{
          const passwordValid = await bcrypt.compare(
            motDePasse,
            employLogin.motDePasse,
          );

          if (!passwordValid) {
            throw new Error("Erreur mot de passe");
          }
          res.json({
            ok: true,
            message: "Connexion réussie",
            id: employLogin._id,
            lastname: employLogin.lastname,
            firstname: employLogin.firstname,
            role:"employe"
          });
    }



  } catch (error) {
    console.error(error);
    res.json({ ok: false, error: error.message });
  }
}

export async function recupererUnEmploye(req, res) {
  // OK
  const id = req.params.id;
  try {
    const employe = await Employe.findOne({ _id: id });
    res.json(employe);
  } catch (error) {
    console.error(error);
    res.json({ ok: false, error });
  }
}

export async function modifierUnEmploye(req, res) {
  // OK
  const id = req.params.id;
  const data = req.body;
  try {
    const employe = await Employe.updateOne({ _id: id }, data);
    res.json(employe);
  } catch (error) {
    console.error(error);
    res.json({ ok: false, error });
  }
}

export async function supprimerUnEmploye(req, res) {
  // OK
  const id = req.params.id;
  try {
    const employe = await Employe.deleteOne({ _id: id });
    res.json(employe);
  } catch (error) {
    console.error(error);
    res.json({ ok: false, error });
  }
}
