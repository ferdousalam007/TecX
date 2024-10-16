"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa6";
import { RiChatFollowUpLine } from "react-icons/ri";
import { MdFollowTheSigns } from "react-icons/md";
import ProfileModal from "@/components/ProfileInfo";
import Followers from "@/components/Followers";
import Following from "@/components/Following";
import Spinner from "@/components/Spinner";
import { useMe } from "@/hooks/auth/useMe";

const UserDashboard = () => {
  const { user, isLoading } = useMe();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (isLoading) return <Spinner />;

  const openModal = () => setModalIsOpen(true);

  return (
    <div className="bg-primary-background text-primary-text">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div className="custom-border-card text-white rounded-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">
                <Image
                  src={user?.profilePic}
                  alt="User Photo"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </h2>
              <p className="text-2xl font-bold">
                {user?.name?.length > 20
                  ? `${user?.name?.slice(0, 20)}...`
                  : user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)}
              </p>
              <p className="text-green-500 mt-2">{user?.email}</p>
            </div>
            <div className="text-4xl text-green-500">
              <FaRegUser />
            </div>
          </div>
          <div className="text-xl flex justify-end items-center">
            {/* Button to open modal */}
            <button
              className="bg-green-500 border-slate-100 border rounded-lg p-2"
              onClick={openModal}
            >
              Edit +
            </button>
          </div>
        </div>

        <div className="custom-border-card text-white rounded-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Total Followers</h2>
              <p className="text-3xl font-bold text-purple-500">
                {user?.followers?.length}
              </p>
            </div>
            <div className="text-4xl text-purple-500">
              <RiChatFollowUpLine />
            </div>
          </div>
        </div>

        <div className="custom-border-card text-white rounded-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Total Following</h2>
              <p className="text-3xl font-bold text-green-500">
                {user?.following?.length}
              </p>
            </div>
            <div className="text-4xl text-green-500">
              <MdFollowTheSigns />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Followers followers={user?.followers} />
        <Following following={user?.following} />
      </div>
      <ProfileModal
        user={user}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </div>
  );
};

export default UserDashboard;
