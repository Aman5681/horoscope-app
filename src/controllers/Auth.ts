import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../services/Users';
import { Utils } from '../utils/Utils';
import { IUser } from '../models/Users';

export class AuthController {
  private userService = UserService.getInstance();
  /**
     * @swagger
     * /auth/signup:
     *   post:
     *     summary: Signup a new user
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *               birthdate:
     *                 type: string
     *     responses:
     *       201:
     *         description: User signed up
     */
  public async signup(req: Request, res: Response): Promise<void> {
    const { name, email, password, birthdate } = req.body;
    // birthdate in mm-dd-yyyy format
    const zodiac = Utils.getZodiacSign(birthdate);
    try {
      const user = await this.userService.createUser({ name, email, password, birthdate, zodiac } as IUser);
      const token = jwt.sign({ userId: user.userId, zodiac }, process.env.JWT_SECRET!, { expiresIn: '1d' });
      res.status(201).json({ token, message: `Your Zodiac sign is ${zodiac}` });
    } catch (err: any) {
      await this.userService.userRollBack(email)
      res.status(500).json({ message: 'Signup failed', error: err.message });
    }
  }

  /**
     * @swagger
     * /auth/login:
     *   post:
     *     summary: Login a user
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Login successful
     *       401:
     *         description: Login failed
     */
  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const user = await this.userService.validateUser(email, password);
      const token = jwt.sign({ userId: user.userId, zodiac: user.zodiac }, process.env.JWT_SECRET!, { expiresIn: '1d' });
      res.status(200).json({ token });
    } catch (err: any) {
      res.status(401).json({ message: 'Login failed', error: err.message });
    }
  }
}