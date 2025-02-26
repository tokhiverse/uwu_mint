import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


import { Dela_Gothic_One } from "next/font/google";

const delaGothic = Dela_Gothic_One({
  variable: "--font-dela-gothic",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "UwUtter Minter",
  description: "NFT PFP collection built to inspire joy and creativity on the Abstract Chain where playful otters meet digital art",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${delaGothic.variable} antialiased`}
      >
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
