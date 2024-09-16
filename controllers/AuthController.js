const Admin = require("../models/AdminModel");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("Cuerpo de la solicitud:", req.body);

        if (!username || !password) {
            console.log("Campos vacíos");
            return res.status(400).json({ message: "All fields are required" });
        }

        const admin = await Admin.findOne({ username });
        console.log("Usuario encontrado:", admin);
        if (!admin) {
            console.log("Usuario no encontrado");
            return res.status(400).json({ message: "Incorrect password or username" });
        }

        // Verificar la contraseña
        const auth = await bcrypt.compare(password, admin.password);

        if (!auth) {
            console.log("Contraseña incorrecta");
            return res.status(400).json({ message: "Incorrect password or username" });
        }

        // Crear el token
        const token = createSecretToken(admin._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true, // Esto debería ser true por motivos de seguridad
        });

        res.status(200).json({ message: "Admin logged in successfully", success: true });
    } catch (error) {
        console.error("Error en Login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

