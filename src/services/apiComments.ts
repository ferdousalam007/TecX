"use server";
import { FieldValues } from "react-hook-form";
import handleApiRequest from "../utils/handleApiRequest";
import api from "./api";

export async function createComment(newComment: FieldValues) {
  const response = await handleApiRequest(api.post("/comments", newComment));
  return response.data.data;
}
export async function updateComment({
  newComment,
  commentId,
}: {
  newComment: FieldValues;
  commentId: string;
}) {
  const response = await handleApiRequest(
    api.patch(`/comments/${commentId}`, newComment)
  );

  return response.data.data;
}

export async function deleteComment(commentId: string) {
  const response = await handleApiRequest(api.delete(`/comments/${commentId}`));
  return response.data.data;
}
