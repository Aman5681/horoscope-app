import mongoose, { Document, Schema } from 'mongoose';

interface IUserHoroscope extends Document {
  userId: string;
  horoscope: string;
  date: string;// not a date object for better lookup for history
  zodiac: string;
}

const userHoroscopeSchema = new Schema<IUserHoroscope>({
  userId: { type: String, unique: true },
  horoscope: { type: String },
  date: { type: String },
  zodiac: { type: String },
}, { versionKey: false });

userHoroscopeSchema.index({ userId: 1, date: 1 });

const UserHoroscopeModel = mongoose.model<IUserHoroscope>(
  'userhoroscope',
  userHoroscopeSchema
)

export { IUserHoroscope, UserHoroscopeModel }