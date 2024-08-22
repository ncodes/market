import { ConnectKitButton } from "connectkit";
import { ConnectedButton } from "./ConnectedButton";
import { cn } from "@/libs/utils.ts";

interface ConnectProps {
  show: () => void;
  className?: string;
  connectBtnText?: string;
}

function Connect({ show, className, connectBtnText }: ConnectProps) {
  return (
    <button
      className={cn(
        "w-full rounded-full bg-card p-2 px-4 font-semibold tracking-wide text-light-green transition-all duration-500 hover:scale-105",
        className,
      )}
      onClick={show}
    >
      {connectBtnText || "Connect"}
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
  connectBtnText,
  renderNullOnConnect,
}: {
  className?: string;
  connectedClassName?: string;
  noSessionCreation?: boolean;
  renderNullOnConnect?: boolean;
  connectBtnText?: string;
}) {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show }) => {
        return (
          <div className="w-full">
            {!isConnected ? (
              <Connect className={className} connectBtnText={connectBtnText} show={show as () => void} />
            ) : (
              <>
                {!renderNullOnConnect && (
                  <Connected
                    className={connectedClassName}
                    show={show as () => void}
                    noSessionCreation={noSessionCreation}
                  />
                )}
              </>
            )}
          </div>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
