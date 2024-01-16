import { Router } from 'express';

// routes
import auth from './auth';
import travel from './travel';
import fee from './fee';
import upload from './upload';

const router = Router();

router.get('/', (req, res) => {
  res.end('hey');
});

router.use('/auth', auth);
router.use('/travel', travel);
router.use('/fee', fee);
router.use('/upload', upload);

export default router;
