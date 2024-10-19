/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { usePosts } from "../hooks/posts/usePosts";
import Button from "./Button";
import { useDeletePost } from "../hooks/posts/useDeletePost";
import { useState } from "react";
import PostModal from "./modals/PostModal";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";
import { useMe } from "@/hooks/auth/useMe";
import PostMedia from "./PostMedia";

const getStatusBadgeColor = (status: boolean) => {
  switch (status) {
    case true:
      return "bg-purple-500 text-white";
    case false:
      return "bg-yellow-700 text-white";
    default:
      return "bg-slate-800 text-white";
  }
};

const PostTable = () => {
  const { user } = useMe();
  const { posts: allPosts, error, isLoading } = usePosts();
  const { deletePost } = useDeletePost();

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const postsPerPage = 5;

  
  const totalPages = Math.ceil(allPosts?.length / postsPerPage);

 
  const filteredPosts =
    user?.role === "admin"
      ? allPosts
      : allPosts.filter((post) => post.author._id === user?._id);


  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const posts = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDeleteClick = (postId: string) => {
    setPostToDelete(postId);
    setConfirmDelete(true); 
  };

  const handleConfirmDelete = () => {
    if (postToDelete) {
      deletePost(postToDelete); 
      setPostToDelete(null);
      setConfirmDelete(false); 
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!filteredPosts.length) return <ErrorMessage message={"No Posts Found"} />;

  return (
    <div className="shadow overflow-x-auto rounded-lg">
      <table className="w-full text-sm">
        <thead className="text-xs uppercase font-medium">
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
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-primary-background">
          {posts.map((post: any, index: number) => (
            <tr
              key={post._id}
              className={`${
                index % 2 === 0 ? "bg-secondary-background bg-opacity-20" : ""
              }`}
            >
              <td className="px-4 py-4">{startIndex + index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {post.title.length > 55 ? (
                  <>{post.title.substring(0, 55)}...</>
                ) : (
                  <>{post.title}</>
                )}
                <span className="flex items-center mt-2 text-xs">
                  <PostMedia
                    postUpvotes={post?.upvotes}
                    postDownvotes={post?.downvotes}
                    postId={post?._id}
                    totalComments={post?.comments?.length}
                    viewsCount={post?.viewsCount}
                    hideTask={true}
                  />
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                {post?.author?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                {post?.category?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeColor(
                    post?.isPremium
                  )}`}
                >
                  {post?.isPremium ? "Premium" : "Regular"}
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
                    onClick={() => handleDeleteClick(post._id)}
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

    
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="bg-black bg-opacity-70 absolute inset-0"></div>
          <div className="bg-slate-900 p-6 rounded shadow-lg z-10 max-w-sm w-full">
            <h2 className="text-xl mb-4">
              Are you sure you want to delete this post?
            </h2>
            <div className="flex gap-2 items-center">
              <Button
                className="bg-red-500 text-white"
                onClick={handleConfirmDelete}
              >
              Delete
              </Button>
              <Button
                className="bg-gray-500 text-white"
                onClick={() => setConfirmDelete(false)}
              >
              Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

  
      <div className="flex justify-center gap-4 items-center py-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PostTable;
