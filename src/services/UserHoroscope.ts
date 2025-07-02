import horoscopes from '../data/MockHoroscopeData.json';
import { IUserHoroscope, UserHoroscopeModel } from '../models/UserHoroscope';
import { Utils } from '../utils/Utils';

export class UserHoroscopeService {
  private static instance: UserHoroscopeService;
  private constructor() { }

  public static getInstance() {
    if (!UserHoroscopeService.instance) {
      UserHoroscopeService.instance = new UserHoroscopeService();
    }
    return UserHoroscopeService.instance;
  }

  public async getHoroscopeAndLog(zodiac: string, userId: string) {
    const text = horoscopes[zodiac as keyof typeof horoscopes] || 'No horoscope available';
    const date = new Date();
    const formattedDate = Utils.getFormattedDate(date);
    const horoscopeModelObject = {
      userId,
      zodiac,
      date: formattedDate,
      horoscope: text
    } as IUserHoroscope;
    // this is to set the horoscope and date to DB to fetch history of the user.
    await UserHoroscopeModel.updateOne({ userId, date: formattedDate }, { $set: horoscopeModelObject }, { upsert: true });
    return text;
  }

  public async getHoroscopeHistory(userId: string) {
    const last7Dates = Utils.getLastNDates(7);
    return await UserHoroscopeModel.find({ userId, date: { $in: last7Dates } }).lean();
  }

}