import { Card, CardContent } from "@/components/ui/card";
import { useGetProfileQuery } from "@/features/auth";
import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";
import SecurityStatus from "./SecurityStatus";
import TwoFactorSection from "@/app/two-factor";
import PasskeySection from "@/app/passkeys";

const Profile = () => {
  const { data } = useGetProfileQuery({});

  const user = data?.data?.user;
  const twoFactor = data?.data?.two_factor;
  const passkey = data?.data?.passkey;

  return (
    <main className="container mx-auto flex min-h-[calc(100vh-140px)] items-center justify-center">
      <Card className="w-full  border shadow-xl">
        <CardContent className="space-y-8 p-8">
          <ProfileHeader />

          <ProfileInfo user={user} />

          <SecurityStatus />

          <div className="grid gap-4 md:grid-cols-2">
            <PasskeySection passkey={passkey} />
            <TwoFactorSection twoFactor={twoFactor} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Profile;
