import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold">SecureAuth</span>
                <span className="text-xs text-muted-foreground">
                  Passwordless Security
                </span>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground">
              Modern authentication platform with Passkeys, Authenticator Apps,
              Recovery Codes, and enterprise-grade security.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Product</h3>

            <div className="space-y-3 text-sm text-muted-foreground">
              <Link href="#" className="block hover:text-foreground">
                Features
              </Link>

              <Link href="#" className="block hover:text-foreground">
                Security
              </Link>

              <Link href="#" className="block hover:text-foreground">
                Pricing
              </Link>

              <Link href="#" className="block hover:text-foreground">
                Changelog
              </Link>
            </div>
          </div>

          {/* Developers */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Developers</h3>

            <div className="space-y-3 text-sm text-muted-foreground">
              <Link href="#" className="block hover:text-foreground">
                API Docs
              </Link>

              <Link href="#" className="block hover:text-foreground">
                SDKs
              </Link>

              <Link href="#" className="block hover:text-foreground">
                Status
              </Link>

              <Link href="#" className="block hover:text-foreground">
                GitHub
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>

            <div className="space-y-3 text-sm text-muted-foreground">
              <Link href="#" className="block hover:text-foreground">
                About
              </Link>

              <Link href="#" className="block hover:text-foreground">
                Privacy
              </Link>

              <Link href="#" className="block hover:text-foreground">
                Terms
              </Link>

              <Link href="#" className="block hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} SecureAuth. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-foreground">
              Privacy Policy
            </Link>

            <Link href="#" className="hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
