import express from 'express';
import { HoroscopeController } from '../controllers/HoroscopeConteoller';
import { AuthMiddleware } from '../middleware/Auth';
import { RateLimiter } from '../middleware/RateLimit';

const router = express.Router();
const horoscopeController = new HoroscopeController();

router.use(AuthMiddleware.authenticateJWT);
router.use(RateLimiter.getLimiter());

router.get('/today', horoscopeController.getToday.bind(horoscopeController));
router.get('/history', horoscopeController.getHistory.bind(horoscopeController));

export default router;
