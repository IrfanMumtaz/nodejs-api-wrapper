import { Router } from 'express';
import Validation from '@middlewares/ValidationMiddleware';
import HomeController from '@controllers/HomeController';
import HealthController from '@controllers/HealthController';
import UserRequest from '@requests/UserRequest';
import Security from '@config/Security';

const router: Router = Router();

const homeController = new HomeController();
const healthController = new HealthController();

// Health check routes
router.get('/health', (req, res) => healthController.healthCheck(req, res));
router.get('/ready', (req, res) => healthController.readinessCheck(req, res));
router.get('/live', (req, res) => healthController.livenessCheck(req, res));

// API routes with route-specific rate limiting
router.get('/collection', (req, res) =>
  homeController.getCollectionResponse(req, res)
);
router.post(
  '/single',
  Security.createRouteSpecificLimiter(10, 60000), // 10 requests per minute
  Validation.validate(UserRequest),
  (req, res) => homeController.getSingleResponse(req, res)
);
router.get('/error', (req, res) => homeController.getErrorResponse(req, res));

export default router;
