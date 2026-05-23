import {
  useLoginPasskeyOptionsMutation,
  useLoginPasskeyVerifyMutation,
} from "@/features/passkey";
import { startAuthentication } from "@simplewebauthn/browser";
import { toast } from "sonner";

const LoginWithPasskeyButton = () => {
  const [loginOption, { isLoading: isLoggingIn }] =
    useLoginPasskeyOptionsMutation();
  const [loginVerify, { isLoading: isVerifying }] =
    useLoginPasskeyVerifyMutation();

  const handleLogin = async () => {
    try {
      const loginOptions = await loginOption({}).unwrap();

      const options = loginOptions?.data;

      const authenticationResponse = await startAuthentication({
        optionsJSON: options,
      });

      const loginVerification = await loginVerify(
        authenticationResponse,
      ).unwrap();

      const verification = loginVerification?.data;
      if (verification?.statusCode === 200) {
        toast.success(loginVerification?.message || "Login successful");
        window.location.replace("/");
      } else {
        toast.error(
          verification?.error?.message ||
            verification?.error?.data?.message ||
            "Failed to login with passkey",
        );
      }
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.data?.message ||
          error?.data?.error?.message ||
          error?.message ||
          "Passkey login failed",
      );
    }
  };

  return (
    <button
      className="border px-2 py-1 font-serif text-sm w-full rounded-md cursor-pointer bg-gray-600 text-white hover:bg-gray-700"
      disabled={isLoggingIn || isVerifying}
      onClick={handleLogin}
    >
      {isLoggingIn || isVerifying
        ? "Authenticating..."
        : "Continue with Passkey"}
    </button>
  );
};

export default LoginWithPasskeyButton;
