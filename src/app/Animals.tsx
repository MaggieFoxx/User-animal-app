import { useState, useEffect } from "react";
import axios from "axios";
import Table from "../components/Table";

type AnimalType = "cat" | "dog" | "other";

export type Animal = {
  id: string;
  name: string;
  type: AnimalType;
  age: number;
};

const Animals = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<Animal[]>(
          "https://inqool-interview-api.vercel.app/api/animals"
        );
        setAnimals(response.data);
        console.log(animals)
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  if (!animals) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-2 w-3/5 mx-auto">
      <Table items={animals} isUser={false}/>
      </div>
  )
      
};

export default Animals;
