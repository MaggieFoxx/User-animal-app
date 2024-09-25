import { useMemo, useState } from "react";
import { User } from "../app/Users";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Animal } from "../app/Animals";

interface TableProps {
  items: User[] | Animal[];
  isUser: boolean;
}

const Table = ({ items, isUser }: TableProps) => {
  const [filter, setFilter] = useState<string>("");

  const filteredUsers = useMemo(() => {
    if (!filter) return items;
    return items.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, items]);

  const columns = useMemo<ColumnDef<User | Animal>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => info.getValue(),
      },
      isUser
        ? {
            accessorKey: "gender",
            header: "Gender",
            cell: (info) => info.getValue(),
          }
        : {
            accessorKey: "type",
            header: "Type",
            cell: (info) => info.getValue(),
          },
      isUser
        ? {
            accessorKey: "banned",
            header: "Status",
            cell: (info) => (info.getValue() ? "Banned" : "Active"),
          }
        : {
            accessorKey: "age",
            header: "Age",
            cell: (info) => info.getValue(),
          },
      {
        id: "edit",
        header: "Edit",
        cell: ({ row }) => (
          <button
            onClick={() => handleEdit(row.original.id)}
            className="bg-blue-500 text-white py-1 px-2 rounded"
          >
            Edit
          </button>
        ),
      },
    ],
    [isUser]
  );

  const handleEdit = (userId: string) => {
    console.log(`Edit user with ID: ${userId}`);
  };

  const clearFilter = () => {
    setFilter("");
  };

  const customTable = useReactTable({
    columns,
    data: filteredUsers,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <input
        type="text"
        placeholder="Filter by name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-2 p-2 border border-gray-300 rounded"
      />

      <button
        onClick={clearFilter}
        className="ml-2 bg-red-500 text-white py-1 px-3 rounded"
      >
        Clear
      </button>

      <table className="min-w-full">
        <thead>
          {customTable.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    scope="col"
                    className="border border-gray-300 px-4 py-2 bg-gray-100 text-left"
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {customTable.getFilteredRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => console.log(`User ID: ${row.original.id}`)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-gray-300 px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}

          {customTable.getFilteredRowModel().rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="text-center py-2">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div>{filteredUsers.length.toLocaleString()} Rows</div>
    </div>
  );
};

export default Table;
