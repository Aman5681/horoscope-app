import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  userId: string;
  name: string;
  email: string;
  password: string;
  birthdate: Date;
  zodiac: string;
}

const userSchema = new Schema<IUser>({
  userId: { type: String },
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  birthdate: { type: Date },
  zodiac: { type: String },
}, { versionKey: false });

userSchema.index({ userId: 1 });

const UsersModel = mongoose.model<IUser>(
  'user',
  userSchema
)

export { IUser, UsersModel }