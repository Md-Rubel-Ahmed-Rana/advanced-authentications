import { Input } from "@/components/ui/input";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const formatCode = (value: string) => {
  const cleaned = value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 8);

  if (cleaned.length <= 4) return cleaned;

  return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
};

const RecoveryCodeInput = ({ value, onChange }: Props) => {
  return (
    <div className="space-y-2">
      <Input
        placeholder="FE61-14AE"
        value={value}
        onChange={(e) => onChange(formatCode(e.target.value))}
        className="text-center tracking-widest text-lg font-mono"
        maxLength={9}
      />

      <p className="text-xs text-muted-foreground text-center">
        Format: XXXX-XXXX
      </p>
    </div>
  );
};

export default RecoveryCodeInput;
