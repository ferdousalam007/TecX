/* eslint-disable react/no-unescaped-entities */
import React from "react";

const page = () => {
  return (
    <div className="px-4 my-[140px]">
      <section className="container max-w-6xl px-5 mx-auto py-8 lg:py-10 custom-border-card rounded-lg shadow-md my-4 md:my-12">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-4">
          Welcome to Tecx! This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you visit our platform.
          Please read this policy carefully. If you do not agree with the terms
          of this Privacy Policy, please do not access the site.
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          1. Information We Collect
        </h2>
        <p className="mb-4">
          We may collect information about you in a variety of ways. The
          information we may collect on the Site includes:
        </p>
        <ul className="list-disc ml-8 mb-4">
          <li>Personal Data: Name, email address, profile information, etc.</li>
          <li>
            Derivative Data: Information our servers automatically collect when
            you access the site, such as your IP address, browser type, and
            browsing behavior.
          </li>
          <li>
            Cookies: We may use cookies and similar tracking technologies to
            monitor user interactions.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Data</h2>
        <p className="mb-4">
          We use the information we collect in the following ways:
        </p>
        <ul className="list-disc ml-8 mb-4">
          <li>To personalize your experience on Tecx.</li>
          <li>To improve our platform's functionality and user experience.</li>
          <li>
            To send you updates, notifications, and respond to your queries.
          </li>
          <li>To prevent fraudulent activities and ensure compliance.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">
          3. Disclosure of Your Data
        </h2>
        <p className="mb-4">
          We do not sell, trade, or rent your personal information to others. We
          may share your data with trusted third-party service providers who
          assist us in operating our platform, as long as they agree to keep
          this information confidential.
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          4. Security of Your Data
        </h2>
        <p className="mb-4">
          We use administrative, technical, and physical security measures to
          protect your personal information. However, no transmission over the
          Internet is guaranteed to be 100% secure.
        </p>

        <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
        <p className="mb-4">
          You have the right to access, correct, or delete your personal data at
          any time. Please contact us if you need assistance with this.
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          6. Changes to This Policy
        </h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page, and you are advised to review it regularly.
        </p>

        <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us
         
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
