"use server";
import handleApiRequest from "../utils/handleApiRequest";
import api from "./api";
import { FieldValues } from "react-hook-form";

export async function getAllUsers() {
  const response = await handleApiRequest(api.get("/users"));
  return response.data.data;
}

export async function getUser(userId: string) {
  const response = await handleApiRequest(api.get(`/users/${userId}`));
  return response.data.data;
}

export async function updateUser({
  userId,
  newUser,
}: {
  userId: string;
  newUser: FieldValues;
}) {
  const response = await handleApiRequest(
    api.patch(`/users/${userId}`, newUser)
  );
  return response.data.data;
}

export async function deleteUser(userId: string) {
  const response = await handleApiRequest(api.delete(`/users/${userId}`));
  return response.data.data;
}

export async function createUser(newUser: FieldValues) {
  const response = await handleApiRequest(api.post("/users", newUser));
  return response.data.data;
}
