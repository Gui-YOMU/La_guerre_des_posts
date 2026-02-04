import mongoose from "mongoose";
import bcrypt from "bcrypt";

const employeSchema = mongoose.Schema(
  {
    lastname: {
      type: String,
      minlength: 2,
      required: [true, "Le nom est obligatoire"],
      match: [/^[a-zA-Z\s]{2,30}$/, "Le nom n'est pas valide"],
    },

    firstname: {
      type: String,
      minlength: 2,
      required: [true, "Le prénom est obligatoire"],
      match: [/^[a-zA-Z\s]{2,30}$/, "Le prénom n'est pas valide"],
    },

    email: {
      type: String,
      required: [true, "L'email est obligatoire"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Format d'email invalide"],
    },

    motDePasse: {
      type: String,
      required: [true, "Le mot de passe est obligatoire"],
      match: [
        /^(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Le mot de passe doit contenir 8 caractères, une majuscule et un chiffre",
      ],
      select: false,
    },
  },
  { timestamps: true },
);

employeSchema.pre("save", async function (next) {
  if (!this.isModified("motDePasse")) return next();

  const salt = await bcrypt.genSalt(10);
  this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
  next();
});

export const Employe = mongoose.model("Employe", employeSchema);
