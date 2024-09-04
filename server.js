const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5000;

// Conectar a MongoDB
mongoose.connect('mongodb://<usuario>:<contraseña>@<host>:<puerto>/<base_de_datos>', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de Multer para la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Rutas
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
