import { Sheet, SheetClose, SheetContent, SheetTrigger  } from "./ui/sheet";

import { Icons } from "@/config/icons";

import { siteConfig } from "@/config/siteconfig";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export default function SiteSheet(){

    const pathname = usePathname();

    return (
        <Sheet>
          <SheetTrigger asChild>
            <button className='btn btn-primary'>
            <Icons.hamburger className="h-8 w-8 md:h-10 md:w-10 lg:hidden" />
            </button>
          </SheetTrigger>
    
          <SheetContent>
        <div className="flex h-full w-full flex-col items-center justify-evenly gap-8 duration-700 animate-in slide-in-from-right-full">
          <SheetClose asChild>
            <div className="font-bold text-5xl">
                <Link href="/dash">
                    {siteConfig.title}
                </Link>
            </div>
          </SheetClose>

          <div className="flex flex-col items-center gap-10 md:gap-12">
            {siteConfig.navLinks?.map(
              (item, index) =>
                item.href && (
                  <SheetClose asChild key={index}>
                <Link
                key={index}
                href={item.href}
                className={cn(
                  'text-3xl md:text-5xl',
                  pathname === item.href
                    ? 'text-foreground'
                    : 'text-foreground/40'
                )}
              >
                {item.name}
              </Link>
                  </SheetClose>
                )
            )}
          </div>

            <div className="flex justify-center gap-8 px-c1">
            <Link href={siteConfig.mediaLinks.instagram}>
                    <Icons.instagram className="h-6 w-6 md:h-8 md:w-8" />
                </Link>
                <Link href={siteConfig.mediaLinks.twitter}>
                    <Icons.twitter className="h-6 w-6 md:h-8 md:w-8" />
                </Link>
                <Link href={siteConfig.mediaLinks.linkedin}>
                    <Icons.linkedin className="h-6 w-6 md:h-8 md:w-8" />
                </Link>
            </div>

        </div>
      </SheetContent>
        </Sheet>
    );
};