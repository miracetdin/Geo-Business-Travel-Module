import { Router } from 'express';

// helpers
import { verifyAccessToken } from '../helpers/jwt';

// routes
import auth from './auth';
import travel from './travel';
// import order from './order';

const router = Router();

router.get('/', (req, res) => {
  res.end('hey');
});

router.use('/auth', auth);
router.use('/travel', travel);
// router.use('/order', verifyAccessToken, order);

export default router;
