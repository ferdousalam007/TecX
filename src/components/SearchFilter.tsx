import React, { useState } from "react";
import { useCategories } from "@/hooks/categories/useCategories";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import Button from "./Button";

const SearchFilter = () => {
  const { categories } = useCategories();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [upvotes, setUpvotes] = useState(searchParams.get("sort") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [debouncedSearch] = useDebounce(search, 500);

  const handleSubmit = () => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (category) params.set("category", category);
    if (upvotes) params.set("sort", upvotes);
    const queryString = params.toString();
    router.push(`?${queryString}`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-0.5 rounded-md shadow-sm focus:border-primary-blue border outline-none py-1.5 lg:py-2 px-3"
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="space-y-2 w-full sm:w-1/2">
          <select
            className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            {categories?.map((category: { _id: string; name: string }) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2 w-full sm:w-1/2">
          <select
            className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
            value={upvotes}
            onChange={(e) => setUpvotes(e.target.value)}
          >
            <option value="">Select an Option</option>
            <option value="upvotes">Upvoted Post - Ascending</option>
            <option value="-upvotes">Upvoted Post - Descending</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end mt-3">
        <Button onClick={handleSubmit} className="text-sm">
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default SearchFilter;  