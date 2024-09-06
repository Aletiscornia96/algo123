const express = require('express');
const router = express.Router();
const News = require('../models/News');

// Crear una nueva noticia
router.post('/create', async (req, res) => {
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

// Modificar noticia
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, body, category } = req.body;
    try {
        const updatedNews = await News.findByIdAndUpdate(id, { title, body, category }, { new: true });
        res.status(200).json(updatedNews);
    } catch (error) {
        res.status(500).json({ message: 'Error updating news' });
    }
});

  // Eliminar noticia
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await News.findByIdAndDelete(id);
        res.status(200).json({ message: 'News deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting news' });
    }
});

module.exports = router;
