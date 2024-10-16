import React from "react";
import Image from "next/image";
import { FaUserEdit } from "react-icons/fa";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Following = ({ following }: any) => {
  return (
    <div className="p-4 custom-border-card shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-primary-text mb-3">
        Following
      </h2>

      {following?.length === 0 ? (
        // Display this if no following users
        <div className="flex items-center justify-center space-x-2">
          <FaUserEdit className="text-3xl text-gray-300" />
          <p className="text-gray-300">No following available</p>
        </div>
      ) : (
        // Following table
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 px-4">Profile Picture</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
              </tr>
            </thead>
            <tbody>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {following?.map((followedUser: any) => (
                <tr
                  key={followedUser._id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-2 px-4">
                    <Image
                      src={followedUser.profilePic}
                      alt="Followed User Profile"
                      className="w-10 h-10 rounded-full"
                      width={40}
                      height={40}
                    />
                  </td>
                  <td className="py-2 px-4 font-semibold italic">
                    {followedUser.name}
                  </td>
                  <td className="py-2 px-4 text-xs text-gray-500 italic">
                    {followedUser.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Following;
