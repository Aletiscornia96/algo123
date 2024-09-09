const bcrypt = require('bcryptjs');

async function generateNewHash() {
    try {
        const password = 'prueba';
        const newHash = await bcrypt.hash(password, 12); // Generar un nuevo hash
        console.log("Nuevo hash generado:", newHash);

        // Comparar el nuevo hash con la contraseña
        const isMatch = await bcrypt.compare(password, newHash);
        console.log("¿Las contraseñas coinciden con el nuevo hash?", isMatch); // Debería ser true
    } catch (err) {
        console.error("Error al generar y comparar el nuevo hash:", err);
    }
}

generateNewHash();
