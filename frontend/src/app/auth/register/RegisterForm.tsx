import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  RegisterFormValues,
  registerSchema,
} from "@/app/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "@/common/PasswordInput";
import { useRegisterMutation } from "@/features/auth";
import { toast } from "sonner";
import { useRouter } from "next/router";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const [signup, { isLoading }] = useRegisterMutation();

  const handleRegister = async (data: RegisterFormValues) => {
    try {
      const result = await signup(data).unwrap();
      if (result?.statusCode === 201) {
        toast.success(result?.message);
        localStorage.setItem("auth", JSON.stringify(data));
        if (result?.data?.redirect_url) {
          router.push(result.data.redirect_url);
        } else {
          router.push("/login");
        }
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.message ||
            "Failed to register",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message || error?.data?.message || "Failed to register",
      );
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleRegister)} className="space-y-3">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-800">Full Name</label>
        <input
          disabled={isLoading}
          placeholder="John Doe"
          {...register("name")}
          className="w-full rounded-lg text-gray-800 border border-gray-300  px-4 py-2 text-sm pr-10 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-800">Email</label>
        <input
          disabled={isLoading}
          type="email"
          placeholder="john@example.com"
          {...register("email")}
          className="w-full rounded-lg border text-gray-800 border-gray-300  px-4 py-2 text-sm pr-10 focus:ring-2 focus:ring-indigo-500 outline-none"
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

      <Button type="submit" disabled={isLoading} className="w-full mt-4">
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
};

export default RegisterForm;
