"use client";
import { useUsers } from "@/hooks/users/useUsers";
import ErrorMessage from "../../../../components/ErrorMessage";
import Spinner from "../../../../components/Spinner";
import { format } from "date-fns";

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-primary-blue text-white";
    case "user":
      return "bg-primary-green text-white";
    default:
      return "bg-secondary-red text-white";
  }
};

const PaymentTable = () => {
  const { users, error, isLoading } = useUsers();
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!users.length) return <ErrorMessage message={"No Users Found"} />;
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
            {users.map((user: any, index: number) => (
              <tr
                key={user._id}
                className={`${
                  index % 2 === 0 ? "bg-secondary-background bg-opacity-20" : ""
                }`}
              >
                <td className="pl-4">{index + 1}</td>
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
                <td className="px-6 py-4 whitespace-nowrap">
                  {format(new Date(user.loggedInAt), "MMMM d, yyyy hh:mm a")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PaymentTable;
