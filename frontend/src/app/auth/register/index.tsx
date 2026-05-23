import Link from "next/link";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <section className="flex min-h-[70dvh] items-center justify-center bg-slate-50 px-4">
      <div className="space-y-4 rounded-xl border bg-white p-6 shadow-sm w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Create an account
          </h1>
          <p className="text-sm text-slate-500">Start your journey with us</p>
        </div>

        <RegisterForm />

        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
