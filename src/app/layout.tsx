
 import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "@/utils/Provider";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tech X",
  description:
    "Tech X is a platform for sharing knowledge and resources related to technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="min-h-screen flex flex-col justify-between">
          <Provider>
            <Suspense fallback={<Spinner />}>{children}</Suspense>
          </Provider>
        </main>
      </body>
    </html>
  );
}
