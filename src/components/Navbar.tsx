"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useMe } from "@/hooks/auth/useMe";
import { useLogout } from "@/hooks/auth/useLogout";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { IoIosMenu } from "react-icons/io";
import Image from "next/image";
import logoImg from "../../assets/tecx.png"; 
import PublishPost from "./PublishPost";


const Navbar = () => {
  const { user } = useMe();
  const { logout } = useLogout();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="w-full  top-0 left-0 right-0 fixed z-50">
      <nav className="custom-border bg-[#1C1F26] shadow-sm py-4 ">
        <div className="container mx-auto px-5">
          <div className="flex justify-between items-center">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-[130px]">
                  <Link
                    className="text-3xl font-bold text-primary-blue"
                    href="/"
                  >
                    <Image src={logoImg} alt="logo" className="w-full h-100" />
                  </Link>
                </div>
                {/* <Link className="text-3xl font-bold text-primary-blue" href="/">
                TechX
              </Link> */}
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2 md:gap-3">
              {user && <PublishPost />}
              <Link
                href="/about"
                className="block w-full  text-left px-3 py-1 bg-[#272B34] text[#a8b3cf] rounded-md border border-[#272B34]
                    hover:bg-[#432256] hover:text-[#fff] hover:border-[#272B34] transition ease-in-out duration-300
                   "
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block w-full  text-left px-3 py-1 bg-[#272B34] text[#a8b3cf] rounded-md border border-[#272B34]
                    hover:bg-[#432256] hover:text-[#fff] hover:border-[#272B34] transition ease-in-out duration-300
                   "
              >
                Contact
              </Link>
              {user ? (
                <>
                  <Link
                    href={
                      user?.role === "admin"
                        ? "/dashboard/admin"
                        : "/dashboard/user"
                    }
                    className="block w-full  text-left px-3 py-1 bg-[#272B34] text[#a8b3cf] rounded-md border border-[#272B34]
                    hover:bg-[#432256] hover:text-[#fff] hover:border-[#272B34] transition ease-in-out duration-300
                   "
                  >
                    {user?.role === "admin" ? "Dashboard" : "User Dashboard"}
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="block w-full  text-left px-3 py-1 bg-[#272B34] text[#a8b3cf] rounded-md border border-[#272B34]
                    hover:bg-[#432256] hover:text-[#fff] hover:border-[#272B34] transition ease-in-out duration-300
                   "
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/sign-in"
                  className=" block w-full  text-left px-3 py-1 bg-[#272B34] text[#a8b3cf] rounded-md border border-[#272B34]
                    hover:bg-[#432256] hover:text-[#fff] hover:border-[#272B34] transition ease-in-out duration-300
                   
                  "
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <motion.button
              className="md:hidden text-3xl text-[#9732B5] focus:outline-none"
              onClick={toggleMobileMenu}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <RxCross2 /> : <IoIosMenu />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden  px-5 py-4 space-y-4 absolute top-20 left-0 right-0  z-[9999] bg-[#1C1F26] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[4px] rounded-[10px]  border-opacity-18"
            >
              <Link
                href="/about"
                className="block w-full  text-left px-3 py-1 bg-[#272B34] text[#a8b3cf] rounded-md border border-[#272B34]
                    hover:bg-[#432256] hover:text-[#fff] hover:border-[#272B34] transition ease-in-out duration-300
                   "
                onClick={toggleMobileMenu}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block w-full  text-left px-3 py-1 bg-[#272B34] text[#a8b3cf] rounded-md border border-[#272B34]
                    hover:bg-[#432256] hover:text-[#fff] hover:border-[#272B34] transition ease-in-out duration-300
                   "
                onClick={toggleMobileMenu}
              >
                Contact
              </Link>

              {user ? (
                <>
                  <Link
                    href={
                      user?.role === "admin"
                        ? "/dashboard/admin"
                        : "/dashboard/user"
                    }
                    className="block w-full  text-left px-3 py-1 bg-[#272B34] text[#a8b3cf] rounded-md border border-[#272B34]
                    hover:bg-[#432256] hover:text-[#fff] hover:border-[#272B34] transition ease-in-out duration-300
                   "
                    onClick={toggleMobileMenu}
                  >
                    {user?.role === "admin" ? "Dashboard" : "User Dashboard"}
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      toggleMobileMenu();
                    }}
                    className="w-full text-left px-3 py-1 bg-[#272B34] text[#a8b3cf] rounded-md border border-[#272B34]
                    hover:bg-[#432256] hover:text-[#272B34] hover:border-[#272B34] transition ease-in-out duration-300
                    "
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/sign-in"
                  className="block w-full  text-left px-3 py-1 bg-[#272B34] text[#a8b3cf] rounded-md border border-[#272B34]
                    hover:bg-[#432256] hover:text-[#fff] hover:border-[#272B34] transition ease-in-out duration-300
                    "
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;
