import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  comparePassword: (passwordCandidate: string) => Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "The email is required"],
    },
    name: {
      type: String,
      required: [true, "The name is required"],
    },
    password: {
      type: String,
      required: [true, "The password is required"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (
  passwordCandidate: string
) {
  return await bcrypt.compare(passwordCandidate, this.password);
};

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
