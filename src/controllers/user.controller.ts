import { Request, Response } from "express";
import { createUser } from "../services/user.service";
import { omit } from "lodash";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);

    res.status(201).json({
      message: "Created successfully",
      user: omit(user.toJSON(), "password"),
    });
  } catch (error: any) {
    console.error(error);
    res.status(409).send(error.message);
  }
}
