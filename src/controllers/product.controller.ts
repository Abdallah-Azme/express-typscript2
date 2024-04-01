import { Request, Response } from "express";
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
} from "../services/product.service";

export async function createProductHandler(req: Request, res: Response) {
  const userId = res.locals.data._doc._id as string;
  const body = req.body;
  const product = await createProduct({ ...body, user: userId });
  res.status(201).send(product);
}

export async function updateProductHandler(req: Request, res: Response) {
  const userId = res.locals.data._doc._id;
  const productId = req.params.productId;
  const update = req.body;
  const product = await findProduct(productId);

  if (!product) {
    return res.sendStatus(404);
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedProduct = await findAndUpdateProduct(productId, update, {
    new: true,
  });
  return res.send(updatedProduct);
}

export async function deleteProductHandler(req: Request, res: Response) {
  const userId = res.locals.data._doc._id;
  const productId = req.params.productId;

  const product = await findProduct(productId);
  if (!product) {
    return res.sendStatus(404);
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }
  await deleteProduct({ _id: productId });
  return res.sendStatus(204);
}

export async function getProductHandler(req: Request, res: Response) {
  const productId = req.params.productId;
  const product = await findProduct(productId);

  if (!product) {
    return res.sendStatus(404);
  }
  return res.send(product);
}
