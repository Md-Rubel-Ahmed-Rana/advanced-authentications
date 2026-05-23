import { KeyRound } from "lucide-react";
import RegisterPasskeyButton from "@/app/auth/passkeys/RegisterPasskeyButton";
import { IPasskey } from "@/types/passkey.type";
import PasskeyCard from "./PasskeyCard";

type Props = {
  passkeys: IPasskey[];
};

const PasskeyList = ({ passkeys }: Props) => {
  return (
    <div className="space-y-5 rounded-2xl border p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-2">
            <KeyRound className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h2 className="font-semibold">Passkeys</h2>

            <p className="text-sm text-muted-foreground">
              Secure passwordless authentication devices.
            </p>
          </div>
        </div>

        <RegisterPasskeyButton />
      </div>

      <div className="space-y-3">
        {passkeys.map((passkey) => (
          <PasskeyCard key={passkey.id} passkey={passkey} />
        ))}
      </div>
    </div>
  );
};

export default PasskeyList;
