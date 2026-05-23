import { BadgeCheck } from "lucide-react";

const SecurityStatus = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-2 rounded-full border bg-green-500/10 px-4 py-2 text-sm text-green-600">
        <BadgeCheck className="h-4 w-4" />
        Authenticated Securely
      </div>
    </div>
  );
};

export default SecurityStatus;
