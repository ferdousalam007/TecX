import Link from "next/link";
import React from "react";
import { FiArrowRight } from "react-icons/fi";

const page = () => {
  return (
    <section className="max-w-8xl  mx-auto px-5">
      <div className=" rounded-lg shadow-md flex flex-col items-center justify-center bg-white text-primary-text py-16 px-8">
        {/* SVG Success Image */}
        <div className="w-32 h-32 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#42a5f5"
            className="w-full h-full"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM10 15.586l5.293-5.293a1 1 0 011.414 1.414l-6 6a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L10 15.586z"
            />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-primary-text mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg text-secondary-text mb-8">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>

        {/* Interactive Buttons */}
        <div className="flex space-x-4">
          <Link
            href="/dashboard/user"
            className="bg-white border border-primary-blue text-primary-blue py-2 px-6 rounded-lg flex items-center hover:bg-primary-blue hover:text-white transition ease-in duration-300"
          >
            Back to Dashboard
            <FiArrowRight className="ml-2" size={20} />
          </Link>
          <Link
            href="/"
            className="bg-primary-blue text-white py-2 px-6 rounded-lg flex items-center hover:bg-[#128ef2] transition ease-in duration-300"
          >
            Back to Home
            <FiArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default page;
