import { ShieldCheck } from "lucide-react";

const AppLoader = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex h-20 w-20 items-center justify-center  bg-primary text-primary-foreground  border rounded">
        <ShieldCheck className="h-10 w-10 animate-pulse" />
      </div>

      <div className="mt-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight">SecureAuth</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Initializing secure authentication...
        </p>
      </div>

      <div className="mt-8 flex items-center gap-2">
        <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
      </div>
    </div>
  );
};

export default AppLoader;
