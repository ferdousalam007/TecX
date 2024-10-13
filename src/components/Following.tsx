import React from "react";
import Image from "next/image";
import { FaUserEdit } from "react-icons/fa";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Following = ({ following }: any) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-primary-text mb-3">
        Following
      </h2>
      {following?.length === 0 && (
        <div className="flex items-center justify-center space-x-2">
          <FaUserEdit className="text-3xl text-gray-300" />
          <p className="text-gray-300">No following yet</p>
        </div>
      )}
      {/* Following List */}
      <ul>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {following?.map((followedUser: any) => (
          <li className="mb-3" key={followedUser._id}>
            <div className="flex justify-between items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Image
                  src={followedUser.profilePic}
                  alt=""
                  className="w-10 h-10 rounded-full"
                  width={40}
                  height={40}
                />
                <div>
                  <div className="font-semibold italic">
                    {followedUser.name}
                  </div>
                  <div className="text-xs text-gray-500 italic">
                    {followedUser.email}
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

export default Following;
