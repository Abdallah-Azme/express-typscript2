"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "zod";

export const createUserSchema = object({
  name: string({
    required_error: "The name is required",
  }).min(1, "Name is required"),

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
);

export default function RegisterPage() {
  const router = useRouter();
  const [registerError, setRegisterError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(createUserSchema) });

  async function onSubmit(values: any) {
    try {
      console.log({ hello: values });
      await axios.post(`http://localhost:1337/api/users`, values);
      router.push("/");
    } catch (error: any) {
      setRegisterError(error.message);
    }
    console.log(values);
  }
  return (
    <div>
      {registerError && <p> {registerError}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-element">
          <label htmlFor="email"> Email</label>
          <input
            id="email"
            type="email"
            placeholder="jane.doe@example.com"
            {...register("email")}
          />
          {errors.email?.message && <p>{errors.email?.message as string}</p>}
        </div>
        <div className="form-element">
          <label htmlFor="name"> Name</label>
          <input
            id="name"
            type="text"
            placeholder="Jane Doe"
            {...register("name")}
          />
          {errors.name?.message && <p>{errors.name?.message as string}</p>}
        </div>
        <div className="form-element">
          <label htmlFor="password"> Password</label>
          <input
            id="password"
            type="password"
            placeholder="**********"
            {...register("password")}
          />
          {errors.password?.message && (
            <p>{errors.password?.message as string}</p>
          )}
        </div>
        <div className="form-element">
          <label htmlFor="passwordConfirmation"> Confirm password</label>
          <input
            id="passwordConfirmation"
            type="password"
            placeholder="**********"
            {...register("passwordConfirmation")}
          />
          {errors.passwordConfirmation?.message && (
            <p>{errors.passwordConfirmation?.message as string}</p>
          )}
        </div>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
}
