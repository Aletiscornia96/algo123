const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel')
const router = express.Router();
const secret = process.env.TOKEN_KEY || 'secretKey'; 

// Crear un nuevo administrador (solo para pruebas)
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'El administrador ya existe.' });
        }

        // Encriptar la contraseña antes de guardar
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo administrador
        const admin = new Admin({ username, password: hashedPassword });
        await admin.save();

        res.status(201).json({ message: 'Administrador creado con éxito.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Inicio de sesión del administrador
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verificar si el administrador existe
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(404).json({ message: 'Administrador no encontrado.' });
        }

        // Comparar la contraseña ingresada con la encriptada
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta.' });
        }

        // Generar un token JWT
        const token = jwt.sign({ id: admin._id, username: admin.username }, secret, { expiresIn: '1h' });

        res.status(200).json({ token, message: 'Inicio de sesión exitoso.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
