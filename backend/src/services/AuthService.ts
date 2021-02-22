import ServiceResponse from "../services/ServiceResponse";
import * as bcrypt from "bcryptjs";
import User, { IUser } from "../db/models/user";
import ValidationUtil from "../utils/ValidationUtil";

export default class AuthService {
  static async register(body: Partial<IUser>): Promise<IUser> {
    const { name, email, password } = body;
    ValidationUtil.validateEmptyKeys(body, ["name", "email", "password"]);
    const userExists: IUser = await User.findOne({ email });
    if (userExists) {
      throw ServiceResponse.validationError("User with the given email already exists.");
    }
    const passwordHash: string = await bcrypt.hash(password, 10);
    const user: IUser = new User({
      name,
      email, 
      password: passwordHash
    });
    await user.save();
    return user;
  }

  static async login(body: {email: string, password: string}): Promise<IUser | void> {
    const { email, password } = body;
    ValidationUtil.validateEmptyKeys(body, ["email", "password"]);
    const user: IUser = await User.findOne({ email });
    if (!user) {
      throw ServiceResponse.validationError("Invalid email provided.");
    }
    const passwordMatch: boolean = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      return user;
    } else {
      throw ServiceResponse.validationError("Invalid password provided.");
    }
  }
}
