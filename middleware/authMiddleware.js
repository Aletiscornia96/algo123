const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, token no proporcionado.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = verified; // Decodificar el token y guardar el payload
        next(); // Continuar
    } catch (err) {
        res.status(400).json({ message: 'Token no válido.' });
    }
}

module.exports = authMiddleware;
