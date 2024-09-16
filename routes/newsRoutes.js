const express = require('express');
const { upload } = require('../config/multerConfig');
const News = require('../models/News');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Obtener todas las noticias
router.get('/', async (req, res) => {
    try {
        const news = await News.find();
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener una noticia por ID
router.get('/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ message: 'Noticia no encontrada' });
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Subir nueva 
router.post('/', authMiddleware, upload.single('mainImage'), async (req, res) => {
    const { title, body, category, additionalImages } = req.body;
    const mainImage = req.file.path;

    const news = new News({
        title,
        body,
        mainImage,
        category,
        additionalImages: additionalImages ? additionalImages.split(',') : []
    });

    try {
        const newNews = await news.save();
        res.status(201).json(newNews);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Editar noticia 
router.put('/:id', authMiddleware, upload.single('mainImage'), async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ message: 'Noticia no encontrada' });

        // Actualizar campos
        news.title = req.body.title || news.title;
        news.body = req.body.body || news.body;
        news.category = req.body.category || news.category;
        
        if (req.file) {
            news.mainImage = req.file.path; // Si se sube una nueva imagen
        }

        if (req.body.additionalImages) {
            news.additionalImages = req.body.additionalImages.split(',');
        }

        const updatedNews = await news.save();
        res.json(updatedNews);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar noticia
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ message: 'Noticia no encontrada' });

        await news.remove();
        res.json({ message: 'Noticia eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
