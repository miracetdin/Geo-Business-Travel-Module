import { Router } from 'express';

// routes
import auth from './auth';
import travel from './travel';

const router = Router();

router.get('/', (req, res) => {
  res.end('hey');
});

router.use('/auth', auth);
router.use('/travel', travel);

export default router;
