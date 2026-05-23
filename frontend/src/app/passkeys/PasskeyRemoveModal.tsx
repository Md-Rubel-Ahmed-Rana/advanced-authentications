import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { useRemovePasskeyMutation } from "@/features/passkey";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  id: string;
  deviceName: string;
};

const PasskeyRemoveModal = ({ id, deviceName }: Props) => {
  const [open, setOpen] = useState(false);

  const [removePasskey, { isLoading }] = useRemovePasskeyMutation();

  const handleRemovePasskey = async () => {
    try {
      const result = await removePasskey(id).unwrap();

      if (result?.statusCode === 200) {
        toast.success(result.message || "Passkey removed successfully");
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.message || "Failed to remove passkey",
      );
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="destructive"
        size="sm"
        className="cursor-pointer"
      >
        Remove
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Passkey</DialogTitle>

            <DialogDescription>
              You are about to remove this passkey:
            </DialogDescription>
          </DialogHeader>

          <div className="bg-muted p-3 rounded-md text-sm">
            <p className="font-medium">{deviceName}</p>
            <p className="text-xs text-gray-500 mt-1">
              This device will no longer be able to sign in using passkey
              authentication.
            </p>
          </div>

          <p className="text-sm text-red-500 mt-2">
            ⚠️ This action cannot be undone.
          </p>

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              className="bg-gray-400 hover:bg-gray-500 cursor-pointer"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={handleRemovePasskey}
              className="cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Removing..." : "Yes, Remove"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PasskeyRemoveModal;
