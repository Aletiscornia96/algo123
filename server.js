const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");
require("dotenv").config();

const { MONGO_URL, PORT } = process.env;
const path = require('path');
// const newsRoutes = require('./routes/news');


// Conectar a MongoDB
mongoose.connect(MONGO_URL)
    .then(() => console.log('MongoDB is  connected successfully'))
    .catch(err => console.error(err));

// Middleware
// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));

// // Configuración de Multer para la carga de archivos
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//     }
// });
// const upload = multer({ storage });

// // Rutas
// app.post('/upload', upload.single('file'), (req, res) => {
//     res.json({ file: req.file });
// });

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});


// app.use('/news', newsRoutes);
app.use(
    cors({
        origin: ["http://localhost:4000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);
