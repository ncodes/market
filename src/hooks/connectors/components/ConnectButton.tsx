import { ConnectKitButton } from "connectkit";
import { ConnectedButton } from "./ConnectedButton";
import { cn } from "@/libs/utils.ts";

interface ConnectProps {
  show: () => void;
  className?: string;
}

function Connect({ show, className }: ConnectProps) {
  return (
    <button
      className={cn(
        "w-full rounded-full bg-card p-2 px-4 font-semibold tracking-wide text-light-green transition-all duration-500 hover:scale-105",
        className,
      )}
      onClick={show}
    >
      Connect
    </button>
  );
}

interface ConnectedProps {
  show: () => void;
  className?: string;
  noSessionCreation?: boolean;
}

function Connected({ show, className, noSessionCreation }: ConnectedProps) {
  return (
    <div>
      <ConnectedButton openWalletModal={show} className={className} noSessionCreation={noSessionCreation} />
    </div>
  );
}

export function ConnectButton({
  className,
  connectedClassName,
  noSessionCreation,
}: {
  className?: string;
  connectedClassName?: string;
  noSessionCreation?: boolean;
}) {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show }) => {
        return (
          <span>
            {!isConnected ? (
              <Connect className={className} show={show as () => void} />
            ) : (
              <Connected
                className={connectedClassName}
                show={show as () => void}
                noSessionCreation={noSessionCreation}
              />
            )}
          </span>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
