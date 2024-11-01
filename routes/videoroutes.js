const express = require('express');
const { uploadVideos, getVideos } = require('../controllers/videocontroller');
const { verifyToken } = require('../middleware/authMiddileware');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});
const upload = multer({ storage });

router.post('/upload', verifyToken, uploadVideos);
router.get('/', getVideos);

module.exports = router;
