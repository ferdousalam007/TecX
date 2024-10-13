"use client";
import PaymentChart from "@/components/PaymentChart";
import PostChart from "@/components/PostChart";
import StatsCard from "@/components/StatsCard";
import { format } from "date-fns";
import React from "react";
import { FiUsers } from "react-icons/fi";
import { PiArticleLight } from "react-icons/pi";
import { MdViewInAr } from "react-icons/md";
import { BsListCheck } from "react-icons/bs";


import { useQuery } from "@tanstack/react-query";
import {
  fetchAnalyticsData,
  fetchPaymentMetrics,
  fetchPostMetrics,
} from "@/services/apiAnalytics";
import Spinner from "@/components/Spinner";

const Page = () => {
  const { data: analyticsData, isLoading: isLoadingAnalytics } = useQuery({
    queryKey: ["analyticsData"],
    queryFn: () => fetchAnalyticsData(),
  });

  const { data: postMetrics, isLoading: isLoadingPosts } = useQuery({
    queryKey: ["postMetrics"],
    queryFn: () => fetchPostMetrics(),
  });
  console.log(postMetrics);
  const { data: paymentMetrics, isLoading: isLoadingPayments } = useQuery({
    queryKey: ["paymentMetrics"],
    queryFn: () => fetchPaymentMetrics(),
  });

  if (isLoadingAnalytics || isLoadingPosts || isLoadingPayments) {
    return <Spinner />;
  }

  const postDates = postMetrics?.map((item: { date: string }) =>
    format(new Date(item.date), "MMM d")
  );
  const postCounts = postMetrics?.map(
    (item: { postCount: { postCount: number } }) =>
      item.postCount?.postCount || 0
  );
  const viewsCount = postMetrics?.map(
    (item: { postCount: { viewsCount: number } }) =>
      item.postCount?.viewsCount || 0
  );
  const commentCounts = postMetrics?.map(
    (item: { commentCount: number }) => item.commentCount
  );
  const upvoteCounts = postMetrics?.map(
    (item: { upvoteCount: number }) => item.upvoteCount
  );

  const postChartConfig = {
    labels: postDates,
    datasets: [
      {
        label: "Posts",
        data: postCounts,
        backgroundColor: "#62035a",
        borderColor: "#62035a",
        borderWidth: 1,
      },
      {
        label: "Views",
        data: viewsCount,
        backgroundColor: "#fc2b14",
        borderColor: "#fc2b14",
        borderWidth: 1,
      },
      {
        label: "Comments",
        data: commentCounts,
        backgroundColor: "#10dba6",
        borderColor: "#10dba6",
        borderWidth: 1,
      },
      {
        label: "Upvotes",
        data: upvoteCounts,
        backgroundColor: "#1447fc",
        borderColor: "#1447fc",
        borderWidth: 1,
      },
    ],
  };

  const paymentDates = paymentMetrics?.map((item: { date: string }) =>
    format(new Date(item.date), "MMM d")
  );
  const paymentChartConfig = {
    labels: paymentDates,
    datasets: [
      {
        label: "Payments Received",
        data: paymentMetrics?.map(
          (item: { totalAmount: number }) => item.totalAmount
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        <StatsCard
          title="Users"
          value={analyticsData?.user}
          icon={<FiUsers />}
        />
        <StatsCard
          title="Posts"
          value={analyticsData?.post}
          icon={<PiArticleLight />}
        />
        <StatsCard
          title="Views"
          value={analyticsData?.viewsCount}
          icon={<MdViewInAr />}
        />
        <StatsCard
          title="Categories"
          value={analyticsData?.category}
          icon={<BsListCheck />}
        />
      </div>
      <div className="bg-secondary-background rounded-lg shadow-lg mb-8 p-5 lg:p-8">
        <h2 className="text-xl lg:text-2xl font-semibold text-center text-primary-text mb-5">
          Post Analitics
        </h2>
        <PostChart chartData={postChartConfig} />
      </div>
      <div className="bg-secondary-background rounded-lg shadow-lg mb-8 p-5 lg:p-8">
        <h2 className="text-xl lg:text-2xl  font-semibold text-center text-primary-text mb-5">
          Payment Analitics
        </h2>
        <PaymentChart chartData={paymentChartConfig} />
      </div>
    </section>
  );
};

export default Page;
