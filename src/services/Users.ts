import { randomUUID } from "node:crypto";
import { IUser, UsersModel } from "../models/Users";
import { Utils } from "../utils/Utils";

export class UserService {
  private static instance: UserService;
  private constructor() { }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public async createUser(user: IUser) {
    const userId = randomUUID()
    try {
      const encryptedPassword = await Utils.hashPassword(user.password);
      const updatedUserObject = { ...user, password: encryptedPassword, userId }
      await UsersModel.create(updatedUserObject);
      return { userId };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async validateUser(email: string, password: string) {
    const user = await UsersModel.findOne({ email });
    if (!user) throw new Error('User not found');

    const isValid = await Utils.comparePassword(password, user.password);
    if (!isValid) throw new Error('Invalid credentials');

    return user;
  }

  public async userRollBack(email: string): Promise<void> {
    await UsersModel.deleteOne({ email });
  }
}