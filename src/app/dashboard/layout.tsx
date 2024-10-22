"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaAmazonPay,
  FaUser,
} from "react-icons/fa";
import { BsSpeedometer } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { useLogout } from "../../hooks/auth/useLogout";
import { usePathname } from "next/navigation";
import { LuActivitySquare } from "react-icons/lu";
import { CiFileOn } from "react-icons/ci";
import { useMe } from "@/hooks/auth/useMe";
import { MdOutlinePayment } from "react-icons/md";
import Image from "next/image";
import ProfileModal from "@/components/ProfileInfo";
import { MdEditNote } from "react-icons/md";

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { isPending, logout } = useLogout();
  const pathname = usePathname();
  const { user } = useMe();
  const handleResize = useCallback(() => {
    const isMobileWidth = window.innerWidth < 1024;
    setIsMobile(isMobileWidth);
    if (isMobileWidth) {
      setIsSidebarOpen(false);
      setIsDesktopSidebarOpen(false);
    } else {
      setIsSidebarOpen(false);
      setIsDesktopSidebarOpen(true);
    }
  }, []);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen((prev) => !prev);
    } else {
      setIsDesktopSidebarOpen((prev) => !prev);
    }
  };
  const openModal = () => setModalIsOpen(true);
  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "-100%", opacity: 0 },
  };

  const NavItem: React.FC<NavItemProps & { end?: boolean }> = ({
    href,
    icon: Icon,
    children,
  }) => (
    <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        href={href}
        className={`flex items-center p-3 rounded-lg transition-colors font-medium ${
          pathname === href
            ? "bg-purple-500 text-white"
            : "text-gray-400 hover:bg-gray-700 hover:text-white"
        }`}
      >
        <Icon className="mr-3" />
        {children}
      </Link>
    </motion.li>
  );

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || isDesktopSidebarOpen) && (
          <motion.aside
            className="absolute lg:static w-64 h-[calc(100vh-80px)] mt-[110px] bg-gray-800 shadow-lg overflow-auto rounded-lg z-10"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-6 flex flex-col ">
              <div className="mb-2 relative  flex items-center flex-col gap-4 p-4  bg-green-900 bg-opacity-25  backdrop-blur-md rounded-[10px]  shadow-md">
                <Image
                  src={user?.profilePic}
                  alt="User Photo"
                  width={48}
                  height={48}
                  className="rounded-full "
                />
                <div>
                  <h2 className="text-lg font-medium">
                    <h2 className="text-lg font-medium">
                      {user?.name?.length > 20
                        ? `${user?.name?.slice(0, 20)}...`
                        : user?.name?.charAt(0).toUpperCase() +
                          user?.name?.slice(1)}
                    </h2>
                  </h2>
                </div>
                <div className="text-xl flex justify-end items-center absolute right-1">
                  {/* Button to open modal */}
                  <button
                    className=" border-green-100 border rounded-lg p-2  text-green-600"
                    onClick={openModal}
                  >
                    <MdEditNote />
                  </button>
                </div>
              </div>
              <nav className="flex-grow">
                <motion.ul
                  className="space-y-3"
                  initial="closed"
                  animate="open"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
                    },
                    closed: {
                      transition: {
                        staggerChildren: 0.05,
                        staggerDirection: -1,
                      },
                    },
                  }}
                >
                  {user?.role === "admin" ? (
                    <>
                      <NavItem href="/dashboard/admin" icon={BsSpeedometer} end>
                        Dashboard
                      </NavItem>
                      <NavItem
                        href="/dashboard/admin/manage-categories"
                        icon={FaBars}
                      >
                        Create Categories
                      </NavItem>
                      <NavItem
                        href="/dashboard/admin/manage-posts"
                        icon={CiFileOn}
                      >
                        Manage Posts
                      </NavItem>
                      <NavItem
                        href="/dashboard/admin/manage-users"
                        icon={FaUser}
                      >
                        Manage Users
                      </NavItem>
                      <NavItem
                        href="/dashboard/admin/payments"
                        icon={FaAmazonPay}
                      >
                        Payments
                      </NavItem>
                      <NavItem
                        href="/dashboard/admin/activity-logs"
                        icon={LuActivitySquare}
                      >
                        Activity Logs
                      </NavItem>
                    </>
                  ) : (
                    <>
                      <NavItem href="/dashboard/user" icon={BsSpeedometer} end>
                        Profile
                      </NavItem>
                      <NavItem href="/dashboard/user/my-posts" icon={CiFileOn}>
                        My Posts
                      </NavItem>
                      <NavItem
                        href="/dashboard/user/payment"
                        icon={MdOutlinePayment}
                      >
                        Make Payment
                      </NavItem>
                    </>
                  )}
                </motion.ul>
              </nav>

              {/* Logout Button */}
              <motion.div
                className="mt-auto border-t border-gray-700 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  className="flex items-center w-full p-3 rounded-lg bg-gray-700 text-gray-400 hover:bg-purple-600 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isPending}
                  onClick={() => logout()}
                >
                  <FaSignOutAlt className="mr-3" />
                  Sign Out
                </motion.button>
              </motion.div>

              {/* Extra Sidebar Toggle Button */}
              <motion.button
                className="w-full mt-4 p-3 rounded-lg bg-purple-600 text-white shadow-lg flex justify-center"
                onClick={toggleSidebar}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSidebarOpen || isDesktopSidebarOpen
                  ? "Close Sidebar"
                  : "Open Sidebar"}
              </motion.button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto mt-[150px]">
        <motion.div
          className="max-w-7xl mx-auto py-5 px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            className="absolute top-0 left-[255px] md:left-0 z-20 p-2 bg-purple-600 text-white rounded shadow-lg w-[40px] h-[40px]"
            onClick={toggleSidebar}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isSidebarOpen || isDesktopSidebarOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
          {children}
        </motion.div>
      </main>
      <ProfileModal
        user={user}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </div>
  );
}
