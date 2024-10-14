/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Modal from "react-modal";
import { AnimatePresence, motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import Dropzone from "react-dropzone";
import axios from "axios";
import { IoMdCloudUpload } from "react-icons/io";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import Button from "../Button";
import { useCategories } from "@/hooks/categories/useCategories";
import { useCreatePost } from "@/hooks/posts/useCreatePost";
import { useUpdatePost } from "@/hooks/posts/useUpdatePost";
import { useMe } from "@/hooks/auth/useMe";
import Image from "next/image";
import handleBase64Images from "@/utils/handleBase64Images";

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

interface PostModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: (value: boolean) => void;
  post?: any | null;
}

interface FormData {
  title: string;
  content: string;
  category: string;
  author: string;
  images: string[];
  isPremium: boolean;
}

const PostModal: React.FC<PostModalProps> = ({
  modalIsOpen,
  setModalIsOpen,
  post,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      content: "",
      category: "",
      images: [],
      isPremium: false,
    },
  });

  const { categories } = useCategories();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { createPost, isPending: isCreating } = useCreatePost();
  const { updatePost, isPending: isUpdating } = useUpdatePost();
  const { user } = useMe();
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
    }),
    []
  );

  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        content: post.content,
        category: post.category?._id,
        images: post.images,
        isPremium: post.isPremium,
      });
      setUploadedImages(post.images);
    } else {
      reset({
        title: "",
        content: "",
        category: "",
        images: [],
        isPremium: false,
      });
      setUploadedImages([]);
    }
  }, [post, reset]);

  const onSubmit = async (newPost: FormData) => {
    const modifiedContent = await handleBase64Images(newPost.content);

    newPost.content = modifiedContent.replace(/"/g, "'");
    clearErrors("images");
    newPost.images = uploadedImages;

    if (post) {
      updatePost({ postId: post._id, newPost });
    } else {
      newPost.author = user._id;
      createPost(newPost);
    }
    closeModal();
    reset();
    setUploadedImages([]);
  };

  const onDrop = async (acceptedFiles: File[]) => {
    setLoading(true);
    const imageUploads = acceptedFiles.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "uzsgpleh");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dfsbi29k5/image/upload",
          formData
        );
        return response.data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return null;
      }
    });

    const imgUrls = await Promise.all(imageUploads);
    setUploadedImages((prevImages) => [
      ...prevImages,
      ...imgUrls.filter((url): url is string => url !== null),
    ]);
    setLoading(false);
  };

  const removeImage = (index: number) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <AnimatePresence>
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Post Details"
          className="container z-50 mx-5"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="relative md:w-2/3 mx-auto max-h-[80vh] overflow-auto rounded-lg bg-primary-background p-8 shadow-lg"
          >
            <button
              onClick={closeModal}
              className="absolute right-3 top-3 rounded-full bg-primary-white p-2 text-xl text-primary-grey shadow-lg transition-transform duration-300 will-change-transform hover:scale-90 lg:text-2xl"
            >
              <RxCross2 />
            </button>
            <h2 className="text-2xl font-semibold text-primary-text mb-4 text-center">
              {post ? "Edit Post" : "Add New Post"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-primary-text">
                  Title
                </label>
                <input
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
                  placeholder="Enter post title"
                />
                {errors.title && (
                  <p className="text-primary-red text-sm">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-primary-text">
                  Category
                </label>
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
                >
                  <option value="">Select a category</option>
                  {categories?.map(
                    (category: { _id: string; name: string }) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    )
                  )}
                </select>
                {errors.category && (
                  <p className="text-primary-red text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-primary-text">
                  Images
                </label>
                <Controller
                  name="images"
                  control={control}
                  rules={{
                    validate: () =>
                      uploadedImages.length > 0 ||
                      "At least one image is required",
                  }}
                  render={({ field }) => (
                    <Dropzone
                      onDrop={async (acceptedFiles) => {
                        const imgUrls = await onDrop(acceptedFiles);
                        field.onChange(imgUrls);
                      }}
                      multiple
                      accept={{
                        "image/png": [".png"],
                        "image/jpg": [".jpg"],
                        "image/jpeg": [".jpeg"],
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div
                          {...getRootProps()}
                          className="w-full px-8 py-3 border border-secondary-grey hover:border-primary-orange rounded-md cursor-pointer"
                        >
                          <input {...getInputProps()} />
                          <div className="flex justify-center text-4xl">
                            <IoMdCloudUpload className="text-primary-orange" />
                          </div>
                          <p className="text-secondary-text text-center">
                            Upload relevant images for the post
                          </p>
                          {loading && (
                            <p className="text-primary-text text-center">
                              Uploading...
                            </p>
                          )}
                        </div>
                      )}
                    </Dropzone>
                  )}
                />
                {errors.images && (
                  <p className="text-primary-red text-sm">
                    {errors.images.message}
                  </p>
                )}
              </div>

              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={image}
                        alt={`Uploaded image ${index + 1}`}
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 rounded-full bg-primary-red text-white p-1 text-xs"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-sm font-medium text-primary-text">
                  Content
                </label>
                <Controller
                  name="content"
                  control={control}
                  rules={{ required: "Content is required" }}
                  render={({ field }) => (
                    <ReactQuill
                      value={field.value}
                      onChange={field.onChange}
                      modules={modules}
                      formats={formats}
                      // className="bg-white"
                    />
                  )}
                />
                {errors.content && (
                  <p className="text-primary-red text-sm">
                    {errors.content.message}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <label className="text-sm font-medium text-primary-text">
                  Premium Post?
                </label>
                <input
                  type="checkbox"
                  {...register("isPremium")}
                  className="h-5 w-5 cursor-pointer"
                />
              </div>

              <div className="mt-5">
                <Button
                  loading={isUpdating || isCreating || loading}
                  disabled={isUpdating || isCreating || loading}
                >
                  {post ? "Update Post" : "Create Post"}{" "}
                </Button>
              </div>
            </form>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default PostModal;
