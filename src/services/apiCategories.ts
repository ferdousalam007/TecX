"use server";
import { FieldValues } from "react-hook-form";
import handleApiRequest from "../utils/handleApiRequest";
import api from "./api";

export async function getAllCategories() {
  const response = await handleApiRequest(api.get("/categories"));
  return response.data.data;
}
export async function createCategory(newCategory: FieldValues) {
  const response = await handleApiRequest(api.post("/categories", newCategory));
  return response.data.data;
}
