"use client";

import { cn } from "@/lib/utils";
import {
  BarChart2,
  Book,
  Bot,
  Folder,
  Home,
  Settings,
  Star,
  User,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import MyLoginBtn from "./ui/myBtn";
import { Fragment, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "./ui/separator";
import { useScrollPosition } from "@/hooks/use-scroll";
import useUserStore from "@/lib/store";
import logout from "@/actions/logout";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const font = Poppins({ subsets: ["latin"], weight: ["300", "400", "600"] });

export const Sidebar = () => {
  const path = usePathname();
  const router = useRouter();
  const isScrolled = useScrollPosition();
  const scrollClass = isScrolled ? "shadow bg-background" : "shadow-none";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [myOpacity, setMyOpacity] = useState(false);
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const { setIsAuthenticated } = useUserStore();

  const sidebarItems = [
    // Section 1: Core
    { label: "Home", icon: Home, href: "/home" },
    { label: "Library", icon: Folder, href: "/library" },
    { label: "Favorites", icon: Star, href: "/bookmarks", dividerAfter: true },

    // Section 2: Flashcards
    { label: "Flashcards", icon: Zap, href: "/flashcards" },
    { label: "SmartCards", icon: Bot, href: "/smartcards" },
    { label: "Collaboration", icon: Users, href: "/colab", dividerAfter: true },

    // Section 3: Practice / Analytics
    { label: "Tests", icon: Book, href: "/tests" },
    { label: "Stats", icon: BarChart2, href: "/stats", dividerAfter: true },

    // Section 4: Account
    { label: "Profile", icon: User, href: "/profile" },
    { label: "Settings", icon: Settings, href: "/settings" },
  ];

  const handleHamburgerMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setTimeout(() => {
      setMyOpacity((prev) => !prev);
    }, 300);
  };

  if (path === "/login") {
    return <Fragment></Fragment>;
  }

  if (path === "/register") {
    return <Fragment></Fragment>;
  }

  const handleLogout = async () => {
    clearUser();
    setIsAuthenticated(false);
    toast("Logged out successfully");
    await logout();
  };

  return (
    <div
      className={cn(
        "fixed w-52 h-[calc(100vh-80px)] left-0 top-20 z-40 overflow-auto py-2 px-3"
      )}
    >
      <div className="flex flex-col gap-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = path === item.href;
          return (
            <Fragment key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex gap-4 w-full items-center px-3 py-2 rounded-lg hover:bg-zinc-100",
                  isActive && "bg-primary/10 font-semibold text-primary hover:bg-primary/10"
                )}
              >
                <Icon className="size-5" />
                <span>{item.label}</span>
              </Link>
              {item.dividerAfter && <hr className="my-2 border-gray-200" />}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
