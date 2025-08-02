import { Router } from 'express';

const router: Router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Node.js API Wrapper',
    version: '1.0.0',
    status: 'running',
  });
});

export default router;
