import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import {
  LoginFormValues,
  loginSchema,
} from "@/app/validations/auth.validation";
import { useLoginMutation } from "@/features/auth";
import PasswordInput from "@/common/PasswordInput";
import { useRouter } from "next/router";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const handleLogin = async (data: LoginFormValues) => {
    try {
      const result = await login(data).unwrap();
      console.log(result);
      if (result?.data?.requires_2fa) {
        return router.push(
          `/2fa-verification?token=${result?.data?.temp_token}`,
        );
      }
      if (result?.statusCode === 200) {
        toast.success(result?.message);
        window.location.replace("/");
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.message ||
            "Failed to login",
        );
      }
    } catch (error: any) {
      toast.error(error?.message || error?.data?.message || "Failed to login");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-3">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-800">Email</label>
        <input
          disabled={isLoading}
          type="email"
          placeholder="john@example.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email address",
            },
          })}
          className="w-full text-gray-800 rounded-lg border border-gray-300  px-4 py-2 text-sm pr-10 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <PasswordInput
        errors={errors}
        isDisabled={isLoading}
        name="password"
        register={register}
      />

      <Link
        className="text-sm hover:underline text-gray-800"
        href={"/auth/forgot-password?mode=code"}
      >
        Forgot password?
      </Link>

      <Button type="submit" disabled={isLoading} className="w-full mt-4">
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
};

export default LoginForm;
