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
    if (queryString !== searchParams.toString()) {
      router.replace(`?${queryString}`, { scroll: false });
    }
  }, [debouncedSearch, category, router, searchParams]);

  const handleClearSearch = () => {
    setSearch("");
  };

  return (
    <div className="custom-border-card p-4 rounded-lg shadow-md">
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

      <div className="flex flex-wrap gap-2">
        <p
          onClick={() => setCategory("")}
          className={`px-4 py-1 rounded border cursor-pointer ${
            category === ""
              ? "bg-purple-700 text-white"
              : "bg-slate-800 text-white"
          }`}
        >
          All
        </p>
        {categories?.map((categoryItem: { _id: string; name: string }) => (
          <p
            key={categoryItem._id}
            onClick={() => setCategory(categoryItem._id)}
            className={`px-4 py-1 rounded border cursor-pointer ${
              category === categoryItem._id
                ? "bg-purple-700 text-white"
                : "bg-slate-800 text-white"
            }`}
          >
            {categoryItem.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SearchBox;
