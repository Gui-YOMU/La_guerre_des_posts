import mongoose from "mongoose";
import { Employe } from "../models/employe.js";
import bcrypt from "bcrypt";

// ➕ Créer un employé
export async function ajouterEmploye(req, res) {
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

// 📋 Récupérer tous les employés
export async function recupererEmployes(req, res) {
  try {
    const employes = await Employe.find();
    res.json(employes);
  } catch (error) {
    console.error(error);
    res.json({ ok: false, error });
  }
}

// 🔐 Login employé
export async function loginByMail(req, res) {
  try {
    const { email, motDePasse } = req.body;

    const employLogin = await Employe.findOne({ email }).select(
      "motDePasse email firstname lastname",
    );

    if (!employLogin) {
      throw new Error("Adresse mail introuvable");
    }

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
    });
  } catch (error) {
    console.error(error);
    res.json({ ok: false, error: error.message });
  }
}

// 🔍 Récupérer un employé
export async function recupererUnEmploye(req, res) {
  const id = req.params.id;
  try {
    const employe = await Employe.findById(id);
    res.json(employe);
  } catch (error) {
    console.error(error);
    res.json({ ok: false, error });
  }
}

// ✏️ Modifier un employé
export async function modifierUnEmploye(req, res) {
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

// ❌ Supprimer un employé
export async function supprimerUnEmploye(req, res) {
  const id = req.params.id;
  try {
    const employe = await Employe.deleteOne({ _id: id });
    res.json(employe);
  } catch (error) {
    console.error(error);
    res.json({ ok: false, error });
  }
}
