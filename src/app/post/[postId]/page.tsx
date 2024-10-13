"use client";
import React, { useState } from "react";
import { usePost } from "@/hooks/posts/usePost";
import { useForm } from "react-hook-form";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import Spinner from "@/components/Spinner";

import PostAuthor from "@/components/PostAuthor";
import PostMedia from "@/components/PostMedia";
import { format } from "date-fns";
import { useCreateComment } from "@/hooks/comments/useCreateComments";
import { useMe } from "@/hooks/auth/useMe";
import { FaSpinner, FaEdit, FaTrash } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import { usePDF } from "react-to-pdf";
import { FaRegFilePdf } from "react-icons/fa6";
import { useDeleteComment } from "@/hooks/comments/useDeleteComment";
import { useUpdateComment } from "@/hooks/comments/useUpdateComment";
import SinglePost from "@/components/SinglePost";

interface FormData {
  text: string;
}

interface Comment {
  _id: string;
  text: string;
  author: {
    _id: string;
    name: string;
    profilePic: string;
  };
  createdAt: string;
}

const PostDetails = () => {
  const { user } = useMe();
  const { toPDF, targetRef } = usePDF({ filename: "post-details.pdf" });
  const queryClient = useQueryClient();

  const { post, isLoading } = usePost();
  const { createComment, isPending: isCreating } = useCreateComment();
  const { deleteComment, isPending: isDeleting } = useDeleteComment();
  const { updateComment, isPending: isUpdating } = useUpdateComment();
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedCommentText, setEditedCommentText] = useState("");

  const onSubmit = (data: FormData) => {
    createComment(
      {
        text: data.text,
        post: post._id,
        author: user._id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["post", post._id],
          });
          reset();
        },
      }
    );
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment(commentId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["post", post._id],
        });
      },
    });
  };

  const handleEditComment = (comment: Comment) => {
    setEditingCommentId(comment._id);
    setEditedCommentText(comment.text);
  };

  const handleUpdateComment = () => {
    if (editingCommentId) {
      updateComment(
        {
          newComment: {
            text: editedCommentText,
          },
          commentId: editingCommentId,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["post", post._id],
            });
            setEditingCommentId(null);
            setEditedCommentText("");
          },
        }
      );
    }
  };

  const handleGeneratePDF = async () => {
    setIsPdfGenerating(true);
    await toPDF();
    setIsPdfGenerating(false);
  };

  if (isLoading) return <Spinner />;
  // if (error) return <ErrorMessage message={error.message} />;
  // if (!post) return <ErrorMessage message={"No Post Found"} />;

  return (
    <div className="container mx-auto">
      {user ? (
        <div className="max-w-6xl mx-auto px-5 py-4">
          <div
            className="bg-white rounded-lg p-6 shadow-md space-y-6"
            ref={targetRef}
          >
            {/* Post Title */}
            <div className="flex items-center gap-3 justify-between">
              <h2 className="text-2xl font-bold text-primary-text">
                {post?.title}
              </h2>
            </div>
            {/* Author and Date */}
            <PostAuthor author={post?.author} postCreatedAt={post?.createdAt} />
            <div>
              <Swiper
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {post?.images.map((image: string, index: number) => (
                  <SwiperSlide key={index}>
                    <div className="bg-primary-background rounded-lg">
                      <Image
                        src={image}
                        alt="Slide 1"
                        className="w-full h-96 object-contain rounded-md"
                        width={768}
                        height={432}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/* Post Content */}
            <p
              className="text-primary-text"
              dangerouslySetInnerHTML={{ __html: post?.content }}
            />

            <PostMedia
              postUpvotes={post?.upvotes}
              postDownvotes={post?.downvotes}
              postId={post?._id}
              totalComments={post?.comments?.length}
            />

            {/* Comments Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold">Comments</h2>
                <button
                  onClick={handleGeneratePDF}
                  className="flex items-center gap-2 text-primary-text px-2 py-1 bg-primary-background rounded-md hover:bg-secondary-background transition ease-in duration-300 text-xs border border-primary-blue"
                  disabled={isPdfGenerating}
                >
                  <FaRegFilePdf className="text-primary-blue" size={16} />{" "}
                  {isPdfGenerating ? "Generating PDF..." : "Generate PDF"}
                </button>
              </div>
              {post?.comments && post?.comments?.length > 0 ? (
                post?.comments.map((comment: Comment) => (
                  <div
                    key={comment?._id}
                    className="bg-primary-background p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-4">
                      <Image
                        src={comment?.author.profilePic}
                        alt="Author"
                        className="w-10 h-10 rounded-full"
                        width={40}
                        height={40}
                      />
                      <div>
                        <div className="font-semibold italic">
                          {comment?.author?.name}
                        </div>
                        <div className="text-xs text-gray-500 italic">
                          {format(new Date(comment?.createdAt), "PPP")}
                        </div>
                      </div>
                    </div>
                    {editingCommentId === comment?._id ? (
                      <div className="mt-3">
                        <textarea
                          value={editedCommentText}
                          onChange={(e) => setEditedCommentText(e.target.value)}
                          className="w-full p-2 border rounded-md"
                          rows={3}
                        />
                        <div className="mt-2 flex justify-end space-x-2">
                          <button
                            onClick={handleUpdateComment}
                            className="px-3 py-1 bg-primary-blue text-white rounded-md"
                            disabled={isUpdating}
                          >
                            {isUpdating ? "Updating..." : "Update"}
                          </button>
                          <button
                            onClick={() => setEditingCommentId(null)}
                            className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-secondary-text mt-3">
                        {comment?.text}
                      </p>
                    )}
                    {user._id === comment?.author?._id &&
                      editingCommentId !== comment?._id && (
                        <div className="mt-2 flex justify-end space-x-2">
                          <button
                            onClick={() => handleEditComment(comment)}
                            className="px-3 py-1 bg-primary-blue text-white rounded-md border border-primary-blue
                        hover:bg-white hover:text-primary-blue hover:border-primary-blue transition ease-in-out duration-300
                        "
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment?._id)}
                            className="px-3 py-1 bg-primary-red text-white rounded-md border border-primary-red
                        hover:bg-white hover:text-primary-red hover:border-primary-blue transition ease-in-out duration-300
                        "
                            disabled={isDeleting}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                  </div>
                ))
              ) : (
                <p className="text-primary-text">No comments yet.</p>
              )}
            </div>

            {/* Comment Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <textarea
                rows={2}
                placeholder="Write your comment..."
                {...register("text", { required: true })}
                className="w-full mb-0.5 rounded-md shadow-sm focus:border-primary-blue border outline-none py-2 lg:py-4 px-3"
              />
              <div className="flex justify-end items-center p-2 gap-2 w-full">
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-primary-blue text-white rounded-md border border-primary-blue
                hover:bg-white hover:text-primary-blue hover:border-primary-blue transition ease-in-out duration-300"
                  disabled={isCreating}
                >
                  {isCreating ? (
                    <FaSpinner className="animate-spin" size={20} />
                  ) : (
                    "Add Comment"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <SinglePost post={post} />
      )}
    </div>
  );
};

export default PostDetails;
