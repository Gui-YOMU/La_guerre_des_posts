import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// import {ticketRouter} from "./routers/ticketRouter.js";
// import {administrateurRouter} from "./routers/administrateurRouter.js";
import {employeRouter} from "./routers/employeRouter.js";

const port = process.env.PORT;
const db_url = process.env.DB_URL;

mongoose.set("strictQuery", true);
mongoose.connect(db_url)
    .then(() => {
        console.log("Connecté à la base de données.");
    })
    .catch((error) => {
        console.error(error);
    })
    .finally(() => {
        console.log("Promesse tenue.");
    })

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    const message = { message: "Bonjour" };
    res.json(message)
})

// app.use(ticketRouter);
// app.use(administrateurRouter);
app.use(employeRouter);

app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.log(`Le serveur est lancé sur l'adresse http://localhost:${port}`);

    }
})