import Link from "next/link";
import { ShieldCheck, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetProfileQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const { data } = useGetProfileQuery({});

  const user = data?.data?.user as IUser;
  return (
    <section className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold">SecureAuth</span>
            <span className="text-xs text-muted-foreground">
              Passkeys & 2FA
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#features"
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            Features
          </Link>

          <Link
            href="#security"
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            Security
          </Link>

          <Link
            href="#docs"
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            Docs
          </Link>

          <Link
            href="#pricing"
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            Pricing
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {user?.id ? (
            <LogoutButton />
          ) : (
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          )}

          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Button
          size="icon"
          variant="ghost"
          className="md:hidden"
          aria-label="Open Menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default Navbar;
