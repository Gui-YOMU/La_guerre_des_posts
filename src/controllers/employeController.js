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
