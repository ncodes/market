import { AvatarSize } from "@/components/avatar/useAvatar";
import { shortenAddress, shortenAddress2 } from "@/libs/helpers.ts";
import { cn } from "@/libs/utils.ts";
import { useEffect } from "react";
import { useSession } from "../../useSession.ts";
import { useConnectorContext } from "../useConnectorContext";

export const ConnectedButton = ({
  className,
  noSessionCreation,
}: {
  openWalletModal?: () => void;
  className?: string;
  noSessionCreation?: boolean;
}) => {
  const { address, ready } = useConnectorContext();
  const { token } = useSession();
  // const { setUser } = useStore((state) => ({ setUser: state.setUser }));
  // const { createSessionFromWallet } = useAuthService();
  // const queryClient = useQueryClient();
  // const createSessionMut = useMutation({
  // mutationFn: createSessionFromWallet,
  // });

  useEffect(() => {
    if (!ready || token || noSessionCreation) return;

    const createSession = async () => {
      // const msg = createSignatureMessage(address, "", "24 hours");
      // const sig = await sign(msg.toString("utf-8"));
      // console.log("Msg", "0x" + msg.toString("hex"));
      // console.log("Sig", sig);
      // try {
      //   const resp = await createSessionMut.mutateAsync({
      //     walletAddress: address,
      //     msg: "0x" + msg.toString("hex"),
      //     signedMsg: sig,
      //   });
      //   setUser(resp.user);
      //   setAccessToken(address, resp.token);
      //   queryClient.refetchQueries({ queryKey: ["getVideo", "getClip"] });
      // } catch (error) {
      //   logError(error);
      //   toast.error("Unable to create session");
      // }
    };

    void createSession();
  }, [ready, token]);

  return (
    <div>
      <div
        className={cn(
          "flex h-auto items-center justify-between gap-1 rounded-full bg-card py-1 pr-1 transition-all duration-500 hover:scale-x-[1.02] hover:bg-gray-800/80 [&>*]:cursor-pointer",
          className,
        )}
        onClick={() => {}}
      >
        <div className="pl-1 md:pl-2">
          <EmojiAvatar size={AvatarSize.Small} randomStr={address as string} />
        </div>
        <p
          className={cn("address text ml-2 font-poppins font-normal tracking-wider text-gray-100 lg:inline-block", {})}
        >
          <>
            <span className="hidden lg:inline-block">{shortenAddress(address as string)}</span>
            <span className="lg:hidden">{shortenAddress2(address as string)}</span>
          </>
        </p>
        <p className={cn("ml-[2px] hidden rounded-full px-[8px] py-[6px] tracking-[0.19px] text-[#001029] lg:flex")}>
          <SettingsIcon width="17" color="white" />
        </p>
      </div>
      <div className="absolute">{/* <SettingsSheet openWalletManager={openWalletModal} /> */}</div>
    </div>
  );
};
