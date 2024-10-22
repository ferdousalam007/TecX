"use client";
import React, { useState } from "react";
import { FaPlus, FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { useUsers } from "../hooks/users/useUsers";
import { useDeleteUser } from "../hooks/users/useDeleteUser";
import Button from "./Button";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import UserModal from "./modals/UserModal";

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-purple-500 text-white";
    case "user":
      return "bg-yellow-700 text-white";
    default:
      return "bg-slate-800  text-white";
  }
};

const UserTable: React.FC = () => {
  const { users, error, isLoading } = useUsers();
  const { deleteUser } = useDeleteUser();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!users.length) return <ErrorMessage message={"No Users Found"} />;

  // Pagination logic
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="shadow overflow-x-auto rounded-lg">
      <table className="min-w-full text-sm text-secondary-text">
        <thead className="bg-secondary-background text-xs uppercase font-medium text-primary-text">
          <tr>
            <th></th>
            <th
              scope="col"
              className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
            >
              Role
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
            >
              Phone
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
            >
              Address
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left tracking-wider whitespace-nowrap flex items-center gap-3"
            >
              Actions
              <Button
                className="text-sm py-2 px-2"
                onClick={() => {
                  setSelectedUser(null);
                  setModalIsOpen(true);
                }}
              >
                <FaPlus />
              </Button>
            </th>
          </tr>
        </thead>
        <tbody className="bg-primary-background">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {currentUsers.map((user: any, index: number) => (
            <tr
              key={user._id}
              className={`${
                index % 2 === 0 ? "bg-secondary-background bg-opacity-20" : ""
              }`}
            >
              <td className="pl-4">{indexOfFirstUser + index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getRoleBadgeColor(
                    user.role
                  )}`}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.address}</td>
              <td className="px-6 py-4 whitespace-nowrap flex gap-2 items-center">
                <Button
                  className="text-sm py-1.5 px-1.5"
                  onClick={() => {
                    setSelectedUser(user);
                    setModalIsOpen(true);
                  }}
                >
                  <FaRegPenToSquare />
                </Button>
                <Button
                  className="text-sm py-1.5 px-1.5"
                  onClick={() => deleteUser(user?._id)}
                >
                  {user?._id}
                  <FaRegTrashCan />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UserModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        user={selectedUser}
      />
      <div className="flex justify-center gap-4 items-center py-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default UserTable;
