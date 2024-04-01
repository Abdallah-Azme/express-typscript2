import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import Product, { ProductDocument } from "../models/product.model";

export async function createProduct(input: ProductDocument) {
  return Product.create(input);
}

export async function findProduct(query: string) {
  return Product.findById(query);
}

export async function findAndUpdateProduct(
  query: string,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) {
  return Product.findByIdAndUpdate(query, update, options);
}

export async function deleteProduct(query: FilterQuery<ProductDocument>) {
  return Product.deleteOne(query);
}
