"use client";

import Link from "next/link";
import { FileCode } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo and Title - Left aligned */}
        <Link href="/" className="flex items-center space-x-2">
          <FileCode className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">XML Editor</span>
        </Link>

        {/* Theme toggle - Right aligned with margin */}
        <div className="mr-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
