"use client";

import LoginForm from "@/components/auth/login-form";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";
import * as motion from "framer-motion/client";

export default function LoginPage() {
  return (
    <motion.div
      initial={{ y: -15, opacity: 0 }}
      animate={{ y: 0, opacity: 100 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      className="relative bg-neutral-400/10"
    >
      <LoginForm />
      <Link href="/" className="">
        <X className="w-8 h-8 md:w-10 md:h-10 absolute top-5 md:top-10 right-5 md:right-10 hover:scale-110 hover:bg-accent-foreground/10 transition-all duration-300 rounded-full p-1.5" />
      </Link>
    </motion.div>
  );
}
