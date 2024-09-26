import { z } from "zod";

export type Gender = "female" | "male" | "other";
export type AnimalType = "cat" | "dog" | "other";

export type User = {
  id: string;
  name: string;
  gender: Gender;
  banned: boolean;
};

export type Animal = {
  id: string;
  name: string;
  type: AnimalType;
  age: number;
};

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  gender: z.enum(["female", "male", "other"]),
  banned: z.boolean(),
});

export const animalSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["cat", "dog", "other"]),
  age: z.number().min(0, "Age must be a positive number"),
});

export type UserFormSchema = z.infer<typeof userSchema>;
export type AnimalFormSchema = z.infer<typeof animalSchema>;

export interface UserAnimalFormProps {
  isUser: boolean;
  initialValues?: UserFormSchema | AnimalFormSchema;
  onClose: () => void;
  refreshData: () => void;
}

export interface TableProps {
  items: User[] | Animal[];
  isUser: boolean;
  onEdit: (item: User | Animal) => void;
}
