const News = require('../models/newsModel');
const parseForm = require('../utils/formidable');
const path = require('path');

// Crear una nueva noticia
exports.createNews = async (req, res) => {
  try {
    const { fields, files } = await parseForm(req);

    // Guardar la URL de la imagen principal
    const mainImageUrl = `/uploads/${path.basename(files.mainImage.path)}`;

    // Guardar URLs de los archivos multimedia adicionales (imágenes, videos)
    const additionalMediaUrls = [];
    if (files.additionalMedia) {
      if (Array.isArray(files.additionalMedia)) {
        for (const file of files.additionalMedia) {
          additionalMediaUrls.push(`/uploads/${path.basename(file.path)}`);
        }
      } else {
        additionalMediaUrls.push(`/uploads/${path.basename(files.additionalMedia.path)}`);
      }
    }

    // Crear nueva noticia en la base de datos
    const newNews = new News({
      title: fields.title,
      category: fields.category,
      mainImage: mainImageUrl,
      body: fields.body,
      additionalMedia: additionalMediaUrls,
      order: fields.order || 0,
      isActive: fields.isActive || true,
    });

    await newNews.save();
    res.status(201).json(newNews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al crear la noticia' });
  }
};

// Obtener todas las noticias (activos y no activos)
exports.getAllNews = async (req, res) => {
  try {
    const newsList = await News.find().sort({ order: 1 });
    res.json(newsList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener las noticias' });
  }
};

// Obtener una noticia por ID
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ msg: 'Noticia no encontrada' });
    }
    res.json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener la noticia' });
  }
};

// Actualizar una noticia existente
exports.updateNews = async (req, res) => {
  try {
    const { fields, files } = await parseForm(req);
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ msg: 'Noticia no encontrada' });
    }

    // Actualizar los campos de texto
    news.title = fields.title || news.title;
    news.category = fields.category || news.category;
    news.body = fields.body || news.body;
    news.order = fields.order || news.order;
    news.isActive = fields.isActive !== undefined ? fields.isActive : news.isActive;

    // Si se sube una nueva imagen principal, reemplazarla
    if (files.mainImage) {
      const mainImageUrl = `/uploads/${path.basename(files.mainImage.path)}`;
      news.mainImage = mainImageUrl;
    }

    // Si se suben nuevos archivos multimedia adicionales, reemplazar los existentes
    if (files.additionalMedia) {
      const additionalMediaUrls = [];
      if (Array.isArray(files.additionalMedia)) {
        for (const file of files.additionalMedia) {
          additionalMediaUrls.push(`/uploads/${path.basename(file.path)}`);
        }
      } else {
        additionalMediaUrls.push(`/uploads/${path.basename(files.additionalMedia.path)}`);
      }
      news.additionalMedia = additionalMediaUrls;
    }

    await news.save();
    res.json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar la noticia' });
  }
};

// Eliminar una noticia
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ msg: 'Noticia no encontrada' });
    }

    await news.remove();
    res.json({ msg: 'Noticia eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar la noticia' });
  }
};

// Cambiar el estado activo/inactivo de una noticia
exports.toggleNewsStatus = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ msg: 'Noticia no encontrada' });
    }

    news.isActive = !news.isActive;
    await news.save();
    res.json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al cambiar el estado de la noticia' });
  }
};
