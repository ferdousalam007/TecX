/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAllPost } from "@/hooks/posts/useAllPost";
import Image from "next/image";

const Banner = () => {
  const { posts } = useAllPost();
  return (
    <>
      <div className="container gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h1>{posts?.length} latest posts</h1>
            <Image
              className="w-full h-[350px] object-cover"
              src={
                posts && posts[0] && posts[0].images
                  ? posts[0].images[0]
                  : undefined
              }
              alt="Post image"
              width={500}
              height={300}
            />
          </div>
          <div>right image</div>
        </div>
      </div>
    </>
  );
};

export default Banner;
