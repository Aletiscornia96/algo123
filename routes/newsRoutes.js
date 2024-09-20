const express = require('express');
const router = express.Router();
const { getAllNews, createNews, updateNews, deleteNews } = require('../controllers/newsController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, getAllNews);
router.post('/', auth, createNews);
router.put('/:id', auth, updateNews);
router.delete('/:id', auth, deleteNews);

module.exports = router;
