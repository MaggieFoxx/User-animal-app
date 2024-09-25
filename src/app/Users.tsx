import { useState, useEffect } from "react";
import axios from "axios";
import Table from "../components/Table";

type Gender = "female" | "male" | "other";

export type User = {
  id: string;
  name: string;
  gender: Gender;
  banned: boolean;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(
          "https://inqool-interview-api.vercel.app/api/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-2 w-3/5 mx-auto">
      <Table items={users} isUser={true} />
      </div>
  )
      
};

export default Users;
