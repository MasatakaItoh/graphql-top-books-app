import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { ApolloClientProvider } from "@/app/providers";
import { PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Top Books",
  description: "Top Books of All Time",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={"bg-slate-700"}>
      <body className={inter.className}>
        <ApolloClientProvider>{children}</ApolloClientProvider>
      </body>
    </html>
  );
}
