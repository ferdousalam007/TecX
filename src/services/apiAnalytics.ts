"use server";
import api from "@/services/api";
import handleApiRequest from "@/utils/handleApiRequest";

export const fetchAnalyticsData = async () => {
  const response = await handleApiRequest(api.get("/analytics/model-counts"));
  return response.data;
};

export const fetchPostMetrics = async () => {
  const response = await handleApiRequest(api.get("/analytics/posts-metrics"));
  return response.data;
};

export const fetchPaymentMetrics = async () => {
  const response = await handleApiRequest(
    api.get("/analytics/payments-metrics")
  );
  return response.data;
};
