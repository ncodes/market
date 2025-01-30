import { useConnectorContext } from "@/hooks/connectors/useConnectorContext";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ToolTip } from "../../../../components/ToolTip";
import { Button } from "../../../../components/ui/button";
import { useSession } from "../../../../hooks/useSession";
import { cn } from "../../../../libs/utils";
import { getPayer, isSellerOrBuyer } from "../../common/utils";
import { PaymentDetails } from "./PaymentDetails";

export function PaymentInformation({ order }: { order: Swap }) {
  const hasRouter = !!order.payRouterRequest;
  const [hide, setHide] = useState(hasRouter && order.paid);
  const { token } = useSession();
  const { address } = useConnectorContext();
  const payer = getPayer(order);
  const isPayer = payer == address;
  const countRouters = order.payRouterRequest?.routeIds?.length ?? 0;
  const whoiam = isSellerOrBuyer(order, address, true);

  useEffect(() => {
    setHide(hasRouter && order.paid);
  }, [order.paid]);

  return (
    <div className="border-t border-gray-800/50 px-3 py-5">
      <div className="flex items-center gap-2 text-lg tracking-wider">
        {!!token && (
          <div className="absolute right-0 mr-5 flex items-center gap-1">
            {isPayer && hasRouter && (
              <div className="flex items-center gap-1 rounded-xl bg-baltic-sea px-1.5 py-0.5 text-xs font-light text-gray-300">
                <ToolTip
                  tip={
                    countRouters > 1
                      ? `The payment details of the first router in a chain of ${countRouters} routers. These routers will relay your payment to the ${whoiam}. Each router in the chain forwards the payment to the next.`
                      : `The payment details of the router that will forward your payment to the ${whoiam}. This router acts as an intermediary to facilitate the payment.`
                  }
                  className="flex items-center gap-1"
                >
                  <InfoIcon className="h-3 w-3 text-gray-400" />
                  <span>Router #0</span>
                </ToolTip>
              </div>
            )}

            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="m-0 h-full w-auto rounded px-2 hover:bg-baltic-sea"
                onClick={() => {
                  setHide(!hide);
                }}
              >
                <ChevronUp
                  className={cn("h-5 w-5 text-gray-300 transition-all duration-300", hide ? "rotate-180" : "")}
                />
              </Button>
            </div>
          </div>
        )}

        <a href="#" onClick={() => setHide(!hide)}>
          {!order.released ? (isPayer ? "Send Payment to" : "Payment will be sent to") : "Payment Details"}
        </a>
        <span>
          <ToolTip
            tip={
              !order.released
                ? isPayer
                  ? hasRouter
                    ? `Send payment to the ${whoiam} using this payment details. The payment will be forwarded to the ${whoiam} through a router.`
                    : `Send payment to the ${whoiam} using this payment details.`
                  : hasRouter
                    ? `The ${whoiam} will send payment to you using this payment details. Payment will be forwarded to you through a router.`
                    : `The ${whoiam} will send payment to you using this payment details.`
                : isPayer
                  ? `The payment details you used to send funds to the ${whoiam}. This information is for your reference.`
                  : `The payment details used by the ${whoiam} to send funds to you. This information is for your reference.`
            }
            className="text-gray-400/30 transition-all duration-500 hover:text-gray-400"
          >
            <InfoIcon className="h-4 w-4" />
          </ToolTip>
        </span>
      </div>

      <AnimatePresence>
        {(!!token || hide) && (
          <motion.div
            animate={{
              height: hide ? "0px" : "auto",
              opacity: hide ? 0 : 1,
              overflow: hide ? "hidden" : "visible",
              display: hide ? "none" : "block",
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            className="mt-3 rounded-xl border border-gray-800/50 bg-eerie-black p-4 font-dosis tracking-wider text-gray-300"
          >
            {<PaymentDetails order={order} />}
          </motion.div>
        )}
      </AnimatePresence>

      {!token && (
        <div className="mt-3 flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-yellow-800/30 bg-yellow-500/10 p-4 tracking-wider text-gray-300">
          <InfoIcon className="h-5 w-5 text-yellow-300" />
          <p className="text-sm">
            {isPayer && `Link your wallet to reveal the ${whoiam}'s payment details`}
            {!isPayer && "Link your wallet to reveal your payment details"}
          </p>
        </div>
      )}
    </div>
  );
}
