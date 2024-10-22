"use client";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="max-w-4xl  mx-auto px-5 pt-[140px] pb-[100px]">
      <div className="custom-border-card rounded-lg shadow-md flex flex-col items-center justify-center  py-16 px-8">
        <h1 className="text-3xl font-bold text-primary-text mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg text-secondary-text mb-8">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>
        <div className="flex space-x-4">
          <Link
            href="/dashboard/user"
            className="bg-[#272B34] text-[#a8b3cf] border   py-2 px-6 rounded-lg flex items-center  transition ease-in duration-300"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/"
            className="bg-[#272B34] text-[#a8b3cf] py-2 px-6 rounded-lg flex items-center  transition ease-in duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default page;
