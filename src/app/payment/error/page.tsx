import Link from "next/link";
import React from "react";
import { FiRefreshCw } from "react-icons/fi";

const page = () => {
  return (
    <section className="max-w-8xl  mx-auto px-5">
      <div className=" rounded-lg shadow-md flex flex-col items-center justify-center bg-white text-primary-text py-16 px-8">
        {/* SVG Error Image */}
        <div className="w-32 h-32 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#ef5350"
            className="w-full h-full"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM8.707 8.293a1 1 0 011.414 0L12 10.172l1.879-1.879a1 1 0 111.414 1.414L13.414 12l1.879 1.879a1 1 0 11-1.414 1.414L12 13.414l-1.879 1.879a1 1 0 11-1.414-1.414L10.586 12l-1.879-1.879a1 1 0 010-1.414z"
            />
          </svg>
        </div>

        {/* Unsuccessful Message */}
        <h1 className="text-3xl font-bold text-primary-text mb-4">
          Payment Failed!
        </h1>
        <p className="text-lg text-secondary-text mb-8">
          Unfortunately, we were unable to process your payment. Please try
          again.
        </p>

        {/* Interactive Buttons */}
        <div className="flex space-x-4">
          <Link
            href="/dashboard/user/payment"
            className="bg-primary-blue text-white py-2 px-6 rounded-lg flex items-center hover:bg-[#128ef2] transition ease-in duration-300"
          >
            Retry Payment
            <FiRefreshCw className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default page;
