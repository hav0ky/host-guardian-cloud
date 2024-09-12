import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { UserNav } from "./user";

export function SiteHeader() {

    return (
        <header className="top-0 z-50 sticky w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container max-w-screen-2xl px-4 sm:px-14 mx-auto flex h-14 items-center justify-center md:justify-between">
                {/* <div className="block sm:hidden mr-3">
                    <MobileNav />
                </div> */}
                <div className="flex items-center">
                    <Link href="/" className="flex-shrink-0 flex items-center text-xl tracking-wider select-none">
                        <span className="text-primary z-10">cloud</span>
                        .
                        <span className="text-primary/75">cc</span>
                    </Link>
                    {/* <Navbar /> */}
                    {/* <ThemeToggle /> */}
                </div>
                <div className="flex flex-1 items-center space-x-2 justify-end">
                    <ModeToggle />

                    {/* {user ?
                        <UserNav user={user!} />
                        : */}
                    <UserNav />
                    {/* } */}

                </div>
            </div>
        </header>
    )
}