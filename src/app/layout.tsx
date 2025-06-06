import type { Metadata } from "next";
import { Archivo_Black } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import localFont from "next/font/local";

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
});
const ppNeueMontreal = localFont({
  src: [
    {
      path: "../fonts/PPNeueMontreal-Book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/PPNeueMontreal-Medium.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pp-neue-montreal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoirLine",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`overflow-x-hidden ${archivoBlack.variable} ${ppNeueMontreal.variable} antialiased [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']`}
      >
        <header>
          <nav>
            <Navbar />
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
