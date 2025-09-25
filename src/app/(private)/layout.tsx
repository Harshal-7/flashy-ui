import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={cn("antialiased")}>
      <Header />
      <Sidebar />
      {children}
    </div>
  );
}
