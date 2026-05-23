import { useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useVerify2faLoginMutation } from "@/features/2fa";
import { toast } from "sonner";
import UseRecoveryCode from "./UseRecoveryCode";

const TwoFaVerification = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [verifyCode, { isLoading }] = useVerify2faLoginMutation();

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // auto move next
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");

    const newOtp = [...otp];

    pasted.forEach((val, i) => {
      newOtp[i] = val;
    });

    setOtp(newOtp);

    const lastIndex = pasted.length - 1;
    inputsRef.current[lastIndex]?.focus();
  };

  const handleVerification = async () => {
    const code = otp.join("");

    if (code.length !== 6) return;

    try {
      const result = await verifyCode({ code }).unwrap();
      if (result?.statusCode === 200) {
        toast.success(result.message);
        window.location.replace("/");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || "Failed to verify code. Please try again");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-sm">
        <CardHeader className="text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="size-6 text-primary" />
          </div>

          <CardTitle className="mt-3 text-xl">
            Two-Factor Authentication
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code from your authenticator app
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex justify-between gap-2">
            {otp.map((value, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                value={value}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                maxLength={1}
                inputMode="numeric"
                className="h-12 w-12 text-center text-lg font-semibold"
              />
            ))}
          </div>

          <UseRecoveryCode />

          <Button
            className="w-full"
            onClick={handleVerification}
            disabled={otp.join("").length !== 6 || isLoading}
          >
            {isLoading ? "Verifying..." : "Verify & Continue"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            If you didn’t receive a code, check your authenticator app
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TwoFaVerification;
