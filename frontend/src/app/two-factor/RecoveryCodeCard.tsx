import { IRecoveryCode } from "@/types/recovery-code.type";
import { CheckCircle2, XCircle } from "lucide-react";

type Props = {
  code: IRecoveryCode;
};

const RecoveryCodeCard = ({ code }: Props) => {
  return (
    <div
      className={`flex items-center justify-between rounded-xl border p-3 transition ${
        code.is_used ? "bg-muted/40 opacity-70" : "hover:border-primary/30"
      }`}
    >
      <div className="space-y-1">
        <p className="font-medium">{code.name}</p>

        <p className="text-xs text-muted-foreground">ID: {code.id.slice(-6)}</p>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 text-sm">
        {code.is_used ? (
          <>
            <XCircle className="h-4 w-4 text-red-500" />
            <span className="text-red-500">Used</span>
          </>
        ) : (
          <>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span className="text-green-600">Active</span>
          </>
        )}
      </div>
    </div>
  );
};

export default RecoveryCodeCard;
