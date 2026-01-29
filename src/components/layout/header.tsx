"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageToggle } from "./language-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="md:hidden">
            <SidebarTrigger />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <LanguageToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
