import express from "express";
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Gelen dosyaların nereye kaydedileceğini belirle
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
});
  
const upload = multer({ storage: storage });
  
  // Upload endpoint'i
router.post('/', upload.single('photo'), (req, res) => {
    res.json({ message: 'Fotoğraf başarıyla yüklendi.' });
});

export default router;
