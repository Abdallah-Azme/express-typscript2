import { FilterQuery, UpdateQuery } from "mongoose";
import Session, { SessionDocument } from "../models/session.model";
import { signJWT, verifyJWT } from "../utils/jwt.util";
import { findUser } from "./user.service";
import User from "../models/user.model";

export async function createSession(userId: string, userAgent = "") {
  const session = await Session.create({ user: userId, userAgent });
  return session.toJSON();
}

export function findSessions(query: FilterQuery<SessionDocument>) {
  return Session.find(query).lean();
}

export function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return Session.updateOne(query, update);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJWT(refreshToken);

  //@ts-ignore
  if (!decoded) {
    return false;
  }

  //@ts-ignore
  const session = await Session.findById(decoded.session);

  if (!session || !session.valid) {
    return false;
  }

  //@ts-ignore
  const user = await User.findById(decoded._doc._id);

  if (!user) {
    return false;
  }

  const accessToken = signJWT(
    { ...user, session: session },
    { expiresIn: process.env.ACCESS_TOKEN_TIME || "15m" }
  );

  return accessToken;
}
