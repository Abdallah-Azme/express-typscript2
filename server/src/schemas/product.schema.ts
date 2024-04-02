import { number, object, string } from "zod";

const payload = {
  body: object({
    title: string({
      required_error: "The title is required",
    }),
    description: string({
      required_error: "The description is required",
    }).min(120, "The description is at least should be 120 characters long"),
    price: number({
      required_error: "The price is required",
    }).gt(0, "Put the right price"),
    image: string({
      required_error: "The image is required",
    }),
  }),
};

const params = {
  params: object({
    productId: string({
      required_error: "The productId is required",
    }),
  }),
};

export const CreateProductSchema = object({
  ...payload,
});
export const UpdateProductSchema = object({
  ...payload,
  ...params,
});
export const DeleteProductSchema = object({
  ...params,
});
export const GetProductSchema = object({
  ...params,
});
