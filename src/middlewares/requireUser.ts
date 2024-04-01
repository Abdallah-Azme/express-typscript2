import { NextFunction, Request, Response } from "express";

export function requireUser(req: Request, res: Response, next: NextFunction) {
  const data = res.locals.data;
  if (!data) {
    return res.status(403).send("You need to login to do this");
  }

  return next();
}
