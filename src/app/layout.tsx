"use client";

import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Nav from "./_components/Nav";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// export const metadata = {
//   title: "Create T3 App",
//   description: "Generated by create-t3-app",
//   icons: [{ rel: "icon", url: "/favicon.ico" }],
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex w-full items-center justify-center font-sans ${inter.variable}`}
      >
        <SessionProvider>
          <TRPCReactProvider>
            <div className="flex w-full items-center justify-center">
              {children}
            </div>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
