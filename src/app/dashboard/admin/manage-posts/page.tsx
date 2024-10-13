"use client";

import PostTable from "@/components/PostTable";
import SearchFilter from "@/components/SearchFilter";



const ManagePosts = () => {
  return (
    <section className="py-3 lg:py-5">
      <h2 className="text-2xl lg:text-3xl font-semibold text-center text-primary-text mb-5 lg:mb-8">
        Manage Posts
      </h2>
      <div className="space-y-4">
        <SearchFilter />
        <PostTable />
      </div>
    </section>
  );
};

export default ManagePosts;
