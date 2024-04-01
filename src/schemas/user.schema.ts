import { object, string } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "The name is required",
    }),

    email: string({
      required_error: "The email is required",
    }).email("Please enter your email address"),

    password: string({
      required_error: "The password is required",
    }).min(6, "Password must be at least 6 characters"),

    passwordConfirmation: string({
      required_error: "The confirming password is required",
    }),
  }).refine(
    (value) => {
      return value.passwordConfirmation === value.password;
    },
    { message: "Passwords do not match", path: ["passwordConfirmation"] }
  ),
});
