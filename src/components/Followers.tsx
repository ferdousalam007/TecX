import Image from "next/image";
import React from "react";
import { FaUserEdit } from "react-icons/fa";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Followers = ({ followers }: any) => {
  return (
    <div className="p-4 custom-border-card shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-primary-text mb-3">
        Followers
      </h2>

      {followers?.length === 0 ? (
        // Display this if no followers
        <div className="flex items-center justify-center space-x-2">
          <FaUserEdit className="text-3xl text-gray-300" />
          <p className="text-gray-300">No followers available</p>
        </div>
      ) : (
        // Followers table
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
              {followers?.map((follower: any) => (
                <tr
                  key={follower._id}
                  className="border-b border-gray-500 hover:bg-slate-900"
                >
                  <td className="py-2 px-4">
                    <Image
                      src={follower.profilePic}
                      alt="Follower Profile"
                      className="w-10 h-10 rounded-full"
                      width={40}
                      height={40}
                    />
                  </td>
                  <td className="py-2 px-4 font-semibold italic">
                    {follower.name}
                  </td>
                  <td className="py-2 px-4 text-xs  italic">
                    {follower.email}
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

export default Followers;
