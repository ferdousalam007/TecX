import { usePayments } from "@/hooks/payments/usePayments";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";
import { format } from "date-fns";
import { useState } from "react";
import Button from "./Button";

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-700 text-white";
    case "completed":
      return "bg-purple-500 text-white";
    case "failed":
      return "bg-red-500 text-white";
    default:
      return "bg-secondary-grey text-white";
  }
};

const PaymentTable = () => {
  const { payments, error, isLoading } = usePayments();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!payments.length) return <ErrorMessage message={"No Payments Found"} />;

  // Pagination logic
  const indexOfLastPayment = currentPage * itemsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - itemsPerPage;
  const currentPayments = payments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );

  const totalPages = Math.ceil(payments.length / itemsPerPage);

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
              User
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
            >
              Amount
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
            >
              Currency
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
            >
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-primary-background">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {currentPayments.map((payment: any, index: number) => (
            <tr
              key={payment?._id}
              className={`${
                index % 2 === 0 ? "bg-secondary-background bg-opacity-20" : ""
              }`}
            >
              <td className="pl-4">{indexOfFirstPayment + index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {payment?.user?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{payment?.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {payment?.currency}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getStatusBadgeColor(
                    payment?.payment_status
                  )}`}
                >
                  {payment?.payment_status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {format(new Date(payment?.createdAt), "MMMM d, yyyy")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default PaymentTable;
