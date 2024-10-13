import UserTable from "@/components/UserTable";

const ManageUsers = () => {
  return (
    <section className="py-3 lg:py-5">
      <h2 className="text-2xl lg:text-3xl font-semibold text-center text-primary-text mb-5 lg:mb-8">
        Manage Users
      </h2>
      <UserTable />
    </section>
  );
};

export default ManageUsers;
