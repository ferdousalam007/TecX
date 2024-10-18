import Image from "next/image";
import React from "react";
import PostMedia from "./PostMedia";
import PostAuthor from "./PostAuthor";
import Link from "next/link";
import { useMe } from "@/hooks/auth/useMe";
import { IoMdLock } from "react-icons/io";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Post = ({ post }: any) => {
  const { user } = useMe();
console.log(post,"post");
  const isPremium = post.isPremium;
  const canAccessPremium =
    user?.isVerified || user?.role === "admin" || user?._id === post?.author?._id;

  return (
    <div
      className={`bg-[#1c1f26] custom-border-card rounded-lg p-6 shadow-lg transition-all duration-300 ${
        isPremium
          ? "border-2 border-[#ce3df3] hover:shadow-xl"
          : "hover:shadow-md"
      }`}
    >
     
      <Link
        href={
          !canAccessPremium && post.isPremium
            ? "/dashboard/user/payment"
            : `/post/${post._id}`
        }
      >
      
        <div className="mt-4 bg-primary-background rounded-lg overflow-hidden relative">
          <Image
            className="w-full h-[350px] object-contain"
            src={post.images[0]}
            alt="Post image"
            width={500}
            height={300}
          />
          {isPremium && !canAccessPremium && (
            <>
              <div className="absolute inset-0 bg-black  bg-opacity-70 flex items-center justify-center">
                <div className="text-white text-center flex gap-2">
                  <IoMdLock className="mx-auto mb-2" size={24} />
                  <p className="font-semibold">Premium Content</p>
                </div>
              </div>
              <div className="blur-sm absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-70"></div>
            </>
          )}
        </div>
      </Link>
      <div className="mt-4">
        <div className="flex items-center justify-between gap-5">
          <div className="flex justify-between items-start mb-4">
            <PostAuthor author={post.author} postCreatedAt={post.createdAt} />
          </div>
          <Link
            href={`/?category=${post?.category?._id}`}
            scroll={false}
            passHref
          >
            <button className="bg-[#7147ED] rounded  px-2 my-3 ">
              <span className="font-semibold text-primary-text text-sm">
                {post.category.name}
              </span>
            </button>
          </Link>
        </div>
        <Link
          href={
            !canAccessPremium && post.isPremium
              ? "/dashboard/user/payment"
              : `/post/${post._id}`
          }
        >
          <h2 className="text-xl font-bold text-white">{post?.title}</h2>
          <p>{post?.Content}</p>
        </Link>
      </div>
      <div className="flex gap-4 mt-5">
        <div>
          {user ? (
            <PostMedia
              postUpvotes={post.upvotes}
              postDownvotes={post.downvotes}
              postId={post._id}
              totalComments={post.totalComments}
              viewsCount={post.viewsCount}
            />
          ) : (
            <div className="pointer-events-none">
              <p className="text-red-500">
                only access this area register user
              </p>
              <PostMedia
                postUpvotes={post.upvotes}
                postDownvotes={post.downvotes}
                postId={post._id}
                totalComments={post.totalComments}
                viewsCount={post.viewsCount}
               
              />
            </div>
          )}
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
};

export default Post;
