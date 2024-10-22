// import Image from "next/image";
import React from "react";
import teamImg1 from "../../../assets/team1.jpg";
import teamImg2 from "../../../assets/team2.jpg";
import teamImg3 from "../../../assets/team3.jpg";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <div className="container mx-auto px-5 my-[140px]">
        <main className="container mx-auto px-4 py-5">
          <section className="custom-border-card p-6 rounded-lg shadow-md mb-4 md:mb-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold  mb-4">About Us</h1>
              <p className="text-lg">
                Welcome to Tecx, where technology enthusiasts gather to share
                knowledge, insights, and innovations.
              </p>
            </div>

            {/* Company Overview Section */}
            <section className="mb-16 custom-border-card p-8">
              <h2 className="text-3xl font-semibold  mb-6">Who We Are</h2>
              <p className=" leading-relaxed mb-6">
                At Tecx, we believe in the power of knowledge-sharing. Our
                platform empowers people from all around the globe to discuss
                cutting-edge technology, share their experiences, and learn from
                each other. Our goal is to create a space where tech enthusiasts
                of all levels can connect, collaborate, and grow.
              </p>
              <p className=" leading-relaxed">
                Whether you are a professional developer, a hobbyist, or simply
                passionate about tech, Tecx offers a platform to expand your
                horizons and contribute to the vibrant technology community.
              </p>
            </section>

            {/* Mission Section */}
            <section className="rounded-lg shadow-md p-8 mb-16 custom-border-card">
              <h2 className="text-3xl font-semibold  mb-6">Our Mission</h2>
              <p className=" leading-relaxed mb-6">
                Our mission is to make technology knowledge accessible to
                everyone and foster a collaborative environment for sharing
                insights, tutorials, and tips. We are committed to maintaining a
                platform that promotes learning, innovation, and mutual support
                in the tech world.
              </p>
              <p className=" leading-relaxed">
                We believe that by sharing knowledge, we can empower others to
                create meaningful solutions and contribute to technological
                advancements that benefit society.
              </p>
            </section>

            {/* Team Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-semibold  mb-6">Meet the Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Team Member 1 */}
                <div className="custom-border-card rounded-lg shadow-md p-6 text-center">
                  <Image
                    src={teamImg1}
                    alt="Team member 1"
                    className=" mx-auto mb-4"
                    width={500}
                    height={400}
                  />
                  <h3 className="text-xl font-semibold">Jane Doe</h3>
                  <p className="">Founder & CEO</p>
                </div>
                {/* Team Member 2 */}
                <div className="custom-border-card rounded-lg shadow-md p-6 text-center">
                  <Image
                    src={teamImg3}
                    alt="Team member 1"
                    className=" mx-auto mb-4"
                    width={500}
                    height={400}
                  />
                  <h3 className="text-xl font-semibold ">John Smith</h3>
                  <p className="">Chief Technology Officer</p>
                </div>
                {/* Team Member 3 */}
                <div className="custom-border-card rounded-lg shadow-md p-6 text-center">
                  <Image
                    src={teamImg2}
                    alt="Team member 1"
                    className=" mx-auto mb-4"
                    width={500}
                    height={400}
                  />
                  <h3 className="text-xl font-semibold ">
                    Alice Johnson
                  </h3>
                  <p className="text-white">Head of Community</p>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section className="rounded-lg shadow-md p-8 custom-border-card">
              <h2 className="text-3xl font-semibold  mb-6">Contact Us</h2>
              <p className=" leading-relaxed mb-6">
                We’d love to hear from you! Whether you have a question,
                feedback, or just want to say hello, feel free to reach out to
                us at{" "}
                <a
                  href="mailto:contact@tecx.com"
                  className="text-blue-500 underline"
                >
                  contact@tecx.com
                </a>
                .
              </p>
              <p className=" leading-relaxed">
                Follow us on social media for the latest updates and join the
                conversation with fellow tech enthusiasts.
              </p>
            </section>
          </section>
        </main>
      </div>
    </div>
  );
};

export default page;
