import mongoose from "mongoose";

const employeSchema = mongoose.Schema({

    lastname: {
        type: String,
        minlength: 2,
        required: [true, "Le nom est obligatoire"]
    },

    firstname: {
        type: String,
        minlength: 2,
        required: [true, "Le prénom est obligatoire"]
    },

    email:{
        type:String,
        minlength:6,
        required: [true,"L'email est obligatoire"]
    },

    password: {
        type: String, 
        minlength: 5,
        required: [true, "Le mot de passe est obligatoire"]

    }
    

})

export const Employe = mongoose.model("employe", employeSchema)