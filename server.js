const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");
require("dotenv").config();

const { MONGO_URL, PORT } = process.env;
const path = require('path');


// Conectar a MongoDB
mongoose.connect(MONGO_URL)
    .then(() => console.log('MongoDB is  connected successfully'))
    .catch(err => console.error(err));

app.use(
    cors({
        origin: ["http://localhost:4000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});


app.use("/", authRoute);
