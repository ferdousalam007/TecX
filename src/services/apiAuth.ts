"use server";
import { cookies } from "next/headers";
import handleApiRequest from "../utils/handleApiRequest";
import api from "./api";
import { FieldValues } from "react-hook-form";

// Refactored signup function using handleApiRequest
export async function signup(newUser: FieldValues) {
  const response = await handleApiRequest(api.post("/auth/signup", newUser));
  cookies().set("token", response.data.token);
  return response.data.data;
}

// Refactored login function using handleApiRequest
export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await handleApiRequest(
    api.post("/auth/signin", { email, password })
  );
  cookies().set("token", response.data.token);
  return response.data.data;
}

// Refactored logout function using handleApiRequest
export async function logout() {
  const response = await handleApiRequest(api.get("/auth/logout"));
  cookies().set("token", "");
  return response.data;
}

// Refactored getCurrentUser function using handleApiRequest
export async function getCurrentUser() {
  const response = await api.get("/users/me");
  return response.data.data;
}

// Refactored updateCurrentUser function using handleApiRequest
export async function updateCurrentUser(updatedUser: FieldValues) {
  const response = await handleApiRequest(api.patch("/users/me", updatedUser));
  return response.data.data;
}

export async function forgotPassword(email: string) {
  const response = await handleApiRequest(
    api.post("/auth/forgot-password", { email })
  );
  return response.data.data;
}

export async function resetPassword({
  password,
  token,
}: {
  password: string;
  token: string;
}) {
  const response = await handleApiRequest(
    api.patch(`/auth/reset-password/${token}`, { password })
  );
  return response.data.data;
}
