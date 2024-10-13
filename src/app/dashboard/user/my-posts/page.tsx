"use client";

import PostTable from "@/components/PostTable";
import SearchFilter from "@/components/SearchFilter";



const MyPosts = () => {
  return (
    <section className="py-3 px-4 lg:py-5 lg:px-0 max-w-8xl mx-auto">
      <h2 className="text-2xl lg:text-3xl font-semibold text-center text-primary-text mb-5 lg:mb-8">
        My Posts
      </h2>
      <div className="space-y-4">
        <SearchFilter />
        <div className="overflow-x-auto">
          <PostTable />
        </div>
      </div>
    </section>
  );
};

export default MyPosts;
