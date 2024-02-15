"use client"

import ThemeToggle from "./themeToggle";

import Link from "next/link";

import { siteConfig } from "@/config/siteconfig";

import IconList from "./icon-list";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import SiteSheet from "./site-sheet";

export default function SiteHeader(){

    const pathname = usePathname();
    return(
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
            <div className="flex gap-8">
      <Link href="/" className="inline-flex items-center">
        <div className="font-bold text-3xl md:text-4xl lg:text-3xl xl:text-4xl">{siteConfig.title}</div>
      </Link>
      <nav className="hidden items-center space-x-6 text-sm font-medium lg:flex">
        {siteConfig.navLinks?.map(
          (item, index) =>
            item.href && (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname === item.href
                    ? 'text-foreground'
                    : 'text-foreground/60'
                )}
              >
                {item.name}
              </Link>
            )
        )}
      </nav>
    </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden lg:block">
            <IconList />
          </div>
          <ThemeToggle />
          <SiteSheet />
        </div>
      </div>
        </header>
    )
}