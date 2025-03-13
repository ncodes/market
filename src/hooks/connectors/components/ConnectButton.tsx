import { ConnectKitButton } from "connectkit";
import IconWallet from "../../../components/icons/IconWallet";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../libs/utils";
import { ConnectedButton } from "./ConnectedButton";

function Connect({
  show,
  className,
  connectBtnText,
  hideIcon,
  hideTextOnMobile,
}: {
  show: () => void;
  className?: string;
  connectBtnText?: string;
  hideIcon?: boolean;
  hideTextOnMobile?: boolean;
}) {
  return (
    <Button variant={"secondary"} onClick={show} className={cn("scale-btn", className)}>
      <div className="flex items-center gap-8">
        <span className={cn({ hidden: hideTextOnMobile })}>{connectBtnText || "Connect"}</span>
        {!hideIcon && <IconWallet />}
      </div>
    </Button>
  );
}

function Connected({
  show,
  className,
  noSessionCreation,
}: {
  show: () => void;
  className?: string;
  noSessionCreation?: boolean;
}) {
  return <ConnectedButton openWalletModal={show} className={className} noSessionCreation={noSessionCreation} />;
}

export function ConnectButton({
  className,
  connectedClassName,
  noSessionCreation,
  connectBtnText,
  hideOnConnected,
  hideIcon,
  showSwapButton,
  swapButtonClassName,
  hideTextOnMobile,
  onSwapClick,
}: {
  className?: string;
  connectedClassName?: string;
  noSessionCreation?: boolean;
  hideOnConnected?: boolean;
  connectBtnText?: string;
  hideIcon?: boolean;
  swapButtonClassName?: string;
  showSwapButton?: boolean;
  hideTextOnMobile?: boolean;
  onSwapClick?: () => void;
}) {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show }) => {
        return (
          <div className={cn("w-fit", { "w-full": showSwapButton })}>
            {!isConnected ? (
              <Connect
                className={className}
                connectBtnText={connectBtnText}
                show={show as () => void}
                hideIcon={hideIcon}
                hideTextOnMobile={hideTextOnMobile}
              />
            ) : (
              <>
                {!hideOnConnected && (
                  <Connected
                    className={connectedClassName}
                    show={show as () => void}
                    noSessionCreation={noSessionCreation}
                  />
                )}
                {showSwapButton && (
                  <Button
                    variant={"secondary"}
                    onClick={onSwapClick}
                    className={cn("h-auto w-full py-2 text-lg font-semibold text-gunmetal", swapButtonClassName)}
                  >
                    Swap
                  </Button>
                )}
              </>
            )}
          </div>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
