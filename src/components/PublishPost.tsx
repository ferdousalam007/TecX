"use client";
import React, { useState } from "react";
import PostModal from "./modals/PostModal";
import { MdPostAdd } from "react-icons/md";
const PublishPost = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  return (
    <section>
      <div
        className="p-2 gap-2"
        onClick={() => setModalIsOpen(true)}
      >
        <button
          className="px-3 py-1.5  rounded-md text-4xl
                 "
        >
          <MdPostAdd />
        </button>
      </div>
      <PostModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
    </section>
  );
};

export default PublishPost;
