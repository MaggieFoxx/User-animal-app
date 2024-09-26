import axios from "axios";
import Table from "../components/Table";
import UserAnimalForm from "../components/UserAnimalForm";
import { useState, useEffect } from "react";
import { Animal } from "./types";

const Animals: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Animal | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAnimals = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<Animal[]>(
          "https://inqool-interview-api.vercel.app/api/animals"
        );
        setAnimals(response.data);
      } catch (error) {
        console.error("Error fetching animals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  const openDialog = (item?: Partial<Animal> | null) => {
    setEditingItem(item as Animal | null);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const refreshData = async () => {
    try {
      const response = await axios.get<Animal[]>(
        "https://inqool-interview-api.vercel.app/api/animals"
      );
      setAnimals(response.data);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="mt-2 w-3/5 mx-auto">
      <button
        type="button"
        onClick={() => openDialog()}
        className="custom-button bg-indigo-600"
      >
        Add Animal
      </button>
      <Table items={animals} isUser={false} onEdit={openDialog} />
      {isDialogOpen && (
        <UserAnimalForm
          isUser={false}
          initialValues={editingItem || { name: "", type: "cat", age: 0 }}
          onClose={closeDialog}
          refreshData={refreshData}
        />
      )}
    </div>
  );
};

export default Animals;
