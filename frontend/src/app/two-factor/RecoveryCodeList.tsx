import { KeyRound, ShieldAlert } from "lucide-react";
import RecoveryCodeCard from "./RecoveryCodeCard";
import { IRecoveryCode } from "@/types/recovery-code.type";

type Props = {
  codes: IRecoveryCode[];
};

const RecoveryCodeList = ({ codes }: Props) => {
  const usedCount = codes.filter((c) => c.is_used).length;
  const unusedCount = codes.length - usedCount;

  return (
    <div className="space-y-5 rounded-2xl border p-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-2">
            <KeyRound className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h2 className="font-semibold">Recovery Codes</h2>

            <p className="text-sm text-muted-foreground">
              Use these codes to recover your account if you lose access to your
              authenticator.
            </p>
          </div>
        </div>

        <div className="text-right text-sm">
          <p className="text-muted-foreground">Used: {usedCount}</p>
          <p className="text-muted-foreground">Available: {unusedCount}</p>
        </div>
      </div>

      {/* Warning */}
      <div className="flex items-start gap-2 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-3 text-sm text-yellow-700">
        <ShieldAlert className="h-4 w-4 mt-0.5" />
        Each recovery code can be used only once. Store them safely.
      </div>

      {/* Grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {codes.map((code) => (
          <RecoveryCodeCard key={code.id} code={code} />
        ))}
      </div>
    </div>
  );
};

export default RecoveryCodeList;
