import { Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/features/auth";
import { toast } from "sonner";

const LogoutButton = () => {
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const res = await logout({}).unwrap();
      toast.success(res?.message || "Logged out successfully");
      window.location.assign("/");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to logout. Please try again");
    }
  };

  return (
    <Button
      variant="outline"
      className="gap-2 text-white hover:bg-gray-800 cursor-pointer p-5"
      onClick={handleLogout}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4" />
      ) : (
        <LogOut className="h-4 w-4" />
      )}

      {isLoading ? "Logging out..." : "Logout"}
    </Button>
  );
};

export default LogoutButton;
