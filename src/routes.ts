import { Express, Request, Response } from "express";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from "./controllers/product.controller";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionHandler,
} from "./controllers/session.controller";
import { createUserHandler } from "./controllers/user.controller";
import { requireUser } from "./middlewares/requireUser";
import validate from "./middlewares/validateResource";
import {
  CreateProductSchema,
  DeleteProductSchema,
  GetProductSchema,
  UpdateProductSchema,
} from "./schemas/product.schema";
import { createSessionSchema } from "./schemas/session.schema";
import { createUserSchema } from "./schemas/user.schema";

function routes(app: Express) {
  app.get("healthpeak", (req: Request, res: Response) => {
    res.status(200).send("The app is working correctly");
  });

  app.post("/api/users", validate(createUserSchema), createUserHandler);

  //sessions
  app.post(
    "/api/sessions",
    validate(createSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", requireUser, getUserSessionHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  //products
  app.post(
    "/api/products",
    [requireUser, validate(CreateProductSchema)],
    createProductHandler
  );
  app.get(
    "/api/products/:productId",
    validate(GetProductSchema),
    getProductHandler
  );
  app.put(
    "/api/products/:productId",
    [requireUser, validate(UpdateProductSchema)],
    updateProductHandler
  );
  app.delete(
    "/api/products/:productId",
    [requireUser, validate(DeleteProductSchema)],
    deleteProductHandler
  );
}

export default routes;
