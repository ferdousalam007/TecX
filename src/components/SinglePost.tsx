/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { FaRegFilePdf } from "react-icons/fa6";
// import { FaEdit, FaTrash } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import PostAuthor from "./PostAuthor";
import PostMedia from "./PostMedia";
import { format } from "date-fns";
import { VscFilePdf } from "react-icons/vsc";
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

const SinglePost = ({ post }: { post: any }) => {
  return (
    <div>
      <div className="max-w-6xl mx-auto px-5 py-4 relative border border-white border-opacity-50 backdrop-blur-sm bg-[#040404]">
        <div className=" rounded-lg p-6 shadow-md space-y-2">
          {/* Post Title */}
          <span className="text-sm  rounded bg-purple-600 display-inline-block px-2 py-1 text-white border border-white border-opacity-50">
            {post?.category?.name}
          </span>
          <div className="flex  flex-wrap flex-col gap-3 ">
            <h2 className="text-2xl font-medium ">{post?.title}</h2>
            <PostAuthor author={post?.author} postCreatedAt={post?.createdAt} />
            <p>{post?.description}</p>
          </div>
          {/* Author and Date */}

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
                  <div className="bg-primary-background rounded-lg custom-border-card p-2">
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
            {/* Post Media */}
            <div className="pointer-events-none">
              <p className="text-red-500">
                only access this area register user
              </p>
              <div className="flex items-center gap-3 flex-wrap mt-4">
                <PostMedia
                  postUpvotes={post?.upvotes}
                  postDownvotes={post?.downvotes}
                  postId={post?._id}
                  totalComments={post?.comments?.length}
                  viewsCount={post?.viewsCount}
                />
                <div
                  className="flex items-center text-[#D97A37] gap-2  px-2 py-2 rounded-md  transition ease-in duration-300 text-xs bg-[#272B34] cursor-pointer"
                  // disabled={isPdfGenerating}
                >
                  <VscFilePdf className="" size={16} />
                  PDF
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold">Comments</h2>
              </div>
              {/* Comment 1 */}
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

                    <p className="text-secondary-text mt-3">{comment?.text}</p>

                    {/* {user?._id === comment?.author?._id && <p>hid</p>} */}
                  </div>
                ))
              ) : (
                <p className="text-primary-text">No comments yet.</p>
              )}
            </div>

            {/* Comment Form */}
            <form>
              <textarea
                rows={2}
                placeholder="Write your comment..."
                className="w-full mb-0.5 rounded-md shadow-sm  border outline-none py-2 lg:py-4 px-3 pointer-events-none"
              />
              <div className="flex justify-end items-center p-2 gap-2 w-full">
                <button className="px-3 py-1.5  text-white   rounded hover:text-primary-blue hover:border-primary-blue transition ease-in-out duration-300 disabled pointer-events-none">
                  Add Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
