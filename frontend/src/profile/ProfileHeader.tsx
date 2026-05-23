import { User2 } from "lucide-react";

const ProfileHeader = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
        <User2 className="h-12 w-12 text-primary" />
      </div>

      <h1 className="mt-5 text-3xl font-bold tracking-tight">Welcome Back</h1>

      <p className="mt-2 text-sm text-muted-foreground">
        Your account is authenticated successfully.
      </p>
    </div>
  );
};

export default ProfileHeader;
