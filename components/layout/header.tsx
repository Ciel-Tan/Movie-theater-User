import Link from "next/link";
import { Button } from "../ui/button";
import { Search, User } from "lucide-react";
import { Input } from "../ui/input";

const Header = () => {
    return (
        <header className="sticky px-15 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold">CinePlex</span>
                </Link>
                <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
                    <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                        Home
                    </Link>
                    <Link
                        href="/now-showing"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        Now Showing
                    </Link>
                    <Link
                        href="/coming-soon"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        Coming Soon
                    </Link>
                </nav>
                <div className="ml-auto flex items-center gap-4">
                    <div className="relative hidden md:block">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search movies..."
                            className="w-[200px] pl-8 md:w-[300px] lg:w-[400px]"
                        />
                    </div>
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/account">
                            <User className="h-4 w-4" />
                            <span className="sr-only">Account</span>
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href="/account/login">Sign In</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
 
export default Header;