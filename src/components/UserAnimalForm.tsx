import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  animalSchema,
  UserAnimalFormProps,
  userSchema,
  UserFormSchema,
  AnimalFormSchema,
} from "../app/types";

const UserAnimalForm: React.FC<UserAnimalFormProps> = ({
  isUser,
  initialValues,
  onClose,
  refreshData,
}) => {
  const form = useForm({
    resolver: zodResolver(isUser ? userSchema : animalSchema),
    defaultValues:
      initialValues ||
      (isUser
        ? { name: "", gender: "female", banned: false }
        : { name: "", type: "cat", age: 0 }),
  });

  const handleSubmit = async (
    values: Partial<UserFormSchema | AnimalFormSchema>
  ) => {
    try {
      if (initialValues && "id" in initialValues) {
        await axios.patch(
          `https://inqool-interview-api.vercel.app/api/${isUser ? "users" : "animals"}/${initialValues.id}`,
          values
        );
      } else {
        await axios.post(
          `https://inqool-interview-api.vercel.app/api/${isUser ? "users" : "animals"}`,
          values
        );
      }
      form.reset();
      onClose();
      refreshData();
    } catch (error) {
      console.error(`Error submitting form:`, error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-md max-w-md w-full relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div>
            <label className="form-label">Name</label>
            <input
              {...form.register("name")}
              placeholder="Enter name"
              className="input-field block w-full px-3 py-2"
            />
            {form.formState.errors.name && (
              <p className="mt-2 text-sm text-red-600">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          {isUser ? (
            <>
              <div>
                <label className="form-label">Gender</label>
                <select
                  {...form.register("gender")}
                  className="input-field block w-full px-3 py-2"
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="form-label">Banned</label>
                <input
                  type="checkbox"
                  {...form.register("banned")}
                  className="h-4 w-4 input-field"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="form-label">Type</label>
                <select
                  {...form.register("type")}
                  className="input-field block w-full px-3 py-2"
                >
                  <option value="cat">Cat</option>
                  <option value="dog">Dog</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="form-label">Age</label>
                <input
                  type="number"
                  {...form.register("age", { valueAsNumber: true })}
                  placeholder="Enter age"
                  className="input-field block w-full px-3 py-2"
                />
                {form.formState.errors.age && (
                  <p className="mt-2 text-sm text-red-600">
                    {form.formState.errors.age.message}
                  </p>
                )}
              </div>
            </>
          )}
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default UserAnimalForm;
