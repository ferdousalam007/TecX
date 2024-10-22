"use client";
import Button from "@/components/Button";
import { useMe } from "@/hooks/auth/useMe";
import { useInitPayment } from "@/hooks/payments/useInitPayment";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineWorkspacePremium } from "react-icons/md";
const Payment = () => {
  const { user } = useMe();
  const { initPayment } = useInitPayment();
  const handlePayment = async () => {
    initPayment(undefined, {
      onSuccess: async (url) => {
        window.location.href = url;
      },
    });
  };
  return (
    <section className="flex justify-center  px-5">
 
      <div className="bg-gradient-to-b from-purple-500 to-purple-700 text-white rounded-xl p-8 w-80 shadow-lg">
        <div className="flex justify-center mb-4">
          <MdOutlineWorkspacePremium className="text-8xl mb-6" />
        </div>
        <div className="bg-white text-purple-700 text-sm font-semibold rounded-full px-4 py-1 inline-block mb-4">
          {user?.isVerified
            ? "You are already a premium user"
            : "GET PREMIUM ACCESS"}
        </div>
        <div className="text-4xl font-bold mb-4">$20</div>
        <p className="mb-6">GET ALL PREMIUM FEATURE</p>
        <ul className="space-y-2 mb-6">
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-xl  " />
            GET BADGE
          </li>
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-xl " />
            ALL PREMIUM POST OR ARTICLE
          </li>
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-xl" />
            ONE TIME PAYMENT
          </li>
        </ul>
        {!user?.isVerified && (
          <Button
            onClick={handlePayment}
            className="bg-gradient-to-r from-purple-500 to-purple-800 text-white font-semibold py-2 px-4 rounded-full w-full flex items-center justify-center"
          >
            Pay now get started!
          </Button>
        )}
      </div>
    </section>
  );
};

export default Payment;
