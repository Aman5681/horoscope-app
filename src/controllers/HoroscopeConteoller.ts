import { Response } from 'express';
import { AuthRequest } from '../middleware/Auth';
import { UserHoroscopeService } from '../services/UserHoroscope';
import { IUserHoroscope } from '../models/UserHoroscope';

export class HoroscopeController {

  private userHoroscopeService = UserHoroscopeService.getInstance();

  /**
     * @swagger
     * /horoscope/today:
     *   get:
     *     summary: Get today's horoscope for the logged-in user
     *     tags: [Horoscope]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Returns today's horoscope
     */
  public async getToday(req: AuthRequest, res: Response): Promise<void> {
    const { userId, zodiac } = req.user;
    const horoscope = await this.userHoroscopeService.getHoroscopeAndLog(zodiac, userId);
    res.json({ zodiac, date: new Date().toISOString().slice(0, 10), horoscope });
  }

  /**
     * @swagger
     * /horoscope/history:
     *   get:
     *     summary: Get 7-day horoscope history for the logged-in user
     *     tags: [Horoscope]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Returns an array of past horoscopes
     */
  public async getHistory(req: AuthRequest, res: Response): Promise<void> {
    const { userId } = req.user;
    const history = await this.userHoroscopeService.getHoroscopeHistory(userId)
    res.json(history);
  }
}