"use client";
import Button from "@/components/Button";
import { useLogin } from "@/hooks/auth/useLogin";

import Link from "next/link";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";


interface IFormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  terms: boolean;
}

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const { login, isPending } = useLogin();

  const onSubmit: SubmitHandler<IFormInput> = (newUser) => {
    login(newUser);
  };

  return (
    <section className="container px-5 grid grid-cols-1 gap-8 items-center bg-primary-background py-8 lg:py-10 mx-auto">
      
      <div className="w-full max-w-[550px] mx-auto p-6 lg:p-8  shadow-lg rounded-xl bg-primary-background ">
        <h2 className="text-2xl lg:text-3xl font-semibold text-center mb-3 text-primary-text">
          Sign In
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email format",
                },
              })}
              className="w-full mb-0.5 rounded-md shadow-sm focus:border-primary-blue border outline-none py-1.5 lg:py-2 px-3"
            />
            {errors.email && (
              <p className="text-primary-red text-xs">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full mb-0.5  rounded-md shadow-sm focus:border-primary-blue border outline-none py-1.5 lg:py-2 px-3"
            />
            {errors.password && (
              <p className="text-primary-red text-xs">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button className="w-full" disabled={isPending} loading={isPending}>
            Submit
          </Button>

          <div className="flex justify-between items-center text-sm text-secondary-text font-medium">
            <a
              href="/forgot-password"
              className="text-secondary-text hover:text-primary-text transition-all duration-300 font-semibold"
            >
              Forgot Password?
            </a>
            <Link
              href="/sign-up"
              className="text-secondary-text hover:text-primary-text transition-all duration-300 font-semibold"
            >
              Sign Up Instead
            </Link>
          </div>
        </form>

        <footer className="mt-4 text-center text-sm text-secondary-text font-medium">
          <a
            href="/privacy"
            className="text-secondary-text hover:text-primary-text transition-all duration-300 font-semibold"
          >
            Privacy Policy
          </a>{" "}
          <span className="text-primary-blue font-bold">|</span>{" "}
          <a
            href="/terms"
            className="text-secondary-text hover:text-primary-text transition-all duration-300 font-semibold"
          >
            Terms of Service
          </a>
        </footer>
      </div>
    </section>
  );
};

export default SignIn;
