"use server";
import handleApiRequest from "../utils/handleApiRequest";
import api from "./api";
import { FieldValues } from "react-hook-form";

// Update the getAllPosts function in apiPosts.ts
export async function getAllPosts(params: {
  search: string | null;
  category: string | null;
  sort: string | null;
  page: number;
  limit: number;
}) {
  const { search, category, sort, page, limit } = params;
  const response = await handleApiRequest(
    api.get("/posts", {
      params: {
        search,
        category,
        sort,
        page,
        limit,
      },
    })
  );

  return response.data.data;
}
export async function getMyPosts(params: {
  search: string | null;
  category: string | null;
  sort: string | null;
  page: number;
  limit: number;
}) {
  const { search, category, sort, page, limit } = params;
  const response = await handleApiRequest(
    api.get("/posts/my-posts", {
      params: {
        search,
        category,
        sort,
        page,
        limit,
      },
    })
  );

  return response.data.data;
}
export async function getMyPost() {
  const response = await handleApiRequest(api.get("/posts/allpost"));
  console.log(response);
  return response.data.data;
}
export async function getBannerPost() {
  const response = await handleApiRequest(api.get("/posts/bannerpost"));
  console.log(response);
  return response.data.data;
}



export async function getPost(postId: string) {
  const response = await handleApiRequest(api.get(`/posts/${postId}`));
  return response.data.data;
}

export async function createPost(newPost: FieldValues) {
  const response = await handleApiRequest(api.post("/posts", newPost));
  return response.data.data;
}
export async function updatePost({
  newPost,
  postId,
}: {
  newPost: FieldValues;
  postId: string;
}) {
  const response = await handleApiRequest(
    api.patch(`/posts/${postId}`, newPost)
  );
  return response.data.data;
}

export async function deletePost(postId: string) {
  const response = await handleApiRequest(api.delete(`/posts/${postId}`));
  return response.data.data;
}
