const bcrypt = require('bcryptjs');

async function testHash() {
    try {
        const password = 'prueba'; // Contraseña para comparar
        const storedHash = '$2a$12$j3YHB9pPbCDghumJ4BozXOclquR57ijBghNtnu6OLCLKopzC0o3IW'; // Hash almacenado en la base de datos

        console.log("Contraseña proporcionada:", password);
        console.log("Hash almacenado:", storedHash);

        // Comparar la contraseña con el hash almacenado
        const isMatch = await bcrypt.compare(password, storedHash);
        console.log("¿Las contraseñas coinciden?", isMatch); // Debería ser true si el hash es correcto
    } catch (err) {
        console.error("Error al comparar el hash:", err);
    }
}

testHash();
