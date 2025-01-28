import { ToolTip } from "@/components/ToolTip";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useConnectorContext } from "@/hooks/connectors/useConnectorContext";
import { useAppealService } from "@/hooks/services/backend/useAppealService";
import { useFileService } from "@/hooks/services/backend/useFileService";
import { humanizeBytes } from "@/libs/helpers";
import { cn } from "@/libs/utils";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ImageIcon, InfoIcon, Loader2, PlusIcon, VideoIcon, XCircleIcon, XIcon } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { useOnClickOutside } from "usehooks-ts";
import { getPayer, isOrderRouter, isSellerOrBuyer } from "../../common/utils";
import { SwapOrderState } from "../../hooks/useSwapOrderLogic";

const defaultState: {
  dialogOpen: boolean;
  files: File[];
  fileHashes: string[];
  issue: string;
  description: string;
} = {
  dialogOpen: false,
  files: [],
  fileHashes: [],
  issue: "",
  description: "",
};

export function DrawerCreateAppeal({
  closeRequested,
  containerHeight,
  drawerRef,
  order,
}: {
  containerHeight?: number;
  drawerRef: React.RefObject<HTMLDivElement>;
  swapOrderState: SwapOrderState;
  order: Swap;
  closeRequested?: () => void;
}) {
  const { chainInfo } = useConnectorContext();
  const [state, setState] = useState({ ...defaultState });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { createAppeal } = useAppealService();
  const createAppealMut = useMutation({ mutationFn: createAppeal });
  const { uploadFile } = useFileService();
  const uploadMut = useMutation({ mutationFn: uploadFile });
  const canCreate = state.issue && state.description && state.files.length > 0 && !uploadMut.isPending;
  const isSending = uploadMut.isPending || createAppealMut.isPending;

  useOnClickOutside(drawerRef, () => {
    if (!state.dialogOpen) {
      closeRequested?.();
    }
  });

  const { address } = useConnectorContext();
  const payer = getPayer(order);
  const isPayer = payer === address;

  // Router and routing specific state
  const isRouter = isOrderRouter(order, address);
  let routes: PayRouterRoute[];
  let isFirstRoute = false;
  let routeIdx = 0;
  if (isRouter) {
    routes = order.payRouterRequest?.routes ?? [];
    const route = routes?.find((route) => route.owner == address);
    if (route) {
      routeIdx = routes?.findIndex((route) => route.owner == address) ?? 0;
      isFirstRoute = routeIdx == 0;
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (!fileInputRef.current) return;
    if (!e.target.files) return;

    // Each files cannot be more that 10MB in size
    for (const file of e.target.files) {
      const max = import.meta.env.VITE_FILE_UPLOAD_MAX_SIZE;
      if (file.size > parseInt(max)) {
        toast.error(`File too large (max: ${humanizeBytes(max)})`);
        fileInputRef.current.value = "";
        return;
      }
    }

    setState({ ...state, files: [...state.files, ...Array.from(e.target.files)] });

    fileInputRef.current.value = "";
  }

  function handleRemoveFile(idx: number) {
    setState({ ...state, files: state.files.filter((_, i) => i !== idx) });
  }

  async function uploadFiles() {
    if (!chainInfo?.queryName || !order) return;
    const hashes = [];
    for (const file of state.files) {
      const formData = new FormData();
      formData.append("file", file);
      hashes.push(
        await uploadMut.mutateAsync({
          net: chainInfo.queryName,
          orderId: order.orderId,
          data: formData,
        }),
      );
    }
    setState({ ...state, fileHashes: [...state.fileHashes, ...hashes] });
  }

  async function create() {
    try {
      if (!chainInfo?.queryName || !order) return;
      await uploadFiles();
      await createAppealMut.mutateAsync({
        net: chainInfo?.queryName,
        orderId: order.orderId,
        issue: state.issue,
        description: state.description,
        files: state.fileHashes,
      });

      toast.success("Appeal created successfully", {
        description: "Your appeal has been created. Our team will review it shortly.",
        position: "top-right",
      });

      closeRequested?.();
    } catch (error) {
      toast.error("Appeal Creation Failed", {
        description: (error as Error).message,
        position: "top-right",
      });
    }
  }

  return (
    <motion.div
      className="relative m-0 min-h-[100px] max-w-[650px] rounded-3xl py-4 pb-0 pt-2"
      animate={{ height: "auto" }}
    >
      <h2 className="mb-2 flex items-center justify-between px-4 font-medium tracking-wider text-white">
        <span className="relative">Create an appeal</span>
        <span className="flex items-center gap-2">
          <span>
            <Button
              variant="link"
              className="h-auto p-0 hover:bg-transparent"
              onClick={() => {
                closeRequested?.();
              }}
            >
              <XIcon className="h-5 w-5 cursor-pointer text-white opacity-30 transition-all duration-300 hover:opacity-100" />
            </Button>
          </span>
        </span>
      </h2>

      <div className="w-full overflow-auto p-3 px-4 pt-2" style={{ maxHeight: containerHeight }}>
        <Label className="mb-2 flex items-center text-sm font-light tracking-wide">
          Reason for Appeal
          <ToolTip tip="Select a reason for your appeal">
            <InfoIcon className="ml-1 h-3 w-3 text-gray-400" />
          </ToolTip>
        </Label>
        <Select
          onOpenChange={(open) => setState({ ...state, dialogOpen: open })}
          onValueChange={(value) => setState({ ...state, issue: value })}
          disabled={isSending}
        >
          <SelectTrigger className="input w-auto">
            <SelectValue placeholder="Select a reason" />
          </SelectTrigger>
          <SelectContent className="border-boulder/30 bg-eerie-black">
            <SelectGroup>
              {!isPayer && !isRouter && (
                <>
                  <SelectItem value={`The ${isSellerOrBuyer(order, address, true)} did not send the payment`}>
                    The {isSellerOrBuyer(order, address, true)} did not send the payment
                  </SelectItem>
                  <SelectItem
                    value={`Payment received but the ${isSellerOrBuyer(order, address, true)} did not pay the correct amount`}
                  >
                    Payment received but the {isSellerOrBuyer(order, address, true)} did not pay the correct amount
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </>
              )}

              {isPayer && !isRouter && (
                <>
                  <SelectItem value={`The ${isSellerOrBuyer(order, address, true)} claims to not receive the payment`}>
                    The {isSellerOrBuyer(order, address, true)} claims to not receive the payment
                  </SelectItem>
                  <SelectItem
                    value={`The ${isSellerOrBuyer(order, address, true)} is asking for more than the order amount`}
                  >
                    The {isSellerOrBuyer(order, address, true)} is asking for more than the order amount
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </>
              )}

              {isRouter && (
                <>
                  {isFirstRoute && (
                    <>
                      <SelectItem value={`Did not receive payment from ${isSellerOrBuyer(order, payer, false)}`}>
                        Did not receive payment from {isSellerOrBuyer(order, payer, false)}
                      </SelectItem>
                      <SelectItem value={`The ${isSellerOrBuyer(order, payer, false)} did not send the correct amount`}>
                        The {isSellerOrBuyer(order, payer, false)} did not send the correct amount
                      </SelectItem>
                    </>
                  )}
                  {!isFirstRoute && (
                    <>
                      <SelectItem value={`Did not receive payment from Router #${routeIdx - 1}`}>
                        Did not receive payment from Router #{routeIdx - 1}
                      </SelectItem>
                      <SelectItem value={`Router #${routeIdx - 1} did not send the correct amount`}>
                        Router #{routeIdx - 1} did not send the correct amount
                      </SelectItem>
                    </>
                  )}
                  <SelectItem value="other">Other</SelectItem>
                </>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Label className="mt-5 flex items-center text-sm font-light tracking-wide">
          Description (Mandatory)
          <ToolTip tip="Provide a detailed description of the issue">
            <InfoIcon className="ml-1 h-3 w-3 text-gray-400" />
          </ToolTip>
        </Label>
        <Textarea
          placeholder="Describe the issue as detailed as possible."
          className="input mt-2 min-h-32 resize-none"
          value={state.description}
          onChange={(e) => setState({ ...state, description: e.target.value })}
          disabled={isSending}
        />

        <Label className="mt-5 flex items-center text-sm font-light tracking-wide">
          Upload Proof
          <ToolTip tip="Upload photos and videos to support your appeal.">
            <InfoIcon className="ml-1 h-3 w-3 text-gray-400" />
          </ToolTip>
        </Label>
        <p className="py-2 text-xs tracking-wider text-muted">
          Upload picture/video of your bank statement, payment receipt or any other evidence to support your appeal.
          Upload size limit is 10MB per file.
        </p>

        <Input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/png, image/jpeg, image/jpg, video/mp4, video/quicktime, video/wmv"
          onChange={handleFileChange}
          disabled={isSending}
        />
        <div className="mt-2 flex gap-2">
          {state.files.length < 4 && (
            <Button
              variant="ghost"
              disabled={isSending}
              className="m-0 h-14 w-14 rounded border border-boulder/30 p-0"
              onClick={() => {
                fileInputRef.current?.click();
              }}
            >
              <PlusIcon className="h-6 w-6" />
            </Button>
          )}
          {state.files.map((file, idx) => (
            <ToolTip tip={file.name} key={file.name}>
              <div
                className={cn(
                  "relative flex h-14 w-14 cursor-auto items-center justify-center rounded-lg border border-boulder/60",
                  { "cursor-not-allowed opacity-60": isSending },
                )}
                key={file.name}
              >
                {file.type.startsWith("image/") && <ImageIcon className="h-6 w-6 text-blue-400" />}
                {file.type.startsWith("video/") && <VideoIcon className="h-6 w-6 text-green-400" />}
                <Button
                  disabled={isSending}
                  variant="ghost"
                  className="h-auto p-0"
                  onClick={() => handleRemoveFile(idx)}
                >
                  <XCircleIcon className="absolute right-0 top-0 mr-0.5 mt-0.5 h-3 w-3 text-boulder/80 hover:text-boulder" />
                </Button>
              </div>
            </ToolTip>
          ))}
        </div>

        <Button
          variant="secondary"
          disabled={!canCreate || isSending}
          onClick={create}
          className={cn(
            "mt-5 w-full rounded-2xl text-xl font-medium text-black duration-500 animate-in fade-in-10 hover:scale-[1.01]",
            "disabled:bg-alice-blue/90 disabled:text-black disabled:hover:bg-alice-blue",
          )}
        >
          {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create"}
        </Button>
      </div>
    </motion.div>
  );
}
