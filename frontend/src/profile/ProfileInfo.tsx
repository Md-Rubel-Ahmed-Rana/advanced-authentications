import { IUser } from "@/types/user.type";
import { Mail, User2 } from "lucide-react";

type Props = {
  user: IUser;
};

const ProfileInfo = ({ user }: Props) => {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4 rounded-xl border p-4">
        <div className="rounded-lg bg-primary/10 p-2">
          <User2 className="h-5 w-5 text-primary" />
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Full Name</p>
          <p className="font-medium">{user?.name}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-xl border p-4">
        <div className="rounded-lg bg-primary/10 p-2">
          <Mail className="h-5 w-5 text-primary" />
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Email Address</p>
          <p className="font-medium">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
