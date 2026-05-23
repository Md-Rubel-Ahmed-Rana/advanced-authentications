import Link from "next/link";
import LoginForm from "./LoginForm";
import LoginWithPasskeyButton from "../passkeys/LoginWithPasskeyButton";

const Login = () => {
  return (
    <section className="flex min-h-[70dvh] items-center justify-center bg-slate-50 px-4">
      <div className=" w-full max-w-md space-y-4 rounded-md border bg-white p-6 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-sm text-slate-500">Sign in to continue</p>
        </div>

        <LoginForm />

        <LoginWithPasskeyButton />

        <p className="text-center text-sm text-slate-500">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
