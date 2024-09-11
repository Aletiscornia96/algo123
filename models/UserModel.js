const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },

    username: {
        type: String,
        required: [true, "Your username is required"],
    },

    password: {
        type: String,
        required: [true, "Your password is required"],
    },

    createdAt: {
        type: Date,
        default: new Date(),
    },
});

// Middleware `pre-save` para hashear la contraseña antes de guardar el usuario
userSchema.pre("save", async function (next) {
    // Verifica si la contraseña ha sido modificada o si el documento es nuevo
    if (this.isModified("password") || this.isNew) {
        try {
            // Hashear la contraseña
            this.password = await bcrypt.hash(this.password, 12);
            console.log('Hash generado durante el registro:', this.password);
        } catch (err) {
            return next(err);
        }
    }
    // Continúa con la operación de guardado
    next();
});

// Exporta el modelo
module.exports = mongoose.model("User", userSchema);
