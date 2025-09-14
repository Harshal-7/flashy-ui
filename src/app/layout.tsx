"use client";

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import useUserStore from "@/lib/store";
import { useEffect } from "react";
import authenticated from "@/actions/authenticated";
import getCurrentUser from "@/actions/user";

// export const metadata: Metadata = {
//   title: "Flashy",
//   description:
//     "Flashy is an AI featured flashcard generator application where users can create, manage flashcards and learn efficiently with the help of flashcards that uses ai",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setUser, clearUser, setIsAuthenticated, refreshTrigger } =
    useUserStore();

  useEffect(() => {
    const fetchAuthState = async () => {
      try {
        const isAuth = await authenticated();

        if (isAuth) {
          setIsAuthenticated(true);
          const user = await getCurrentUser();
          if (user) {
            setUser(user);
          } else {
            clearUser();
          }
        } else {
          clearUser();
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        clearUser();
      }
    };

    fetchAuthState();
  }, [refreshTrigger]); // Watch for refresh triggers

  return (
    <html lang="en">
      <body className={cn("antialiased")}>
        <Header />
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
