"use client";

import React from "react";
import { FaMapMarked } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
const page = () => {
 
  return (
    <>
      <section className="container px-5   gap-8 items-center  py-8 lg:py-10 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 px-4  py-14 space-y-10 lg:space-y-0 custom-border-card">
          <div>
            <div className="">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14709.910925608301!2d89.54032675!3d22.821808299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1722003557283!5m2!1sen!2sbd"
                width="100%"
                height="500"
                style={{ border: 0 }}
                // allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            </div>
          </div>
          <div
            className="shadow-custom rounded bg-slate-800"
            // style={{ backgroundImage: `url(${faqImg})` }}
          >
            <div className="rounded ">
              <div className="bg-slate-900 text-center py-5 rounded-t-lg">
                <h2 className="text-3xl font-semibold text-white">
                  Contact Info
                </h2>
              </div>
              <div>
                <div>
                  <div className="flex items-center gap-5 space-x-5 justify-center border-b py-5">
                    <FaMapMarked color="#ff8851" />
                    <div>
                      <p className="text-xl font-bold text-white">
                        Our Location
                      </p>
                      <small className="text-base text-white">
                        456, Lorem Street,
                        <br /> New York, 33454, NY
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {" "}
                <div>
                  <div className="flex items-center gap-5 space-x-5 justify-center border-b py-5">
                    <FaPhone color="#ff8851" />
                    <div>
                      <p className="text-xl font-bold text-white">
                        Phone Number
                      </p>
                      <small className="text-base text-white">
                        +1 888-654-4329
                        <br /> +1 888-543-8765
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div className="flex items-center gap-5 space-x-5 justify-center border-b py-5">
                    <MdEmail color="#ff8851"/>
                    <div>
                      <p className="text-xl font-bold text-white">
                        Email Address
                      </p>
                      <small className="text-base text-white">
                        contact@example.com
                        <br /> admin@example.com
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {" "}
                <div>
                  <div className="flex items-center gap-5 space-x-5 justify-center py-5 ">
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ff8851"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-twitter"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ff8851"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-facebook"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ff8851"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-linkedin"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
