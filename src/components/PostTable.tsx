"use client";
import { FaPlus, FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { usePosts } from "../hooks/posts/usePosts";
import Button from "./Button";
import { useDeletePost } from "../hooks/posts/useDeletePost";
import { useState } from "react";
import PostModal from "./modals/PostModal";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";
import { useMe } from "@/hooks/auth/useMe";
import InfiniteScroll from "react-infinite-scroller";

const getStatusBadgeColor = (status: boolean) => {
  switch (status) {
    case true:
      return "bg-primary-green text-white";
    case false:
      return "bg-primary-red text-white";
    default:
      return "bg-secondary-grey text-white";
  }
};

const PostTable = () => {
  const { user } = useMe();
  const {
    posts: allPosts,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = usePosts();
  console.log(allPosts);

  const posts =
    user?.role === "admin"
      ? allPosts
      : allPosts.filter((post) => post.author._id === user?._id);

  const { deletePost } = useDeletePost();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState(null);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!posts.length) return <ErrorMessage message={"No Posts Found"} />;

  return (
    <InfiniteScroll
      key={posts?.length}
      pageStart={1}
      loadMore={() => fetchNextPage()}
      hasMore={hasNextPage}
      loader={<Spinner className="my-4" />}
    >
      <div className="shadow overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-secondary-text">
          <thead className="bg-secondary-background text-xs uppercase font-medium text-primary-text">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-6 py-3 text-left tracking-wider whitespace-nowrap">
                Title
              </th>
              <th className="px-6 py-3 text-left tracking-wider whitespace-nowrap hidden sm:table-cell">
                Author
              </th>
              <th className="px-6 py-3 text-left tracking-wider whitespace-nowrap hidden md:table-cell">
                Category
              </th>
              <th className="px-6 py-3 text-left tracking-wider whitespace-nowrap hidden lg:table-cell">
                Status
              </th>
              <th className="px-6 py-3 flex items-center text-left tracking-wider whitespace-nowrap">
                <span className="hidden sm:inline">Actions</span>
                <Button
                  className="text-sm py-2 px-2 ml-2"
                  onClick={() => {
                    setSelectedPost(null);
                    setModalIsOpen(true);
                  }}
                >
                  <FaPlus />
                </Button>
              </th>
            </tr>
          </thead>

          <tbody className="bg-primary-background">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {posts?.map((post: any, index: number) => (
              <tr
                key={post._id}
                className={`${
                  index % 2 === 0 ? "bg-secondary-background bg-opacity-20" : ""
                }`}
              >
                <td className="px-4 py-4">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{post.title}</td>
                <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                  {post.author.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  {post.category.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getStatusBadgeColor(
                      post.isPremium
                    )}`}
                  >
                    {post.isPremium ? "Premium" : "Free"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2 items-center">
                    <Button
                      className="text-sm py-2 px-2"
                      onClick={() => {
                        setSelectedPost(post);
                        setModalIsOpen(true);
                      }}
                    >
                      <FaRegPenToSquare />
                    </Button>
                    <Button
                      className="text-sm py-2 px-2"
                      onClick={() => deletePost(post._id)}
                    >
                      <FaRegTrashCan />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PostModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          post={selectedPost}
        />
      </div>
    </InfiniteScroll>
  );
};

export default PostTable;
