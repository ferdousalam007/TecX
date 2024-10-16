/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAllPost } from "@/hooks/posts/useAllPost";
import Image from "next/image";

const Banner = () => {
  const { posts } = useAllPost();

  return (
    <div className="container gap-4 mt-[100px] px-6">
      <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-4">
        {" "}
        {/* Adjusted grid columns */}
        {/* Featured Post */}
        {posts?.[0] && (
          <div className="relative">
            <div className="w-full h-auto object-cover">
              <Image
                src={posts[0]?.images?.[0] || ""}
                alt={posts[0]?.title || "Featured post image"}
                width={500}
                height={300}
                quality={100}
                className=" w-full h-auto "
              />
            </div>
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 p-4 rounded-lg">
              <span className="bg-teal-500 text-black text-xs font-bold px-2 py-1 rounded">
                {posts[0]?.category?.name || "TECH"}
              </span>
              <h2 className="text-xl font-bold mt-2">{posts[0]?.title}</h2>
              <p className="text-sm mt-2">
                by{" "}
                <span className="text-blue-400">
                  {posts[0]?.author?.name || "Unknown"}
                </span>{" "}
                - {new Date(posts[0]?.createdAt).toLocaleDateString()}
                <i className="far fa-comment ml-2"></i>{" "}
                {posts[0]?.totalComments || 0}
              </p>
            </div>
          </div>
        )}
        {/* Other Posts */}
        <div className="grid grid-cols-1 gap-4">
          {posts?.slice(1, 3).map((post: any) => (
            <div key={post._id} className="relative">
              <div className="w-full">
                <Image
                  src={post?.images?.[0] || ""}
                  alt={post?.title || "Post image"}
                  width={500}
                  height={300}
                  className=" w-full h-[250px]"
                  quality={85}
                />
              </div>
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 p-4 rounded-lg">
                <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
                  {post?.category?.name || "CATEGORY"}
                </span>
                <h2 className="text-lg font-bold mt-2">{post?.title}</h2>
                <p className="text-sm mt-2">
                  by{" "}
                  <span className="text-blue-400">
                    {post?.author?.name || "Unknown"}
                  </span>{" "}
                  - {new Date(post?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
