"use client"

import CreateCategory from "@/components/CreateCategory";


const page = () => {
  return (
    <section className="py-3 lg:py-5">
      <h2 className="text-2xl lg:text-3xl font-semibold text-center text-primary-text mb-5 lg:mb-8">
        Create Categories
      </h2>
      <div className="space-y-4 max-w-[350px] mx-auto">
        <CreateCategory />
      </div>
    </section>
  );
}

export default page