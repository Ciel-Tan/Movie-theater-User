import Link from "next/link";

const Footer = () => {
    return (
        <footer className="border-t py-6 px-15 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    © 2025 CinePlex. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                    <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                        About
                    </Link>
                    <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                        Contact
                    </Link>
                    <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                        Terms
                    </Link>
                    <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                        Privacy
                    </Link>
                </div>
            </div>
        </footer>
    );
}
 
export default Footer;