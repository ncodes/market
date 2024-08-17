import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import EmojiAvatar from "../../../components/avatar/EmojiAvatar.tsx";
import { AvatarSize } from "../../../components/avatar/useAvatar";
import { IconSettingsOutline } from "../../../components/icons/IconSettingsOutline.tsx";
import { logError, shortenAddress, shortenAddress2 } from "../../../libs/helpers.ts";
import { cn } from "../../../libs/utils.ts";
import { useAuthService } from "../../services/backend/useAuthService.ts";
import useStore from "../../store/useStore.ts";
import { useSession } from "../../useSession.ts";
import { createSignatureMessage } from "../common.ts";
import { useConnectorContext } from "../useConnectorContext.tsx";

export const ConnectedButton = ({
  className,
  noSessionCreation,
}: {
  openWalletModal?: () => void;
  className?: string;
  noSessionCreation?: boolean;
}) => {
  const { address, ready, sign } = useConnectorContext();
  const { token, setAccessToken } = useSession();
  const { setUser } = useStore((state) => ({ setUser: state.setUser }));
  const { createSessionFromWallet } = useAuthService();
  const queryClient = useQueryClient();
  const createSessionMut = useMutation({
    mutationFn: createSessionFromWallet,
  });

  useEffect(() => {
    if (!ready || token || noSessionCreation) return;

    const createSession = async () => {
      const msg = createSignatureMessage(address, "", "24 hours");
      const sig = await sign(msg.toString("utf-8"));
      console.log("Msg", "0x" + msg.toString("hex"));
      console.log("Sig", sig);

      try {
        const resp = await createSessionMut.mutateAsync({
          walletAddress: address,
          msg: "0x" + msg.toString("hex"),
          signedMsg: sig,
        });
        setUser(resp.user);
        setAccessToken(address, resp.token);
        queryClient.refetchQueries({ queryKey: ["getVideo", "getClip"] });
      } catch (error) {
        logError(error);
        toast.error("Unable to create session");
      }
    };

    void createSession();
  }, [ready, token]);

  return (
    <div>
      <div
        className={cn(
          "flex h-auto items-center justify-between gap-1 rounded-full bg-byzantine-blue py-1 pr-1 transition-all duration-500 hover:scale-x-105 hover:shadow-[0px_11px_24px_-6px_rgba(31,106,218,0.5)] [&>*]:cursor-pointer",
          className,
        )}
        onClick={() => {}}
      >
        <p className={cn("ml-[4px] hidden rounded-full px-[8px] py-[6px] tracking-[0.19px] text-[#001029] lg:flex")}>
          <IconSettingsOutline width="17" color="white" />
        </p>
        <p className={cn("address text font-poppins font-normal tracking-wider text-gray-100 lg:inline-block", {})}>
          <>
            <span className="hidden lg:inline-block">{shortenAddress(address as string)}</span>
            <span className="lg:hidden">{shortenAddress2(address as string)}</span>
          </>
        </p>

        <div className="pl-1 md:pl-2">
          <EmojiAvatar size={AvatarSize.Small} randomStr={address as string} />
        </div>
      </div>
      <div className="absolute">{/* <SettingsSheet openWalletManager={openWalletModal} /> */}</div>
    </div>
  );
};
