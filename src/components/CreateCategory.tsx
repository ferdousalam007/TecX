import { useForm } from "react-hook-form";
import { useCreateCategories } from "@/hooks/categories/useCreateCategories";


interface FormData {
  name: string;
}

const CreateCategory = () => {
  const { createCategory } = useCreateCategories();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    createCategory(data);
    reset(); // Reset form after submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          className="block text-sm font-medium text-primary-text mb-2"
          htmlFor="name"
        >
          Category Name:
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter Categoy Name"
          className="w-full border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
          {...register("name", { required: "Category name is required" })} // Register input with validation
        />
        {errors.name && (
          <p className="text-primary-red text-sm">
            {errors.name && <span>{errors.name.message}</span>}
          </p>
        )}

        {/* Display validation errors */}
      </div>
      <button
        className="rounded-xl px-5 py-2.5 transition-all duration-300 border  font-medium flex justify-center  items-center  focus:ring-2 focus:ring-primary-blue focus:ring-opacity-50 bg-secondary-background opacity-85 mt-4"
        type="submit"
      >
        Create
      </button>
    </form>
  );
};

export default CreateCategory;
