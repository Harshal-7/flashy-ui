"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import * as motion from "framer-motion/client";

export default function HeroSection() {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 100 }}
      transition={{ ease: "easeOut", duration: 1.3 }}
      className="flex flex-col lg:flex-row w-full justify-center items-center gap-10 mt-6 md:mt-20"
    >
      {/* Left Side  */}
      <div className="lg:w-1/2 flex flex-col px-2 py-6 md:p-6">
        {/* Title  */}
        <div className="text-5xl md:text-6xl xl:text-7xl font-extrabold text-neutral-700 px-6 py-2 md:p-4 text-center md:text-start">
          Boost Your <span className="text-primary">Learning</span> Using Our
          Flashcards
        </div>

        {/* Description  */}
        <div className="text-sm md:text-xl tracking-wide antialiased text-neutral-700 px-6 py-2 md:p-4 text-center md:text-start">
          Create, study, and master any subject with flashcards. Powered by AI,
          personalized for your learning style.
        </div>

        {/* Buttons get-started, see pricing  */}
        <div className="flex w-full justify-center md:justify-start items-center gap-4 md:gap-4 p-2 md:p-4">
          <Link href="/create-card" className="p-0 m-0">
            <Button
              variant="default"
              className="px-5 md:px-8 py-5 md:py-6 rounded-3xl"
            >
              Get Started
            </Button>
          </Link>
          <Button
            variant="outline"
            className="px-5 md:px-8 py-5 md:py-6 rounded-3xl "
            // bg-neutral-700 text-white
          >
            See Pricing
          </Button>
        </div>
      </div>

      {/* Right Side  */}
      <div className="lg:w-1/2 flex items-start">
        <Image
          src="/hero2.svg"
          alt="hero-icon"
          width={80}
          height={80}
          priority
          className="w-full px-20"
        />
      </div>
    </motion.div>
  );
}
