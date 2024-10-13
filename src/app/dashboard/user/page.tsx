"use client";
import Followers from "@/components/Followers";
import Following from "@/components/Following";
import ProfileInfo from "@/components/ProfileInfo";
import Spinner from "@/components/Spinner";
import { useMe } from "@/hooks/auth/useMe";
import React from "react";

const UserDashboard = () => {
  const { user, isLoading } = useMe();
  if (isLoading) return <Spinner />;

  return (
    <div className="bg-primary-background text-primary-text">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* First Column */}
        <div className="col-span-2 space-y-6">
          <ProfileInfo user={user} />
        </div>

        {/* Second Column */}
        <div className="col-span-1 space-y-6">
          <Followers followers={user?.followers} />
          <Following following={user?.following} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
