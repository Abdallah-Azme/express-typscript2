import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface SessionDocument extends mongoose.Document {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
}

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    valid: {
      type: Boolean,
      default: true,
    },
    userAgent: {
      type: String,
    },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;
