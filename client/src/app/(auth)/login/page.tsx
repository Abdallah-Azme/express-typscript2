"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "zod";

export const loginUserSchema = object({
  email: string({
    required_error: "The email is required",
  }).email("Please enter your email address"),

  password: string({
    required_error: "The password is required",
  }).min(6, "Password must be at least 6 characters"),
});
export default function LoginPage() {
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginUserSchema) });

  async function onSubmit(values: any) {
    try {
      console.log({ hello: values });
      await axios.post(`http://localhost:1337/api/sessions`, values, {
        withCredentials: true,
      });
      router.push("/");
    } catch (error: any) {
      setLoginError(error.message);
    }
    console.log(values);
  }
  return (
    <div>
      {loginError && <p> {loginError}</p>}
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

        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
}
