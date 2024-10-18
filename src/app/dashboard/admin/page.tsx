"use client";

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
import PostSummeryChart from "@/components/PostSummeryChart";
import PaymentSummery from "@/components/PaymentSummery";

const Page = () => {
  const { data: analyticsbox, isLoading: isLoadingAnalytics } = useQuery({
    queryKey: ["analyticsData"],
    queryFn: () => fetchAnalyticsData(),
  });

  const { data: postMetrics, isLoading: isLoadingPosts } = useQuery({
    queryKey: ["postMetrics"],
    queryFn: () => fetchPostMetrics(),
  });
 
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


  const postChartData = {
    labels: postDates,
    datasets: [
      {
        label: "Posts",
        data: postCounts,
      },
      {
        label: "Views",
        data: viewsCount,
      },
      {
        label: "Comments",
        data: commentCounts,
      },
      {
        label: "Upvotes",
        data: upvoteCounts,
      },
    ],
  };

  const paymentDates = paymentMetrics?.map((item: { date: string }) =>
    format(new Date(item.date), "MMM d")
  );
  const paymentChartData = {
    labels: paymentDates,
    datasets: [
      {
        label: "Payments Received",
        data: paymentMetrics?.map(
          (item: { totalAmount: number }) => item.totalAmount
        ),
      },
    ],
  };
console.log(paymentChartData)
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        <StatsCard
          title="Users"
          value={analyticsbox?.user}
          icon={<FiUsers />}
        />
        <StatsCard
          title="Posts"
          value={analyticsbox?.post}
          icon={<PiArticleLight />}
        />
        <StatsCard
          title="Views"
          value={analyticsbox?.viewsCount}
          icon={<MdViewInAr />}
        />
        <StatsCard
          title="Categories"
          value={analyticsbox?.category}
          icon={<BsListCheck />}
        />
      </div>
      <div className="custom-border-card rounded-lg shadow-lg mb-8 p-5 lg:p-8">
        <h2 className="text-xl lg:text-2xl  font-semibold text-center text-primary-text mb-5">
          Post Analitics
        </h2>
        <PostSummeryChart chartData={postChartData} />
      </div>

      <div className="custom-border-card rounded-lg shadow-lg mb-8 p-5 lg:p-8">
        <h2 className="text-xl lg:text-2xl  font-semibold text-center text-primary-text mb-5">
          Payment Analitics
        </h2>
        <PaymentSummery paymentChartData={paymentChartData} />
      </div>
    </section>
  );
};

export default Page;
