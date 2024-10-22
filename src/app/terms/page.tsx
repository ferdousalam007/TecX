import React from "react";

const page = () => {
  return (
    <div className="px-5 my-[140px]">
      <section className="container max-w-6xl px-5 mx-auto py-8 lg:py-10 custom-border-card rounded-lg shadow-md my-4 md:my-12">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

        <p className="mb-4">
          Welcome to Tecx! By accessing and using our platform, you agree to
          comply with the following terms and conditions. Please read them
          carefully. If you do not agree with these terms, you are prohibited
          from using or accessing this site.
        </p>

        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By using Tecx, you agree to be bound by these Terms and Conditions as
          well as our Privacy Policy. If you do not agree, you must stop using
          the platform immediately.
        </p>

        <h2 className="text-2xl font-semibold mb-4">2. Use of the Platform</h2>
        <p className="mb-4">
          You agree to use Tecx only for lawful purposes and in accordance with
          these Terms. You agree not to use the platform:
        </p>
        <ul className="list-disc ml-8 mb-4">
          <li>For any unlawful or fraudulent purposes.</li>
          <li>To harm or attempt to harm others in any way.</li>
          <li>
            To upload or transmit viruses, malware, or any other harmful
            material.
          </li>
          <li>
            To infringe on the rights of others, including intellectual property
            rights.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">
          3. User-Generated Content
        </h2>
        <p className="mb-4">
          You are responsible for any content you post on Tecx, including its
          legality, reliability, and appropriateness. By posting content, you
          grant Tecx a non-exclusive, royalty-free, perpetual, and irrevocable
          license to use, reproduce, modify, and distribute such content.
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          4. Intellectual Property
        </h2>
        <p className="mb-4">
          All content on Tecx, including text, graphics, logos, and software, is
          the property of Tecx or its content suppliers and is protected by
          intellectual property laws. You may not reproduce, distribute, or
          create derivative works without our permission.
        </p>

        <h2 className="text-2xl font-semibold mb-4">5. Termination</h2>
        <p className="mb-4">
          We reserve the right to suspend or terminate your access to Tecx at
          any time, without notice, for conduct that we believe violates these
          Terms or is harmful to other users or the platform.
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          6. Limitation of Liability
        </h2>
        <p className="mb-4">
          Tecx will not be liable for any damages, including but not limited to,
          direct, indirect, incidental, or consequential damages, arising from
          your use of the platform or inability to use the platform.
        </p>

        <h2 className="text-2xl font-semibold mb-4">7. Governing Law</h2>
        <p className="mb-4">
          These Terms and Conditions are governed by and construed in accordance
          with the laws of the jurisdiction in which Tecx operates. You agree to
          submit to the exclusive jurisdiction of the courts located within our
          jurisdiction.
        </p>

        <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
        <p className="mb-4">
          Tecx reserves the right to modify these Terms and Conditions at any
          time. Changes will be posted on this page, and your continued use of
          the platform signifies your acceptance of any such changes.
        </p>

        <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms and Conditions, please
          contact us at{" "}
          <a href="mailto:support@tecx.com" className="text-blue-500 underline">
            support@tecx.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default page;
