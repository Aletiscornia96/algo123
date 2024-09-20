require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const newsRoutes = require('./routes/newsRoutes');
const adminRoutes = require('./routes/adminRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/news', newsRoutes);
app.use('/api/auth', adminRoutes);
// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
