import { FilterQuery } from "mongoose";
import User, { UserDocument } from "../models/user.model";

export async function createUser(input: UserDocument) {
  try {
    const user = await User.create(input);
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findUserByEmail(email: string) {
  return await User.find({ email });
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await User.findOne({ email });
  if (!user) return false;
  const isValid = await user.comparePassword(password);
  if (!isValid) return false;
  return user;
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return User.findOne({ query }).lean();
}
