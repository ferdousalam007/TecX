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
  const [isMobile, setIsMobile] = useState(false);
  const { isPending, logout } = useLogout();
  const pathname = usePathname();
  const { user } = useMe();
  const handleResize = useCallback(() => {
    const isMobileWidth = window.innerWidth < 1024;
    setIsMobile(isMobileWidth);
    if (!isMobileWidth) {
      setIsSidebarOpen(true);
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

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

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
            ? "bg-secondary-background text-primary-blue"
            : "text-secondary-text hover:bg-secondary-background hover:text-primary-blue"
        }`}
      >
        <Icon className="mr-3" />
        {children}
      </Link>
    </motion.li>
  );

  return (
    <div className="flex min-h-screen bg-primary-background">
      {" "}
      {/* Mobile Sidebar Toggle */}
      <motion.button
        className="lg:hidden fixed top-2/4 right-4 z-20 p-2 bg-primary-blue text-white rounded-full shadow-lg"
        onClick={toggleSidebar}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </motion.button>
      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || !isMobile) && (
          <motion.aside
            className="absolute lg:static w-64 h-[calc(100vh-80px)] bg-primary-background shadow-lg overflow-auto rounded-lg z-50"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-6 h-full flex flex-col">
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
                      {" "}
                      <NavItem href="/dashboard/admin" icon={BsSpeedometer} end>
                        Dashboard
                      </NavItem>
                      <NavItem
                        href="/dashboard/admin/manage-categories"
                        icon={FaBars}
                        // icon={CiFileOn}
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
              <motion.div
                className="mt-auto border-t border-secondary-background pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  className="flex items-center w-full p-3 rounded-lg bg-secondary-background text-secondary-text hover:bg-primary-blue hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isPending}
                  onClick={() => logout()}
                >
                  <FaSignOutAlt className="mr-3" />
                  Sign Out
                </motion.button>
              </motion.div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <motion.div
          className="max-w-7xl mx-auto py-5 px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
