import { useUpdateMe } from "@/hooks/auth/useUpdateMe";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Button from "./Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDropzone } from "react-dropzone";

interface IFormInput {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  profilePic?: string;
}

const ProfileInfo = ({ user }: { user: IFormInput }) => {
  const { isUpdating, updateUser } = useUpdateMe();
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(user?.profilePic);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInput>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      profilePic: user?.profilePic,
    },
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setLoading(true);
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "uzsgpleh");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dfsbi29k5/image/upload",
          formData
        );
        const newProfilePic = response.data.secure_url;
        setProfilePic(newProfilePic);
        setValue("profilePic", newProfilePic);
      } catch (error) {
        console.error("Error uploading image:", error);
      }

      setLoading(false);
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    },
    maxFiles: 1,
  });

  const onSubmit = (updatedUser: IFormInput) => {
    updateUser(updatedUser);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-secondary-text mb-6">
        Profile Information
      </h2>

      {/* Profile Image */}
      <div className="flex items-center space-x-4 mb-6">
        <div
          {...getRootProps()}
          className="relative border border-primary-blue p-1 rounded-full cursor-pointer"
        >
          <input {...getInputProps()} />
          <Image
            src={profilePic as string}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
            width={80}
            height={80}
          />
          <FaCheckCircle className="absolute bottom-1 right-1 text-primary-blue text-xl" />
          {isDragActive && (
            <div className="absolute inset-0 bg-blue-200 bg-opacity-50 flex items-center justify-center rounded-full">
              <p className="text-sm text-blue-700">Drop the image here</p>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-xl font-medium text-primary-text">
            {user?.name}
          </h3>
          <p className="text-sm text-secondary-text italic">{user?.email}</p>
          <p className="text-xs text-primary-blue mt-1">
            Click to change profile picture
          </p>
        </div>
      </div>

      {/* Profile Fields */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-primary-text mb-2">
            Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            className="w-full mb-0.5 rounded-md shadow-sm focus:border-primary-blue border outline-none py-1.5 lg:py-2 px-3"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-text mb-2">
            Email Address
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
            disabled
            type="email"
            className="w-full mb-0.5 rounded-md shadow-sm focus:border-primary-blue border outline-none py-1.5 lg:py-2 px-3"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-text mb-2">
            Phone Number
          </label>
          <input
            {...register("phone")}
            type="text"
            className="w-full mb-0.5 rounded-md shadow-sm focus:border-primary-blue border outline-none py-1.5 lg:py-2 px-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-text mb-2">
            Address
          </label>
          <input
            {...register("address")}
            type="text"
            className="w-full mb-0.5 rounded-md shadow-sm focus:border-primary-blue border outline-none py-1.5 lg:py-2 px-3"
          />
        </div>

        <Button
          loading={isUpdating || loading}
          disabled={isUpdating || loading}
        >
          Update Profile
        </Button>
      </form>
    </div>
  );
};

export default ProfileInfo;
