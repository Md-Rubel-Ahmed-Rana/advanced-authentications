import { useState } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

type Props<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  placeholder?: string;
  isDisabled: boolean;
  defaultValue?: string;
};

const PasswordInput = <T extends FieldValues>({
  label = "Password",
  name,
  register,
  errors,
  placeholder = "••••••••",
  isDisabled = false,
  defaultValue,
}: Props<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-800">{label}</label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="w-full rounded-lg text-gray-800 border border-gray-300  px-4 py-2 text-sm pr-10 focus:ring-2 focus:ring-indigo-500 outline-none"
          {...register(name, {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          disabled={isDisabled}
          defaultValue={defaultValue}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default PasswordInput;
