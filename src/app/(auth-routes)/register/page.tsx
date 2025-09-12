"use client";

import React from "react";
import RegisterForm from "@/components/auth/register-form";
import * as motion from "framer-motion/client";
import Link from "next/link";
import { X } from "lucide-react";

function RegisterPage() {
  return (
    <motion.div
      initial={{ y: -15, opacity: 0 }}
      animate={{ y: 0, opacity: 100 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      className="relative bg-neutral-400/10"
    >
      <RegisterForm />
      <Link href="/" className="">
        <X className="w-8 h-8 md:w-10 md:h-10 absolute top-5 md:top-10 right-5 md:right-10 hover:scale-110 hover:bg-accent-foreground/10 transition-all duration-300 rounded-full p-1.5" />
      </Link>
    </motion.div>
  );
}

export default RegisterPage;
