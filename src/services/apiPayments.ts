"use server";
import handleApiRequest from "../utils/handleApiRequest";
import api from "./api";

export async function getAllPayments() {
  const response = await handleApiRequest(api.get("/payments"));
  return response.data.data;
}
export async function initPayment() {
  const response = await handleApiRequest(api.post("/payments/init-payment"));
  return response.data.data;
}
