import { Button } from "@/components/ui/button";
import { useState } from "react";
import RecoveryCodeModal from "./RecoveryCodeModal";

const UseRecoveryCode = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button className="cursor-pointer" onClick={() => setOpen(true)}>
        Use recovery code
      </Button>

      <RecoveryCodeModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default UseRecoveryCode;
