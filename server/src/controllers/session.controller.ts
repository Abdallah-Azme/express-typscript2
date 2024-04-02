import { Request, Response } from "express";
import { validatePassword } from "../services/user.service";
import {
  createSession,
  findSessions,
  updateSession,
} from "../services/session.service";
import { signJWT } from "../utils/jwt.util";

export async function createUserSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid credentials");
  }

  const session = await createSession(user.id, req.get("user-agent"));

  const accessToken = signJWT(
    { ...user, session: session._id },
    { expiresIn: process.env.ACCESS_TOKEN_TIME || "15m" }
  );

  const refreshToken = signJWT(
    { ...user, session: session._id },
    { expiresIn: process.env.REFRESH_TOKEN_TIME || "1y" }
  );
  res.cookie("accessToken", accessToken, {
    maxAge: 1000 * 60 * 15,
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,
  });
  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,
  });
  return res.status(201).send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
  const userId = res.locals.data._doc._id;
  const sessions = await findSessions({ user: userId, valid: true });
  return res.status(200).send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.data.session;
  await updateSession({ _id: sessionId }, { valid: false });
  return res.send({ accessToken: null, refreshToken: null });
}
