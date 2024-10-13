import React, { useEffect, useState } from "react";
import {
  MdThumbDownOffAlt,
  MdThumbDownAlt,
  MdThumbUp,
  MdOutlineThumbUpOffAlt,
} from "react-icons/md";
import { GoComment } from "react-icons/go";
import { useMe } from "@/hooks/auth/useMe";
import { useUpdatePost } from "@/hooks/posts/useUpdatePost";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FaFacebookSquare, FaTwitterSquare, FaWhatsapp } from "react-icons/fa";

const PostMedia = ({
  postUpvotes,
  postDownvotes,
  postId,
  totalComments,
}: {
  postUpvotes: string[];
  postDownvotes: string[];
  postId: string;
  totalComments: number;
  disabled?: boolean;
}) => {
  const { user } = useMe();
  const { updatePost } = useUpdatePost();

  const [upvotes, setUpvotes] = useState(postUpvotes);
  const [downvotes, setDownvotes] = useState(postDownvotes);
  const [userVote, setUserVote] = useState<"upvote" | "downvote" | null>(null);

  useEffect(() => {
    if (!user) return;
    if (upvotes.includes(user._id)) {
      setUserVote("upvote");
    } else if (downvotes.includes(user._id)) {
      setUserVote("downvote");
    } else {
      setUserVote(null);
    }
  }, [upvotes, downvotes, user]);

  const handleVote = (voteType: "upvote" | "downvote") => {
    const otherVoteType = voteType === "upvote" ? "downvote" : "upvote";
    const voteArray = voteType === "upvote" ? upvotes : downvotes;
    const otherVoteArray = voteType === "upvote" ? downvotes : upvotes;

    if (userVote === voteType) {
      // Remove vote
      const newVoteArray = voteArray.filter((id: string) => id !== user._id);
      updatePost({
        postId: postId,
        newPost: { [voteType + "s"]: newVoteArray },
      });
      if (voteType === "upvote") setUpvotes(newVoteArray);
      else setDownvotes(newVoteArray);
      setUserVote(null);
    } else {
      // Add vote and remove from other vote type if necessary
      const newVoteArray = [...voteArray, user._id];
      const newOtherVoteArray = otherVoteArray.filter(
        (id: string) => id !== user._id
      );
      updatePost({
        postId: postId,
        newPost: {
          [voteType + "s"]: newVoteArray,
          [otherVoteType + "s"]: newOtherVoteArray,
        },
      });
      if (voteType === "upvote") {
        setUpvotes(newVoteArray);
        setDownvotes(newOtherVoteArray);
      } else {
        setDownvotes(newVoteArray);
        setUpvotes(newOtherVoteArray);
      }
      setUserVote(voteType);
    }
  };

  const shareUrl = `${window.location.origin}/post/${postId}`;

  return (
    <div className="flex  items-center gap-4 flex-wrap">
      <div className="flex justify-between items-center text-gray-500 text-xs">
        <div className="flex items-center space-x-2 bg-[#272B34] rounded-xl px-4 py-2">
          <button
            onClick={() => handleVote("upvote")}
            className="flex items-center"
          >
            {userVote === "upvote" ? (
              <MdThumbUp className="text-xl text-[#7147ED]" />
            ) : (
              <MdOutlineThumbUpOffAlt className="text-xl" />
            )}
          </button>
          <span>{upvotes?.length}</span>
          <button
            onClick={() => handleVote("downvote")}
            className="flex items-center ml-4"
          >
            {userVote === "downvote" ? (
              <MdThumbDownAlt className="text-xl text-[#7147ED]" />
            ) : (
              <MdThumbDownOffAlt className="text-xl" />
            )}
          </button>
          <span>{downvotes.length}</span>
        </div>
      </div>
      {/* Comment section */}
      <div className="flex items-center space-x-2 bg-[#272B34] rounded-xl px-4 py-2">
        <button className="flex items-center">
          <GoComment className="text-lg text-[#7147ED]" />
        </button>
        <span>{totalComments}</span>
      </div>

      <div className="flex items-center space-x-2 bg-[#272B34] rounded-xl px-4 py-2">
        <FacebookShareButton url={shareUrl}>
          <div className="flex items-center space-x-2">
            <FaFacebookSquare className="text-lg text-[#7147ED]" />
          </div>
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl}>
          <div className="flex items-center space-x-2">
            <FaTwitterSquare className="text-lg text-[#7147ED]" />
          </div>
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl}>
          <div className="flex items-center space-x-2">
            <FaWhatsapp className="text-lg text-[#7147ED]" />
          </div>
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default PostMedia;
