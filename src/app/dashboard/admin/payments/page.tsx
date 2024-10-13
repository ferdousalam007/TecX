"use client";
import PaymentTable from "@/components/PaymentTable";
import React from "react";

const page = () => {
  return (
    <section className="py-3 lg:py-5">
      <h2 className="text-2xl lg:text-3xl font-semibold text-center text-primary-text mb-5 lg:mb-8">
        Payments History
      </h2>
      <PaymentTable />
    </section>
  );
};

export default page;
