import {
  useRegisterPasskeyOptionsMutation,
  useRegisterPasskeyVerifyMutation,
} from "@/features/passkey";
import { startRegistration } from "@simplewebauthn/browser";
import { toast } from "sonner";

const RegisterPasskeyButton = () => {
  const [registerOption, { isLoading: isRegistering }] =
    useRegisterPasskeyOptionsMutation();
  const [registerVerify, { isLoading: isVerifying }] =
    useRegisterPasskeyVerifyMutation();

  const handleRegister = async () => {
    try {
      const registerRes = await registerOption({}).unwrap();

      const options = registerRes.data;

      const authenticationResponse = await startRegistration({
        optionsJSON: options,
      });

      const registerVerified = await registerVerify(
        authenticationResponse,
      ).unwrap();

      const verification = registerVerified.data;

      console.log(verification);

      toast.success("Passkey registered successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to register passkey");
    }
  };

  return (
    <button
      className="border px-4 py-2 rounded-md cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
      onClick={handleRegister}
      disabled={isRegistering || isVerifying}
    >
      {isRegistering || isVerifying ? "Creating Passkey..." : "Create Passkey"}
    </button>
  );
};

export default RegisterPasskeyButton;
