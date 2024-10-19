/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMe } from "@/hooks/auth/useMe";
import { useAllPost } from "@/hooks/posts/useAllPost";
import Image from "next/image";
import Link from "next/link";

const Skeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="w-full h-[150px] bg-gray-300 rounded mb-4"></div>
      <div className="w-[80%] h-6 bg-gray-300 rounded mb-2"></div>
      <div className="w-[60%] h-4 bg-gray-300 rounded"></div>
    </div>
  );
};

const Banner = () => {
  const { posts, isLoading } = useAllPost();
  const { user } = useMe();
  const isPremium = posts?.[0]?.isPremium;
  const canAccessPremium =
    user?.isVerified ||
    user?.role === "admin" ||
    user?._id === posts?.[0]?.author?._id;

  return (
    <div className="container gap-4 pt-[120px] px-6 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-4">
        {/* Featured Post */}
        {isLoading ? (
          <Skeleton />
        ) : (
          <Link
            href={
              !canAccessPremium && isPremium
                ? "/dashboard/user/payment"
                : `/post/${posts?.[0]._id}`
            }
          >
            {posts?.[0] && (
              <div className="relative">
                <div className="w-full h-auto object-cover custom-border-card">
                  <Image
                    src={posts[0]?.images?.[0] || ""}
                    alt={posts[0]?.title || "Featured post image"}
                    width={500}
                    height={300}
                    quality={100}
                    className="w-full h-auto lg:h-[530px] rounded object-center object-cover custom-border-card"
                  />
                  {isPremium && !canAccessPremium && (
                    <>
                      <div className="absolute top-1 right-1 bg-purple-500 text-white p-1 rounded ">
                        <div className="text-white text-center flex gap-2 align-middle">
                          <p className="font-semibold">Premium</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 p-4 rounded-lg w-[90%]">
                  <span className="bg-purple-500 text-white text-xs font-medium px-2 py-1 rounded">
                    {posts[0]?.category?.name || "TECH"}
                  </span>
                  <h2 className="text-xl font-medium mt-2">
                    {posts[0]?.title.length > 45
                      ? `${posts[0]?.title.substring(0, 45)}...`
                      : posts[0]?.title}
                  </h2>
                  <p className="text-sm mt-2">
                    by{" "}
                    <span className="text-purple-400">
                      {posts[0]?.author?.name || "Unknown"}
                    </span>{" "}
                    - {new Date(posts[0]?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </Link>
        )}

        {/* Other Posts */}
        <div className="grid grid-cols-1 gap-8">
          {isLoading
            ? Array(2)
                .fill(null)
                .map((_, index) => <Skeleton key={index} />)
            : posts?.slice(1, 3).map((post: any) => (
                <Link
                  key={post._id}
                  href={
                    !canAccessPremium && post.isPremium
                      ? "/dashboard/user/payment"
                      : `/post/${post._id}`
                  }
                >
                  <div className="relative">
                    <div className="w-full">
                      <Image
                        src={post?.images?.[0] || ""}
                        alt={post?.title || "Post image"}
                        width={500}
                        height={300}
                        className="w-full h-[250px] rounded object-center object-cover custom-border-card"
                        quality={85}
                      />
                      {!canAccessPremium && post.isPremium && (
                        <>
                          <div className="absolute top-1 right-1 bg-yellow-500 text-white p-1 rounded ">
                            <div className="text-white text-center flex gap-2 align-middle">
                              <p className="font-semibold">Premium</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black bg-opacity-65 p-4 rounded-lg w-[90%]">
                      <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
                        {post?.category?.name || "CATEGORY"}
                      </span>
                      <h2 className="text-lg font-medium mt-2">
                        {post?.title.length > 40
                          ? `${post?.title.substring(0, 40)}...`
                          : post?.title}
                      </h2>
                      <p className="text-sm mt-2">
                        by{" "}
                        <span className="text-yellow-500">
                          {post?.author?.name || "Unknown"}
                        </span>{" "}
                        - {new Date(post?.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
