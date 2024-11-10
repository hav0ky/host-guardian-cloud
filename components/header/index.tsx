import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import { UserNav } from './user';
import { Headphones, ShoppingCart, HelpCircle } from 'lucide-react';

export function SiteHeader() {
  return (
    <header className="top-0 z-50 sticky w-full bg-background dark:bg-background-dark/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:supports-[backdrop-filter]:bg-background-dark/60">
      <div className="container max-w-screen-2xl px-4 sm:px-14 mx-auto flex h-14 items-center justify-center md:justify-between">
        {/* <div className="block sm:hidden mr-3">
                    <MobileNav />
                </div> */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex-shrink-0 flex items-center text-xl tracking-wider select-none"
          >
            <span className="text-primary dark:text-primary-dark z-10">Home</span>
          </Link>

          {/* Navigation Links */}
          <nav className="ml-6 hidden md:flex space-x-6">
            {/* Support Dropdown */}
            <div className="relative group">
              <span className="cursor-pointer hover:text-primary dark:hover:text-primary-dark">
                Support
              </span>
              <div className="absolute left-0 top-full mt-0 hidden group-hover:block hover:block w-56 bg-white dark:bg-black shadow-md border border-gray-200 dark:border-gray-700 rounded-md z-50">
                <ul className="py-2">
                  <li>
                    <Link
                      href="/supports"
                      className="flex items-center px-4 py-2 whitespace-nowrap hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <Headphones className="mr-2 text-primary dark:text-primary-dark w-5 h-5" />
                      <span className="text-black dark:text-white">Get 24/7 Support</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/support/sales"
                      className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <ShoppingCart className="mr-2 text-primary dark:text-primary-dark w-5 h-5" />
                      <span className="text-black dark:text-white">Sales</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/support/faq"
                      className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <HelpCircle className="mr-2 text-primary dark:text-primary-dark w-5 h-5" />
                      <span className="text-black dark:text-white">FAQ</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        {/* Right side: ModeToggle and UserNav */}
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
