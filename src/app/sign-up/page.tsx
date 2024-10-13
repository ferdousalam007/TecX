"use client";
import Button from "@/components/Button";
import { useSignup } from "@/hooks/auth/useSignup";
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

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const { signup, isPending } = useSignup();

  const onSubmit: SubmitHandler<IFormInput> = (newUser) => {
    signup(newUser);
  };

  return (
    <section className="container px-5 grid grid-cols-1  gap-8 items-center bg-primary-background py-8 lg:py-10 mx-auto">
      <div className="w-full p-6 lg:p-8  shadow-lg rounded-xl bg-secondary-background">
        <h2 className="text-2xl lg:text-3xl font-semibold text-center mb-3 text-primary-text">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full mb-0.5 bg-slate-900 rounded-md shadow-sm focus:border-purple-500 border outline-none py-1.5 lg:py-2 px-3 text-white"
            />
            {errors.name && (
              <p className="text-primary-red text-xs">*{errors.name.message}</p>
            )}
          </div>

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
              className="w-full mb-0.5 bg-slate-900 rounded-md shadow-sm focus:border-purple-500 border outline-none py-1.5 lg:py-2 px-3 text-white"
            />
            {errors.email && (
              <p className="text-primary-red text-xs">
                *{errors.email.message}
              </p>
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
              className="w-full mb-0.5 bg-slate-900 rounded-md shadow-sm focus:border-purple-500 border outline-none py-1.5 lg:py-2 px-3 text-white appearance-none"
            />
            {errors.password && (
              <p className="text-primary-red text-xs">
                *{errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value, { password }) =>
                  value === password || "Passwords must match",
              })}
              className="w-full mb-0.5 bg-slate-900 rounded-md shadow-sm focus:border-purple-500 border outline-none py-1.5 lg:py-2 px-3 text-white appearance-none"
            />
            {errors.confirmPassword && (
              <p className="text-primary-red text-xs">
                *{errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Phone Number (Optional)
            </label>
            <input
              type="text"
              {...register("phone")}
              className="w-full mb-0.5 bg-slate-900 rounded-md shadow-sm focus:border-purple-500 border outline-none py-1.5 lg:py-2 px-3 text-white"
            />
          </div>

          <div className="flex items-center font-medium">
            <input
              type="checkbox"
              {...register("terms", {
                required: "You must accept the terms and conditions",
              })}
              className="w-4 h-4 accent-primary-blue text-white  rounded focus:ring-primary-blue"
            />
            <label className="ml-2 block text-sm text-primary-text">
              I agree to the{" "}
              <a
                href="/terms"
                className="text-secondary-text hover:text-primary-text transition-all duration-300 font-semibold"
              >
                Terms and Conditions
              </a>
            </label>
          </div>
          {errors.terms && (
            <p className="text-primary-red text-xs">*{errors.terms.message}</p>
          )}

          <Button
            className="w-full"
            disabled={isPending}
            loading={isPending}
            outline
          >
            Sign Up
          </Button>

          <p className="text-sm text-center text-secondary-text font-medium">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-secondary-text hover:text-primary-text transition-all duration-300 font-semibold"
            >
              Login Instead
            </Link>
          </p>
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

export default SignUp;
