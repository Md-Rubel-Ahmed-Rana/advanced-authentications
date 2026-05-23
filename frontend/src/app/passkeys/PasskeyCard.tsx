import {
  Calendar,
  Home,
  Globe,
  Laptop,
  ShieldCheck,
  ShieldX,
  Smartphone,
  Clock3,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IPasskey } from "@/types/passkey.type";
import PasskeyRemoveModal from "./PasskeyRemoveModal";
import moment from "moment";
type Props = {
  passkey: IPasskey;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const PasskeyCard = ({ passkey }: Props) => {
  const isMultiDevice = passkey.deviceType === "multiDevice";

  return (
    <div className="rounded-2xl border   p-4 transition-all hover:border-primary/30 hover:shadow-sm">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-primary/10 p-2">
              {isMultiDevice ? (
                <Smartphone className="h-5 w-5 text-primary" />
              ) : (
                <Laptop className="h-5 w-5 text-primary" />
              )}
            </div>

            <div>
              <h3 className="font-semibold leading-none">{passkey.name}</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {passkey.browser} on {passkey.os}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="gap-1">
              <Home className="h-3 w-3" />
              {passkey.browser}
            </Badge>

            <Badge variant="secondary" className="gap-1">
              <Globe className="h-3 w-3" />
              {passkey.os}
            </Badge>

            <Badge
              variant={isMultiDevice ? "default" : "outline"}
              className="text-gray-700"
            >
              {isMultiDevice ? "Synced Device" : "Single Device"}
            </Badge>

            <Badge
              variant={passkey.backedUp ? "default" : "destructive"}
              className="gap-1"
            >
              {passkey.backedUp ? (
                <ShieldCheck className="h-3 w-3" />
              ) : (
                <ShieldX className="h-3 w-3" />
              )}

              {passkey.backedUp ? "Backed Up" : "Not Backed Up"}
            </Badge>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />

              <span>Added on {formatDate(passkey.createdAt)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4" />

              <span>
                {passkey.lastUsedAt ? (
                  <small>
                    Last used:{" "}
                    <strong>
                      {moment(new Date(passkey.lastUsedAt)).fromNow()}
                    </strong>
                  </small>
                ) : (
                  "Never used yet"
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <PasskeyRemoveModal id={passkey.id} deviceName={passkey.name} />
        </div>
      </div>
    </div>
  );
};

export default PasskeyCard;
