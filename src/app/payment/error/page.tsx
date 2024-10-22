import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="max-w-8xl  mx-auto px-5 py-[120px]">
      <div className=" rounded-lg shadow-md flex flex-col items-center justify-center custom-border-card py-16 px-8">
        <h4 className="text-3xl font-bold text-primary-text mb-4">
          Payment Failed!
        </h4>
        <p className="text-lg text-secondary-text mb-8">
          Unfortunately, we were unable to process your payment. Please try
          again.
        </p>

        {/* Interactive Buttons */}
        <div className="flex space-x-4">
          <Link
            href="/dashboard/user/payment"
            className="bg-[#272B34] text-[#a8b3cf] py-2 px-6 rounded-lg flex items-center  transition ease-in duration-300 border border-slate-400 hover:bg-[#432256] hover:text-[#ffffff]"
          >
            Try Again
          </Link>
        </div>
      </div>
    </section>
  );
};

export default page;
