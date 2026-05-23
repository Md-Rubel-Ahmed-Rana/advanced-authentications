import { ShieldCheck } from "lucide-react";
import RecoveryCodeList from "./RecoveryCodeList";
import SecurityEmptyState from "@/common/SecurityEmptyState";
import Setup2faButton from "@/profile/Setup2faButton";

type TRecoveryCode = {
  id: string;
  is_used: boolean;
  name: string;
  used_at: string | null;
};

type Props = {
  twoFactor: {
    is_enabled: boolean;
    recovery_codes: TRecoveryCode[];
  };
};

const TwoFactorSection = ({ twoFactor }: Props) => {
  if (!twoFactor?.is_enabled) {
    return (
      <SecurityEmptyState
        title="Two-Factor Authentication Disabled"
        description="Enable 2FA to protect your account with an extra layer of security."
        icon={<ShieldCheck className="h-5 w-5 text-primary" />}
        action={<Setup2faButton />}
      />
    );
  }

  return <RecoveryCodeList codes={twoFactor.recovery_codes} />;
};

export default TwoFactorSection;
