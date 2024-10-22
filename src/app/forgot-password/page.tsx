"use client";

import Button from "@/components/Button";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
import Link from "next/link";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const { forgotPassword, isPending } = useForgotPassword();

  const onSubmit: SubmitHandler<IFormInput> = async ({ email }) => {
    forgotPassword(email);
  };

  return (
    <section className="container px-5 grid grid-cols-1 gap-4 items-center custom-border-card py-8 lg:py-10 mx-auto mb-16 mt-[120px]">
      <div className="w-full max-w-[550px] p-6 lg:p-8  shadow-lg rounded-xl mx-auto">
        <h2 className="text-2xl lg:text-3xl font-semibold text-center mb-3 text-primary-text">
          Forgot Password
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
              className="w-full mb-0.5  rounded-md shadow-sm focus:border-primary-blue border outline-none py-1.5 lg:py-2 px-3"
            />
            {errors.email && (
              <p className="text-primary-red text-xs">{errors.email.message}</p>
            )}
          </div>

          <Button className="w-full" loading={isPending} disabled={isPending}>
            Submit
          </Button>

          <div className="flex justify-center items-center text-sm text-secondary-text font-medium">
            <label className="ml-2 block text-sm text-primary-text">
              Remembered your password?{" "}
              <a
                href="/sign-in"
                className="text-secondary-text hover:text-primary-text transition-all duration-300 font-semibold"
              >
                Sign In
              </a>
            </label>
          </div>
        </form>

        <footer className="mt-4  text-center text-sm text-secondary-text font-medium">
          <Link
            href="/privacy-policy"
            className="text-secondary-text hover:text-primary-text transition-all duration-300 font-semibold mr-2"
          >
            Privacy Policy
          </Link>{" "}
        
          <Link
            href="/terms-of-service"
            className="text-secondary-text hover:text-primary-text transition-all duration-300 font-semibold"
          >
            Terms of Service
          </Link>
        </footer>
      </div>
    </section>
  );
};

export default ForgotPassword;
