import AuthenticatorSetupModal from "@/common/AuthenticatorSetupModal";
import { Button } from "@/components/ui/button";
import { useSetup2faMutation } from "@/features/2fa";
import { useState } from "react";

const Setup2faButton = () => {
  const [open, setOpen] = useState(false);
  const [setup, { isLoading }] = useSetup2faMutation();
  const [authenticate, setAuthenticate] = useState({
    qr_code: "",
    secret: "",
    otpauth_url: "",
  });

  const handleSetup2FA = async () => {
    try {
      const result = await setup({}).unwrap();
      console.log(result);
      setAuthenticate(result?.data);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        disabled={isLoading}
        onClick={handleSetup2FA}
        className="text-white hover:bg-gray-800 cursor-pointer p-5"
      >
        {isLoading ? "Setting..." : "Setup 2FA"}
      </Button>
      <AuthenticatorSetupModal
        open={open}
        onOpenChange={setOpen}
        qrCode={authenticate.qr_code}
        secret={authenticate.secret}
      />
    </>
  );
};

export default Setup2faButton;
