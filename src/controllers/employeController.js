import { Employe } from "../models/employe.js";
import bcrypt from "bcrypt";


export async function ajouterEmploye(req, res) { // ok
    try {
        const data = req.body;
        const employe = new Employe(data)
        await employe.save();
        res.json({ ok: true });

    } catch (error) {
        console.error(error);
        res.json({ ok: false, error })
    }
}

export async function recupererEmployes(req, res) { // OK
    try {
        const employe = await Employe.find()
        res.json(employe)

    } catch (error) {
        console.error(error);
        res.json({ ok: false, error })
    }
import mongoose from "mongoose";
import { Employe } from "../models/employe.js";

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
  // OK
  try {
    const employe = await Employe.find();
    res.json(employe);
  } catch (error) {
    console.error(error);
    res.json({ ok: false, error });
  }
}
export async function loginByMail(req, res) {
    try {

        const { email, motDePasse } = req.body
        const employLogin = await Employe.findOne({ email }).select('motDePasse email lastname firstname')
        
        if (!employLogin) {
            throw new Error("Adresse mail introuvable");
        }

        const passwordValid = await bcrypt.compare(motDePasse, employLogin.motDePasse)

        if (!passwordValid) {
            throw new Error("Erreur mot de passe");
        }
        
        res.json({
            ok: true,
            message: "connexion réussi",
            id: employLogin._id,
            lastname: employLogin.lastname,
            firstname: employLogin.firstname 
        })
    } catch (error) {
        console.error(error);
        res.json({ ok: false, error })
    }
}
export async function recupererUnEmploye(req, res) { // OK
    const id = req.params.id;
    try {
        const employe = await Employe.findOne({ _id: id })
        res.json(employe);

    } catch (error) {
        console.error(error);
        res.json({ ok: false, error })

    }
}

export async function modifierUnEmploye(req, res) { // OK
    const id = req.params.id;
    const data = req.body;
    try {
        const employe = await Employe.updateOne({ _id: id }, data)
        res.json(employe)

    } catch (error) {
        console.error(error);
        res.json({ ok: false, error })

    }
}

export async function supprimerUnEmploye(req, res) { // OK
    const id = req.params.id;
    try {
        const employe = await Employe.deleteOne({ _id: id })
        res.json(employe);

    } catch (error) {
        console.error(error);
        res.json({ ok: false, error })

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
