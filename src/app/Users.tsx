import axios from "axios";
import Table from "../components/Table";
import UserAnimalForm from "../components/UserAnimalForm";
import { useState, useEffect } from "react";
import { User } from "./types";

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<User[]>(
          "https://inqool-interview-api.vercel.app/api/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const openDialog = (item?: Partial<User> | null) => {
    setEditingItem(item as User | null);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const refreshData = async () => {
    try {
      const response = await axios.get<User[]>(
        "https://inqool-interview-api.vercel.app/api/users"
      );
      setUsers(response.data);
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
        Add User
      </button>
      <Table items={users} isUser={true} onEdit={openDialog} />
      {isDialogOpen && (
        <UserAnimalForm
          isUser={true}
          initialValues={
            editingItem || { name: "", gender: "female", banned: false }
          }
          onClose={closeDialog}
          refreshData={refreshData}
        />
      )}
    </div>
  );
};

export default Users;
