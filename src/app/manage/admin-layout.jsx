"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FilePlus,
  LayoutDashboard,
  Menu,
  LogOut,
  User,
  Contact,
  Newspaper,
  User2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const navItems = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/manage",
        icon: <LayoutDashboard className="w-5 h-5" />,
      },
    ],
  },
  {
    title: "Blog",
    items: [
      {
        title: "All Articles",
        href: "/manage/article",
        icon: <FilePlus className="w-5 h-5" />,
      },
      {
        title: "Add Article",
        href: "/manage/article/add",
        icon: <FilePlus className="w-5 h-5" />,
      },
    ],
  },
  {
    title: "Category",
    items: [
      {
        title: "Manage Categories",
        href: "/manage/category",
        icon: <FilePlus className="w-5 h-5" />,
      },
    ],
  },
  {
    title: "Newsletter",
    items: [
      {
        title: "Manage Newsletter",
        href: "/manage/newsletter",
        icon: <Newspaper className="w-5 h-5" />,
      },
    ],
  },
  {
    title: "Contact Messages",
    items: [
      {
        title: "Contact Messages",
        href: "/manage/contact",
        icon: <Contact className="w-5 h-5" />,
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "Users",
        href: "/manage/user",
        icon: <User className="w-5 h-5" />,
      },
    ],
  },
];

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogOut = () => {
    Cookies.remove("authToken");
    Cookies.remove("userId");
    router.push("/login");
  };

  React.useEffect(() => {
    setTimeout(() => {
      document.documentElement.style.overflow = "hidden";
    }, 100);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="hidden lg:flex w-64 flex-col bg-white shadow-md">
        <div className="flex items-center h-14 px-6 border-b">
          <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
        </div>
        <ScrollArea className="flex-1">
          <nav className="p-4 space-y-6">
            {navItems.map((section, i) => (
              <div key={i} className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500 px-2">
                  {section.title}
                </h3>
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-primary/20 ${
                      pathname === item.href
                        ? "bg-primary text-white hover:!bg-primary/80"
                        : "text-gray-700"
                    }`}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </ScrollArea>
      </aside>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-64 p-0 bg-white">
          <div className="flex items-center h-14 px-6 border-b">
            <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
          </div>
          <ScrollArea className="h-[calc(100vh-3.5rem)]">
            <nav className="p-4 space-y-6">
              {navItems.map((section, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500 px-2">
                    {section.title}
                  </h3>
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-100 ${
                        pathname === item.href
                          ? "bg-primary text-primary-foreground"
                          : "text-gray-700"
                      }`}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex h-14 items-center gap-4 border-b bg-white px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
          <div className="flex-1" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8 bg-primary flex items-center juenstify-center">
                  {/* <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  /> */}
                  <User2 className="h-8 w-8 text-white" />
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-auto bg-white">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogOut}
                className="bg-red-500 rounded-lg text-white hover:bg-red-600 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 overflow-auto bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  );
}
