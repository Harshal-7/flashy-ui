import HeroSection from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto justify-center items-center gap-5 ">
      {/* Hero Section  */}
      <HeroSection />

      {/* blur-drop in homepage bg  */}
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-auto right-auto -left-10 md:-left-10 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-40 md:opacity-50 blur-[100px]"></div>
      </div>

      <div className="h-screen w-full"></div>
      
    </div>
  );
}
