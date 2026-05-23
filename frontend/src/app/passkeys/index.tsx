import { KeyRound } from "lucide-react";
import RegisterPasskeyButton from "@/app/auth/passkeys/RegisterPasskeyButton";
import { IPasskey } from "@/types/passkey.type";
import SecurityEmptyState from "@/common/SecurityEmptyState";
import PasskeyList from "./PasskeyList";

type Props = {
  passkey: {
    has_passkey: boolean;
    passkeys: IPasskey[];
  };
};

const PasskeySection = ({ passkey }: Props) => {
  if (!passkey?.has_passkey) {
    return (
      <SecurityEmptyState
        title="No Passkey Added"
        description="Add a passkey to enable faster and more secure passwordless sign in."
        icon={<KeyRound className="h-5 w-5 text-primary" />}
        action={<RegisterPasskeyButton />}
      />
    );
  }

  return <PasskeyList passkeys={passkey.passkeys} />;
};

export default PasskeySection;
