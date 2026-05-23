import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import RecoveryCodeInput from "./RecoveryCodeInput";
import { useVerifyRecoveryCodeMutation } from "@/features/2fa";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onClose: () => void;
};

const RecoveryCodeModal = ({ open, onClose }: Props) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [verifyRecoveryCode, { isLoading }] = useVerifyRecoveryCodeMutation();

  const handleVerify = async () => {
    setError("");

    const regex = /^[A-Z0-9]{4}-[A-Z0-9]{4}$/;

    if (!regex.test(code)) {
      setError("Invalid recovery code format (e.g. FE61-14AE)");
      return;
    }

    try {
      const result = await verifyRecoveryCode({ code }).unwrap();
      if (result?.statusCode === 200) {
        toast.success(result?.message || "Recovery code verified successfully");
        window.location.replace("/");
      }
      onClose();
    } catch (error: any) {
      console.log(error);
      setError(
        error?.data?.message ||
          error?.message ||
          "Invalid or already used recovery code",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>Verify Recovery Code</DialogTitle>

          <DialogDescription>
            Enter your 8-character recovery code to regain access.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <RecoveryCodeInput value={code} onChange={setCode} />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            className="w-full cursor-pointer"
            onClick={handleVerify}
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecoveryCodeModal;
