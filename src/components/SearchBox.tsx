import React, { useState, useEffect } from "react";
import { useCategories } from "@/hooks/categories/useCategories";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { IoMdClose } from "react-icons/io";

const SearchBox = () => {
  const { categories } = useCategories();
  const router = useRouter();
  const searchParams = useSearchParams();

 
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString()); 
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    const queryString = params.toString();
    router.push(`?${queryString}`);
  }, [debouncedSearch, category, router, searchParams,setCategory, setSearch]);

  
  const handleClearSearch = () => {
    setSearch("");
  };

 
  const handleResetCategory = () => {
    setCategory(""); 
  };

  return (
    <div className="custom-border-card p-4 rounded-lg shadow-md">
      {/* Search Input */}
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-0.5 rounded-md shadow-sm focus:border-primary-blue border outline-none py-1.5 lg:py-2 px-3"
        />
        {search && (
          <button
            onClick={handleClearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <IoMdClose size={18} />
          </button>
        )}
      </div>

      {/* Category Buttons */}
      <div className="space-y-2 w-full">
        <div className="flex flex-wrap gap-2">
          {/* 'All' button */}
          <button
            onClick={handleResetCategory} 
            className={`px-4 py-2 rounded-full border ${
              category === ""
                ? "bg-primary-orange text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            All
          </button>
          {/* Category buttons */}
          {categories?.map((categoryItem: { _id: string; name: string }) => (
            <button
              key={categoryItem._id}
              onClick={() => setCategory(categoryItem._id)}
              className={`px-4 py-2 rounded-full border ${
                category === categoryItem._id
                  ? "bg-primary-orange text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {categoryItem.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
