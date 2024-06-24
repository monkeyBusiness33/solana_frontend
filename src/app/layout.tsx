import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomLayout from "../components/Layout/CustomLayout";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Snipping Tools",
  description: "Snipping Tools Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
    <html lang="en">
      <body className={inter.className}>
        <CustomLayout>
          {children}
        </CustomLayout>
      </body>
    </html>
    </StoreProvider>
  );
}
