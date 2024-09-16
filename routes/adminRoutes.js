const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const adminUser = {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD_HASH // Guardar la contraseña hasheada
};

// Iniciar sesión como administrador
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (username !== adminUser.username) {
        return res.status(401).json({ message: "Usuario incorrecto" });
    }

    const isMatch = await bcrypt.compare(password, adminUser.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ username: adminUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
