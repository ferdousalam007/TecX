import Image from "next/image";
import React from "react";
import { FaUserEdit } from "react-icons/fa";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Followers = ({ followers }: any) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-primary-text mb-3">
        Followers
      </h2>
      {followers?.length === 0 && (
        <div className="flex items-center justify-center space-x-2">
          <FaUserEdit className="text-3xl text-gray-300" />
          <p className="text-gray-300">No followers yet</p>
        </div>
      )}
      {/* Followers List */}
      <ul>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {followers?.map((follower: any) => (
          <li className="mb-3" key={follower._id}>
            <div className="flex justify-between items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Image
                  src={follower.profilePic}
                  alt=""
                  className="w-10 h-10 rounded-full"
                  width={40}
                  height={40}
                />
                <div>
                  <div className="font-semibold italic">{follower.name}</div>
                  <div className="text-xs text-gray-500 italic">
                    {follower.email}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Followers;
