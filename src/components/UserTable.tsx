/* eslint-disable @typescript-eslint/no-explicit-any */
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
const DeleteConfirmationModal = ({
  isOpen,
  setIsOpen,
  onDelete,
  userName,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onDelete: () => void;
  userName: string;
}) => {
  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="custom-border-card rounded-lg shadow-md p-6 w-96 text-center">
        <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
        <p className="text-sm  mb-4">
          Are you sure you want to delete <strong>{userName}</strong>? This
          action cannot be undone.
        </p>
        <div className="flex justify-center gap-4">
          <Button
            className=" text-red-500 border border-red-700"
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
          >
            Yes, Delete
          </Button>
          <Button
            className="bg-gray-300 text-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};
const UserTable: React.FC = () => {
  const { users, error, isLoading } = useUsers();
  const { deleteUser } = useDeleteUser();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
    const [userToDelete, setUserToDelete] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
console.log(users,"users table")
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!users.length) return <ErrorMessage message={"No Users Found"} />;


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
      <div className="flex justify-center mb-5">
        <Button
          className="text-sm py-2 px-2 "
          onClick={() => {
            setSelectedUser(null);
            setModalIsOpen(true);
          }}
        >
          <FaPlus className="text-yellow-600 mr-1 text-xl" /> Add New User
        </Button>
      </div>
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
                  className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${
                    user.isBlocked
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {user.isBlocked ? "Blocked" : "Active"}
                </span>
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs font-medium uppercase ${getRoleBadgeColor(
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
                {/* <Button
                  className="text-sm py-1.5 px-1.5"
                  onClick={() => deleteUser(user?._id)}
                >
                  <FaRegTrashCan />
                </Button> */}
                <Button
                  className="text-sm py-1.5 px-1.5"
                  onClick={() => {
                    setUserToDelete(user);
                    setDeleteModalIsOpen(true);
                  }}
                >
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
      <DeleteConfirmationModal
        isOpen={deleteModalIsOpen}
        setIsOpen={setDeleteModalIsOpen}
        onDelete={() => deleteUser(userToDelete._id)}
        userName={userToDelete?.name}
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
