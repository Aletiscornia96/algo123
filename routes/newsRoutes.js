const express = require('express');
const router = express.Router();
const News = require('../models/News');

// Crear una nueva noticia
router.post('/', async (req, res) => {
    const { title, mainImage, body } = req.body;
    try {
        const news = new News({ title, mainImage, body });
            await news.save();
        res.status(201).json(news);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Obtener todas las noticias
router.get('/', async (req, res) => {
    try {
        const news = await News.find().sort({ date: -1 });
        res.json(news);
    } catch (err) {
        es.status(400).json({ error: err.message });
    }
});

module.exports = router;
