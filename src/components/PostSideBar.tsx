/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useMe } from "@/hooks/auth/useMe";
import { useAllPost } from "@/hooks/posts/useAllPost";
import Image from "next/image";
import React from "react";

const PostSideBar = () => {
  const { posts, isLoading } = useAllPost();
  // console.log(posts, "postssidebar");
  const { user } = useMe();
  const [activeTab, setActiveTab] = React.useState("trending");
  return (
    <div className="max-w-sm mx-auto p-4  rounded-lg sticky top-0 lg:pt-[100px]">
      <div className="flex space-x-2 mb-4">
        <div
          className={`px-4 py-2 rounded cursor-pointer ${
            activeTab === "trending" ? "bg-purple-500" : "bg-gray-800"
          } text-white`}
          onClick={() => setActiveTab("trending")}
        >
          TRENDING
        </div>
        <div
          className={`px-4 py-2 rounded cursor-pointer ${
            activeTab === "popular" ? "bg-purple-500" : "bg-gray-800"
          } text-white`}
          onClick={() => setActiveTab("popular")}
        >
          POPULAR
        </div>
      </div>
      <div className="space-y-4">
        {activeTab === "trending" && (
          <>
            {/*  You can map the posts array here and sort by viewsCount */}
            {posts &&
              posts
                .sort((a: any, b: any) => b.viewsCount - a.viewsCount)
                .slice(0, 5)
                .map((post: any) => (
                  <React.Fragment key={post._id}>
                    <div className="flex space-x-4 items-center border-b border-gray-600 pb-4">
                      <Image
                        src={post?.images[0]}
                        alt={post?.title}
                        height={500}
                        width={500}
                        className="w-12 h-12 rounded-full border border-purple-400 shadow-md "
                      />
                      <div>
                        <span className="text-white text-xs bg-purple-700 p-1 rounded">
                          {post?.category?.name}
                        </span>
                        <p className="text-white font-normal text-sm mt-2">
                          {post?.title.length > 45
                            ? `${post?.title.substring(0, 45)}...`
                            : post?.title}
                        </p>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
          </>
        )}
        {activeTab === "popular" && (
          <>
            {posts &&
              posts
                .sort((a: any, b: any) => b.upvotes.length - a.upvotes.length)
                .slice(0, 5)
                .map((post: any) => (
                  <React.Fragment key={post._id}>
                    <div className="flex space-x-4 items-center border-b border-gray-600 pb-4 ">
                      <Image
                        src={post?.images[0]}
                        alt={post?.title}
                        height={500}
                        width={500}
                        className="w-12 h-12 rounded-full border border-purple-400 shadow-md "
                      />
                      <div>
                        <span className="text-white text-xs bg-purple-700 p-1 rounded">
                          {post?.category?.name}
                        </span>
                        <p className="text-white font-normal text-sm mt-2">
                          {post?.title.length > 45
                            ? `${post?.title.substring(0, 45)}...`
                            : post?.title}
                        </p>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PostSideBar;
