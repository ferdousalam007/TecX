import React, { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import Image from "next/image";
import { useUpdateMe } from "@/hooks/auth/useUpdateMe";
import { useUpdateUser } from "@/hooks/users/useUpdateUser";
import { useMe } from "@/hooks/auth/useMe";
import { FiUserPlus, FiUserMinus } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
interface Author {
  _id: string;
  name: string;
  profilePic: string;
  email: string;

  followers: Array<{
    _id: string;
    name: string;
    email: string;
    profilePic: string;
  }>;
  following: Array<{
    _id: string;
    name: string;
    email: string;
    profilePic: string;
  }>;
}

interface PostAuthorProps {
  author: Author;
  postCreatedAt: string;
  isVerified?: boolean;
}

const PostAuthor: React.FC<PostAuthorProps> = ({
  author,
  postCreatedAt,
  isVerified,
}) => {
  console.log(author, "author");
  const { user } = useMe();
  const { updateUser: updateCurrentUser } = useUpdateMe();
  const { updateUser } = useUpdateUser();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    setIsFollowing(
      user?.following?.some(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (followedUser: any) => followedUser?._id === author?._id
      ) || false
    );
  }, [user?.following, author?._id]);

  const handleFollowUnfollow = useCallback(() => {
    if (!user) return;

    const newFollowing = isFollowing
      ? user?.following?.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (followedUser: any) => followedUser?._id !== author?._id
        )
      : [
          ...(user.following || []),
          {
            _id: author._id,
            name: author.name,
            email: author.email,
            profilePic: author.profilePic,
          },
        ];

    const newFollowers = isFollowing
      ? author?.followers?.filter((follower) => follower?._id !== user._id)
      : [
          ...(author.followers || []),
          {
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
          },
        ];

    updateCurrentUser({ following: newFollowing });
    updateUser({
      userId: author._id,
      newUser: { followers: newFollowers },
    });

    setIsFollowing(!isFollowing);
  }, [isFollowing, user, author, updateCurrentUser, updateUser]);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-3">
      <div className="flex items-center  space-x-4">
        <Image
          className="w-10 h-10 rounded-full object-cover border custom-border-card"
          src={author?.profilePic}
          alt={`${author?.name}'s profile picture`}
          width={40}
          height={40}
        />

        <div>
          <div className="font-semibold flex items-center gap-1">
            {author?.name}
            {isVerified === true && (
              <span className="text-blue-500 text-xl">
                <MdVerified />
              </span>
            )}
          </div>
          <div className="text-xs ">
            {author?.name && format(new Date(postCreatedAt), "PP")}
          </div>
        </div>
      </div>
      {user && user?._id !== author?._id && (
        <button
          onClick={handleFollowUnfollow}
          className=" px-1 md:px-1 text-[14px]   bg-[#272B34] text-[#a8b3cf] rounded-md border custom-border-card items-center
          hover:bg-[#432256ab] hover:text-[#9732B5] hover:border-[#9732B5] transition ease-in-out duration-300 flex space-x-1
          "
        >
          {isFollowing ? <FiUserMinus /> : <FiUserPlus />}
          <span>{isFollowing ? "Unfollow" : "Follow"}</span>
        </button>
      )}
    </div>
  );
};

export default PostAuthor;
