"use client";

import { usePosts } from "@/hooks/posts/usePosts";
import SearchBox from "./SearchBox";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import InfiniteScroll from "react-infinite-scroller";
import Post from "./Post";
import PostSideBar from "./PostSideBar";

const AllPost = () => {
  const { posts, isLoading, fetchNextPage, hasNextPage } = usePosts();
  console.log(posts, "queryPosts");
  return (
    <div className="container mx-auto bg-primary-background px-5 py-4 mb-auto pt-[100px]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">
        {/* Main Content */}
        <div className="space-y-6 order-1 lg:order-1 lg:col-span-9 ">
          <SearchBox />
          {isLoading ? (
            <Spinner className="my-4" />
          ) : posts?.length === 0 ? (
            <ErrorMessage message={"No Posts Found"} />
          ) : (
            <InfiniteScroll
              key={posts?.length}
              pageStart={1}
              loadMore={() => fetchNextPage()}
              hasMore={hasNextPage}
              loader={<Spinner className="my-4" />}
            >
              <div className="flex flex-col gap-4">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {posts?.map((post: any) => (
                  <Post key={post._id} post={post} />
                ))}
              </div>
            </InfiniteScroll>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6  order-3 lg:order-3 lg:col-span-3 custom-border-card">
          <PostSideBar />
        </div>
      </div>
    </div>
  );
};

export default AllPost;
