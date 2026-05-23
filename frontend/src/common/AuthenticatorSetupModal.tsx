import { useState } from "react";
import Image from "next/image";
import { ShieldCheck, Smartphone, Copy, CheckCircle2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useVerify2faMutation } from "@/features/2fa";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  qrCode: string;
  secret: string;
};

const AuthenticatorSetupModal = ({
  open,
  onOpenChange,
  qrCode,
  secret,
}: Props) => {
  const [otp, setOtp] = useState("");
  const [copied, setCopied] = useState(false);
  const [verifyOtp, { isLoading }] = useVerify2faMutation();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(secret);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleVerifyAuthenticator = async () => {
    if (otp.length !== 6) return;

    try {
      const result = await verifyOtp({ token: otp }).unwrap();

      if (result?.statusCode === 200) {
        const recoveryCodes = result.data.recovery_codes as {
          name: string;
          code: string;
        }[];

        const fileContent = `
          Recovery Codes
          ==============================

          Store these recovery codes in a safe place.

          Each code can only be used once.

          ${recoveryCodes
            .map((item, index) => `${index + 1}. ${item.name}\n   ${item.code}`)
            .join("\n\n")}

          ==============================
          Generated at: ${new Date().toLocaleString()}
          `;

        // Create blob
        const blob = new Blob([fileContent], {
          type: "text/plain;charset=utf-8",
        });

        // Create temporary download link
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "recovery-codes.txt";

        document.body.appendChild(link);

        // Trigger download
        link.click();

        // Cleanup
        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);

        toast.success("Recovery codes downloaded successfully");
      }
    } catch (error: any) {
      console.log(error);

      toast.error(error.message || "Failed to verify 2 factor code");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-2xl p-0 overflow-hidden">
        <div className="border-b px-6 py-5">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <ShieldCheck className="size-6 text-primary" />
              </div>

              <div>
                <DialogTitle className="text-xl">
                  Setup Authenticator
                </DialogTitle>

                <DialogDescription className="mt-1">
                  Add an extra layer of security to your account using an
                  authenticator app.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="space-y-6 px-6 py-6">
          {/* Step 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                1
              </div>

              <h3 className="font-semibold">
                Scan QR code with authenticator app
              </h3>
            </div>

            <div className="rounded-2xl border bg-muted/30 p-6">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="rounded-2xl border bg-white p-4 shadow-sm">
                  <Image
                    src={qrCode}
                    alt="Authenticator QR Code"
                    width={220}
                    height={220}
                    className="rounded-lg"
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Smartphone className="size-4" />

                  <span>
                    Google Authenticator, Authy, Microsoft Authenticator, etc.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Step 2 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                2
              </div>

              <h3 className="font-semibold">Or enter setup key manually</h3>
            </div>

            <div className="rounded-xl border bg-muted/30 p-4">
              <div className="flex items-center justify-between gap-3">
                <code className="break-all text-sm font-medium">{secret}</code>

                <Button size="icon" variant="outline" onClick={handleCopy}>
                  {copied ? (
                    <CheckCircle2 className="size-4" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Step 3 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                3
              </div>

              <h3 className="font-semibold">
                Enter the 6-digit verification code
              </h3>
            </div>

            <div className="space-y-3">
              <Input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="h-12 text-center text-lg tracking-[0.5em]"
              />

              <p className="text-sm text-muted-foreground">
                Enter the code currently displayed in your authenticator app.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button
            onClick={handleVerifyAuthenticator}
            disabled={otp.length !== 6 || isLoading}
          >
            {isLoading ? "Verifying..." : "Confirm & Enable"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthenticatorSetupModal;
