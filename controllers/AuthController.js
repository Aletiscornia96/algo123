const User = require("../models/UserModel");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res) => {
    try {
        const { email, password, username, createdAt } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Crear el usuario (el middleware `pre-save` se encargará de hashear la contraseña)
        const user = await User.create({ email, password, username, createdAt });

        // Crear el token
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true, // Esto debería ser true por motivos de seguridad
        });
        res.status(200).json({ message: "User signed up successfully", success: true, user });
    } catch (error) {
        console.error("Error en Signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Cuerpo de la solicitud:", req.body);

        if (!email || !password) {
            console.log("Campos vacíos");
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        console.log("Usuario encontrado:", user);
        if (!user) {
            console.log("Usuario no encontrado");
            return res.status(400).json({ message: "Incorrect password or email" });
        }

        // Verificar la contraseña
        const auth = await bcrypt.compare(password, user.password);

        if (!auth) {
            console.log("Contraseña incorrecta");
            return res.status(400).json({ message: "Incorrect password or email" });
        }

        // Crear el token
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true, // Esto debería ser true por motivos de seguridad
        });

        res.status(200).json({ message: "User logged in successfully", success: true });
    } catch (error) {
        console.error("Error en Login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

