"use client";

import Link from "next/link";
import React from "react";
import { Moon, MoonIcon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { logout } from "@/store/slice/authSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/routes";

const Header = () => {
  const { setTheme } = useTheme();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };
  return (
    <div className="shadow-sm w-full sticky top-0 bg-white dark:bg-gray-900 z-[9]">
      <div className="w-full mx-auto max-w-7xl py-2  flex items-center justify-between">
        <div className="flex items-center justify-between flex-1 gap-9 relative">
          <div>
            <Link
              href="/"
              className="font-black text-[20px] text-primary hover:underline"
            >
              Engiunity
            </Link>
          </div>
          <div className="flex gap-4 absolute left-1/2 transform -translate-x-1/2 ">
            {Object.entries(routes.pages.landingPage).map(([key, value]) => (
              <Link key={key} href={value.value} className="text-sm ">
                {value.title}
              </Link>
            ))}
          </div>
          <div className="flex gap-2">
            {!isAuthenticated ? (
              <>
                <Select defaultValue="Vietnamese">
                  <SelectTrigger className="w-[100px] border-none shadow-none">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Language</SelectLabel>
                      <SelectItem value="Vietnamese">
                        <span className="mr-2">🇻🇳</span> VIE
                      </SelectItem>
                      <SelectItem value="English">
                        <span className="mr-2">🇬🇧</span> ENG
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Link href="/log-in">
                  <Button>Bắt đầu</Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <User className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/documents">My Documents</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={handleLogout}
                  >
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
