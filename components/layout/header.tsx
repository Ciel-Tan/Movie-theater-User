'use client';

import Link from "next/link";
import { Button } from "../ui/button";
import { LogOut, User } from "lucide-react";
import { getCookieToken, removeCookieToken } from "@/utils/cookie";
import { useState } from "react";
import { SearchDropdown } from "../search-dropdown";

const Header = () => {
    const token = getCookieToken();

    const handleSignOut = () => {
        removeCookieToken();
        window.location.href = "/login";
    };

    const [selectedLink, setSelectedLink] = useState<string>("/");

    const Links = [
        { name: "Home", href: "/" },
        { name: "Now Showing", href: "/now-showing" },
        { name: "Coming Soon", href: "/coming-soon" },
        { name: "Schedule", href: "/schedule" },
    ]

    return (
        <header className="sticky px-15 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold">CielTanMovies</span>
                </Link>
                <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 border-l-2 pl-6">
                    {Links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`
                                text-sm font-medium transition-colors hover:text-primary
                                ${selectedLink === link.href
                                    ? "text-primary"
                                    : "text-muted-foreground"}
                            `}
                            onClick={() => setSelectedLink(link.href)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
                <div className="ml-auto flex items-center gap-4">
                    <div className="relative hidden md:block">
                        <SearchDropdown />
                    </div>
                    {token && (
                        <Button variant="outline" size="icon" asChild>
                            <Link href="/account">
                                <User className="h-4 w-4" />
                                <span className="sr-only">Account</span>
                            </Link>
                        </Button>
                    )}
                    {token ? (
                        <Button variant="outline" onClick={handleSignOut}>
                            <LogOut className="h-4 w-4 mr-2" />
                            Sign Out
                        </Button>
                    ) : (
                        <Button asChild>
                            <Link href="/login">Sign In</Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}
 
export default Header;