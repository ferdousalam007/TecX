"use client";
import { useUsers } from "@/hooks/users/useUsers";
import ErrorMessage from "../../../../components/ErrorMessage";
import Spinner from "../../../../components/Spinner";
import { format } from "date-fns";
import { useState } from "react";
import Button from "../../../../components/Button";

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-purple-500 text-white";
    case "user":
      return "bg-yellow-700 text-white";
    default:
      return "bg-secondary-red text-white";
  }
};

const PaymentTable = () => {
  const { users, error, isLoading } = useUsers();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

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
    <section>
      <h2 className="text-2xl lg:text-3xl font-semibold text-center text-primary-text mb-5 lg:mb-8">
        Activity Logs
      </h2>
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
                Logged in at
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
                <td className="px-6 py-4 whitespace-nowrap">{user?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user?.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getRoleBadgeColor(
                      user?.role
                    )}`}
                  >
                    {user?.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {format(new Date(user?.loggedInAt), "MMMM d, yyyy hh:mm a")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
    </section>
  );
};

export default PaymentTable;
