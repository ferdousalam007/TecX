import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { AnimatePresence, motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { MdEditNote } from "react-icons/md";
import axios from "axios";
// import Button from "../Button";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { useUpdateMe } from "@/hooks/auth/useUpdateMe";
import Button from "./Button";

interface IFormInput {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  profilePic?: string;
}

interface ProfileModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: (value: boolean) => void;
  user: IFormInput | null;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  modalIsOpen,
  setModalIsOpen,
  user,
}) => {
  const { isUpdating, updateUser } = useUpdateMe();
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(user?.profilePic);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      profilePic: user?.profilePic,
    },
  });

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        profilePic: user.profilePic,
      });
    }
  }, [user, reset]);

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
    accept: { "image/*": [".jpeg", ".png", ".jpg"] },
    maxFiles: 1,
  });

  const onSubmit = (updatedUser: IFormInput) => {
    updateUser(updatedUser);
    closeModal();
  };

  return (
    <AnimatePresence>
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Profile Info"
          className="container z-50 mx-5 "
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="relative md:w-2/3 mx-auto max-h-[80vh] overflow-auto rounded-lg bg-primary-background p-8 shadow-lg custom-border-card"
          >
            <button
              onClick={closeModal}
              className="absolute right-3 top-3 rounded-full bg-primary-white p-2 text-xl text-primary-grey shadow-lg transition-transform duration-300 will-change-transform hover:scale-90 lg:text-2xl"
            >
              <RxCross2 />
            </button>
            <h2 className="text-2xl font-semibold text-primary-text mb-4 text-center">
              Edit Profile
            </h2>

            <div className="flex items-center space-x-4 mb-6">
              <div
                {...getRootProps()}
                className="relative border border-purple-500 p-1 rounded cursor-pointer"
              >
                <input {...getInputProps()} />
                <Image
                  src={profilePic as string}
                  alt="Profile"
                  className="w-20 h-20 rounded object-cover"
                  width={80}
                  height={80}
                />

                <MdEditNote className="absolute bottom-[-20px] right-1 text-purple-700  border-slate-600 bg-slate-900 text-3xl" />
                {isDragActive && (
                  <div className="absolute inset-0  flex items-center justify-center rounded-full">
                    <p className="text-sm text-purple-700">Upload image</p>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-xl font-medium text-primary-text">
                  {user?.name}
                </h3>
                <p className="text-sm text-secondary-text italic">
                  {user?.email}
                </p>
              </div>
            </div>

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
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
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
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
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
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;
