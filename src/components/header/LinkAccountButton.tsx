import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { createSignatureMessage } from "../../hooks/connectors/common";
import { useConnectorContext } from "../../hooks/connectors/useConnectorContext";
import { useAuthService } from "../../hooks/services/backend/useAuthService";
import useStore from "../../hooks/store/useStore";
import { useSession } from "../../hooks/useSession";
import { logError } from "../../libs/helpers";
import { ToolTip } from "../toolTip";
import { Button } from "../ui/button";

export default function LinkAccountButton({
  children,
  onLoading,
}: {
  children?: React.ReactNode;
  onLoading?: (loading: boolean) => void;
}) {
  const { ready, sign, address } = useConnectorContext();
  const { token, setAccessToken } = useSession();
  const { setUser } = useStore((state) => ({ setUser: state.setUser }));
  const { auth } = useAuthService();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const createSessionMut = useMutation({
    mutationFn: auth,
  });

  useEffect(() => {
    onLoading?.(loading);
  }, [loading]);

  if (!ready || token) return null;

  async function createSession() {
    setLoading(true);

    let sig = "";
    let msg: Buffer;
    try {
      msg = createSignatureMessage(address, "", "24 hours");
      sig = await sign(msg.toString("utf-8"));
    } catch (error) {
      setLoading(false);
      logError(error);
      toast.error("Account Link", { description: (error as Error).message, position: "top-right" });
      return;
    }

    console.log("Msg", "0x" + msg.toString("hex"));
    console.log("Sig", sig);

    try {
      const resp = await createSessionMut.mutateAsync({
        message: "0x" + msg.toString("hex"),
        signature: sig,
        refCode: null,
      });
      setUser(resp.user);
      setAccessToken(address, resp.token!);
      queryClient.refetchQueries({ queryKey: ["getVideo", "getClip"] });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      logError(error);
      toast.error("Account Link", { description: "Unable to create session", position: "top-right" });
    }
  }

  if (React.isValidElement(children)) {
    return React.cloneElement<any>(children as any, { onClick: createSession });
  }

  return (
    <div>
      <ToolTip
        tip="Link your wallet to a Swopler account for personalized features. "
        className2="bg-gray-800/80 border-gray-800/80 tracking-wider"
      >
        <Button
          onClick={createSession}
          className="text-md w-40 bg-card font-normal text-gray-100 transition-all duration-500 hover:scale-x-[1.02] hover:bg-gray-800/80"
          disabled={loading}
        >
          {!loading && "Link Wallet"}
          {loading && (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> <span>Linking</span>
            </span>
          )}
        </Button>
      </ToolTip>
    </div>
  );
}
