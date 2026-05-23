import { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  icon: ReactNode;
  action: ReactNode;
};

const SecurityEmptyState = ({ title, description, icon, action }: Props) => {
  return (
    <div className="space-y-5 rounded-2xl border p-5">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2">{icon}</div>

        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      {action}
    </div>
  );
};

export default SecurityEmptyState;
