"use client";

import Button from "@/components/Button";
import PostModal from "@/components/modals/PostModal";
import PostTable from "@/components/PostTable";
import SearchFilter from "@/components/SearchBox";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const MyPosts = () => {
   const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  return (
    <section className="py-3 px-4 lg:py-5 lg:px-0 max-w-8xl mx-auto">
      <h2 className="text-2xl lg:text-3xl font-semibold text-center text-primary-text mb-5 lg:mb-8">
        My Posts
      </h2>
      <div className="space-y-4">
        <Button
          className="text-sm py-2 px-2 ml-2"
          onClick={() => {
            // setSelectedPost(null);
            setModalIsOpen(true);
          }}
        >
          Add New Post <FaPlus className="inline-block ml-2 text-purple-500"/>
        </Button>
        <SearchFilter />
        <div className="overflow-x-auto">
          <PostTable />
        </div>
      </div>
      <PostModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        // post={selectedPost}
      />
    </section>
  );
};

export default MyPosts;
