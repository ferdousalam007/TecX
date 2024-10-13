/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import ErrorMessage from "@/components/ErrorMessage";
import InfiniteScroll from "react-infinite-scroller";
import dynamic from "next/dynamic";
import { useMe } from "@/hooks/auth/useMe";
import AllPost from "@/components/AllPost";
import { usePosts } from "@/hooks/posts/usePosts";
const Post = dynamic(() => import("@/components/Post"), {
  ssr: false,
});

const Home = () => {
  const { user } = useMe();
  const { posts, isLoading, fetchNextPage, hasNextPage } = usePosts();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      {user ? (
        <>
          <AllPost />
        </>
      ) : (
        <>
          <div className="relative overflow-hidden flex-1 flex justify-center">
            <div className="container grid grid-cols-1 md:grid-cols-1 gap-4 items-center mx-auto px-5 z-10 relative">
              <div className="text-center md:text-left">
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
                      {posts?.map(
                        (post: any) =>
                          isClient && <Post key={post._id} post={post} />
                      )}
                    </div>
                  </InfiniteScroll>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
