import Image from "next/image";
import React from "react";
import PostMedia from "./PostMedia";
import PostAuthor from "./PostAuthor";
import Link from "next/link";
import { useMe } from "@/hooks/auth/useMe";
// import { useUsers } from "@/hooks/users/useUsers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Post = ({ post }: any) => {
  const { user } = useMe();
  // const { users, isLoading } = useUsers();
  // Find the author in the users list
  // const authorMatch = users?.find(
  //   (user: { _id: string }) => user._id === post.author._id
  // );
  // const isAuthorVerified = authorMatch?.isVerified;
  // console.log(isAuthorVerified, "isAuthorVerified check");
  // isVerified = { isAuthorVerified };
  // console.log(users, "last check");
  // console.log(post, "post check");
  const isPremium = post.isPremium;
  const canAccessPremium =
    user?.isVerified ||
    user?.role === "admin" ||
    user?._id === post?.author?._id;

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
            className="w-full h-[350px] object-contain custom-border-card p-2"
            src={post.images[0]}
            alt="Post image"
            width={500}
            height={300}
          />
          {isPremium && !canAccessPremium && (
            <>
              <div className="absolute top-1 right-1 bg-[#D97A37] text-white p-1 rounded ">
                <div className="text-white text-center flex gap-2 align-middle">
                  <p className="font-semibold">Premium</p>
                </div>
              </div>
            </>
          )}
        </div>
      </Link>
      <div className="mt-4">
        <div className="flex items-center justify-between gap-5">
          <div className="flex justify-between items-start mb-4">
            <PostAuthor author={post.author}  postCreatedAt={post.createdAt}  />
          </div>

          <span className="font-semibold text-primary-text text-sm bg-[#7147ED] rounded  px-2 my-3">
            {post.category.name}
          </span>
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
        <div></div>
      </div>
    </div>
  );
};

export default Post;
