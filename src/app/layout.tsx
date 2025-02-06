// Add the "use client" directive to mark this file as a client component
"use client";

// Import necessary libraries
import { useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Importing Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // Check if the user has previously set a theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.classList.add(savedTheme);
    } else {
      // If no theme preference is saved, default to light mode
      document.documentElement.classList.add("light");
    }
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
