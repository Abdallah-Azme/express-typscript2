import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../utils/jwt.util";
import { reIssueAccessToken } from "../services/session.service";

export async function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.replace(/^Bearer\s/, "");
  const refreshToken = req.headers["x-refresh"] as string;

  if (!token) {
    return next();
  }

  const { decoded, expired } = verifyJWT(token);

  if (decoded) {
    res.locals.data = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });
    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
      const result = verifyJWT(newAccessToken);
      console.log(result);
      res.locals.data = result.decoded;
    }
  }
  next();
}
