import { connect, Types } from "mongoose";


export const connectDB = async () => {
    const URL = "mongodb+srv://Galo-Glattstein:MongoDB3006@cluster0.ev097.mongodb.net/Products";

    try {
        await connect(URL);
        console.log("Conected to MongoDB");
    } catch (error) {
        console.log("Error al conectar con MongoDB", error.message);
    }
};

// Verifica que un ID sea válido con el formato de ObjectId de MongoDB
export const isValidID = (id) => {
    return Types.ObjectId.isValid(id);
};