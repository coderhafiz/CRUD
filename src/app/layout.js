import Navbar from "./../components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CGmark Topics",
  description: "to list cg mark's topics",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-100">
        <div className="max-w-5xl mx-auto p-4 bg-white">
          <Navbar />
          <div className="mt-8">
            <SessionProvider>{children}</SessionProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
