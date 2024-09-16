const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Crear un nuevo administrador (solo para pruebas)
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'El administrador ya existe.' });
        }

        // Crear el nuevo administrador
        const admin = new Admin({ username, password });
        await admin.save();

        res.status(201).json({ message: 'Administrador creado con éxito.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login del administrador
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscar el administrador por su nombre de usuario
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos.' });
        }

        // Comparar la contraseña
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos.' });
        }

        // Generar el token JWT
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, message: 'Login exitoso.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
