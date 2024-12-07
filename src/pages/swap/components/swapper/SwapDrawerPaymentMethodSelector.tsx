import { ConfirmDialog } from "@/components/ConfirmDialog";
import { FormInput } from "@/components/FormInput";
import { Avatar } from "@/components/avatar/Avatar";
import LinkAccountButton from "@/components/header/LinkAccountButton";
import { ToolTip } from "@/components/toolTip";
import { Button } from "@/components/ui/button.tsx";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { usePaymentService } from "@/hooks/services/backend/usePaymentService";
import { useSession } from "@/hooks/useSession";
import { cn } from "@/libs/utils";
import { PaymentMethods, getLogoUrl, getPaymentMethod } from "@jointlabs/meta";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronsUpDown,
  Info,
  InfoIcon,
  Loader2,
  PlusIcon,
  Trash,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useOnClickOutside } from "usehooks-ts";
import { z } from "zod";
import { Checkbox } from "../../../../components/ui/checkbox";
import { useConnectorContext } from "../../../../hooks/connectors/useConnectorContext";
import { useUserService } from "../../../../hooks/services/backend/useUserService";
import { logError } from "../../../../libs/helpers";

const defaultState = {
  addMode: false,
};

export function SwapDrawerPaymentMethodSelector({
  closeRequested,
  containerHeight,
  drawerRef,
  onSelected,
}: {
  containerHeight?: number;
  routesList: PayRouterRoute[][];
  drawerRef: React.RefObject<HTMLDivElement>;
  closeRequested?: () => void;
  onSelected?: (pm: PaymentMethod) => void;
}) {
  const { token } = useSession();
  const { chainInfo } = useConnectorContext();
  const [state, setState] = useState({ ...defaultState });
  const [modalOpen, setModalOpen] = useState(false);
  const { getPaymentMethods, deletePaymentMethod } = usePaymentService();
  const { updateDefaultPaymentMethod } = useUserService();
  const queryClient = useQueryClient();

  useOnClickOutside(drawerRef, () => {
    if (!modalOpen) {
      closeRequested?.();
    }
  });

  const qryPaymentMethods = useQuery({
    queryKey: ["paymentMethods", { network: chainInfo?.queryName }],
    queryFn: getPaymentMethods,
    enabled: !!token,
  });

  const mutDeletePaymentMethod = useMutation({
    mutationFn: deletePaymentMethod,
    onSuccess: () => {
      qryPaymentMethods.refetch();
      queryClient.refetchQueries({ queryKey: ["authUser"] });
    },
  });

  const mutUpdateDefaultPaymentMethod = useMutation({
    mutationFn: updateDefaultPaymentMethod,
    onSuccess: () => {
      qryPaymentMethods.refetch();
      queryClient.refetchQueries({ queryKey: ["authUser"] });
    },
  });

  return (
    <motion.div className="relative m-0 min-h-[100px] max-w-[650px] rounded-3xl py-4 pb-0" animate={{ height: "auto" }}>
      <h2 className="mb-2 flex items-center justify-between px-4 font-medium tracking-wider text-white">
        <span className="relative">Select a payment method</span>
        <span className="flex items-center gap-2">
          {!state.addMode && (
            <span>
              <Button
                variant="outline"
                className="relative -top-0.5 h-auto gap-1 border-none bg-mirage p-1 px-3 hover:bg-baltic-sea hover:text-gray-100"
                onClick={() => setState({ ...state, addMode: true })}
              >
                <PlusIcon className="h-5 w-5 cursor-pointer text-gray-100 transition-all duration-300" />
              </Button>
            </span>
          )}
          {state.addMode && (
            <span>
              <Button
                variant="outline"
                className="relative -top-0.5 h-auto gap-1 border-none bg-mirage p-1 px-3 hover:bg-baltic-sea hover:text-gray-100"
                onClick={() => setState({ ...state, addMode: false })}
              >
                <ChevronLeft className="h-5 w-5 cursor-pointer text-gray-100 transition-all duration-300" /> Back
              </Button>
            </span>
          )}
          <span>
            <Button
              variant="ghost"
              className="h-auto p-0"
              onClick={() => {
                closeRequested?.();
              }}
            >
              <XIcon className="h-5 w-5 cursor-pointer text-white opacity-30 transition-all duration-300 hover:opacity-100" />
            </Button>
          </span>
        </span>
      </h2>

      <div className="w-full overflow-auto" style={{ maxHeight: containerHeight }}>
        {!state.addMode && qryPaymentMethods.data?.length == 0 && (
          <div className="relative -top-5 flex h-[200px] items-center justify-center">
            <Button
              variant="secondary"
              className="hover:scale-[1.01]/80 hover:text-gray-800"
              onClick={() => setState({ ...state, addMode: true })}
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </div>
        )}

        {!state.addMode && (qryPaymentMethods.data || []).length > 0 && (
          <div className="mx-2 flex min-h-[200px] flex-col gap-0.5 pt-1">
            {qryPaymentMethods.data?.map((pm) => (
              <PaymentMethodItem
                key={pm.id}
                pm={pm}
                setModalOpen={setModalOpen}
                mutDeletePaymentMethod={mutDeletePaymentMethod}
                onSelected={(pm) => {
                  mutUpdateDefaultPaymentMethod.mutateAsync(pm.id);
                  onSelected?.(pm);
                  closeRequested?.();
                }}
              />
            ))}
          </div>
        )}

        {state.addMode && (
          <AddPaymentMethod
            existingPaymentMethods={qryPaymentMethods.data ?? []}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            onSuccess={() => {
              qryPaymentMethods.refetch();
              setState({ ...state, addMode: false });
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

const addPaymentMethodDefaultState = {
  type: 1,
  name: "",
  accountId: "",
  bankAccountName: "",
  bankAccountNumber: "",
  routingNumber: "",
  swiftCode: "",
  additionalInfo: "",
  errMsg: "",
  errField: "",
  isLoading: false,
  useAsDefault: true,
  isLinking: false,
};

const paymentMethods = PaymentMethods.map((method) => ({
  value: method.name,
  label: method.name,
  logoUrl: method.logoUrl,
}));

const maxAdditionalInfoLength = 64;

const schemaBank = z.object({
  name: z.string().trim().min(1, "Name is required"),
  bankAccountName: z.string().trim().min(1, "Account name is required"),
  bankAccountNumber: z
    .string()
    .regex(/^[0-9]+$/, "Account number must be a number")
    .min(1, "Account number is required")
    .refine((data) => data.length >= 8, "Account number is too short"),
  routingNumber: z
    .string()
    .regex(/^([0-9]+)?$/, "Routing number must be a number")
    .refine((data) => data.length == 0 || data.length >= 6, "Routing number is too short"),
  swiftCode: z.string().regex(/^([0-9A-Za-z]{8}|[0-9A-Za-z]{11})?$/, "Swift code is invalid"),
  additionalInfo: z.string().max(maxAdditionalInfoLength, `Maximum ${maxAdditionalInfoLength} characters allowed`),
});

const schemaWallet = z.object({
  name: z.string(),
  accountId: z.string().min(1, "Account ID is required"),
  additionalInfo: z.string().max(maxAdditionalInfoLength, `Maximum ${maxAdditionalInfoLength} characters allowed`),
});

function AddPaymentMethod({
  modalOpen,
  setModalOpen,
  onSuccess,
  existingPaymentMethods,
}: {
  modalOpen: boolean;
  existingPaymentMethods: PaymentMethod[];
  setModalOpen: (open: boolean) => void;
  onSuccess: () => void;
}) {
  const { chainInfo } = useConnectorContext();
  const [state, setState] = useState({ ...addPaymentMethodDefaultState });
  const pm = getPaymentMethod(state.name);
  const { token } = useSession();
  const { addPaymentMethod } = usePaymentService();
  const mutAddPaymentMethod = useMutation({
    mutationFn: addPaymentMethod,
  });

  async function doAddPaymentMethod() {
    try {
      if (!chainInfo) return;

      const pm = getPaymentMethod(state.name);
      if (!pm) return;

      const parsed = pm.type === 1 ? schemaBank.safeParse({ ...state }) : schemaWallet.safeParse({ ...state });
      if (!parsed.success) {
        const issue = parsed.error.issues[0];
        setState({ ...state, errMsg: issue.message, errField: issue.path[0] as string });
        return;
      } else {
        setState({ ...state, errMsg: "", errField: "" });
      }

      setState({ ...state, isLoading: true });

      await mutAddPaymentMethod.mutateAsync({
        net: chainInfo.queryName,
        name: state.name,
        accountId: state.accountId,
        bankAccountName: state.bankAccountName,
        bankAccountNumber: state.bankAccountNumber,
        routingNumber: state.routingNumber,
        swiftCode: state.swiftCode,
        additionalInfo: state.additionalInfo,
        useAsDefault: state.useAsDefault,
      });

      setState({ ...state, isLoading: false });

      toast.success("Success", {
        description: "Payment method added successfully",
        position: "top-right",
      });

      onSuccess?.();
    } catch (error) {
      toast.error("Server Error", {
        description: "Unable to add payment method",
        position: "top-right",
      });
      logError(error);
      setState({ ...state, isLoading: false });
    }
  }

  return (
    <div className="mt-2 flex min-h-[200px] flex-col gap-4 px-4" onClick={(e) => e.stopPropagation()}>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <Label className="flex items-center gap-1 font-light tracking-wider text-gray-300">
            <span>Bank or Wallet</span>
            <ToolTip
              tip="Select a bank or wallet from the list. Some banks operate in multiple countries, so make sure to select the one specific to your country or region. For example, CitiBank (US) and CitiBank (SG) represent branches in United States and Singapore respectively."
              className="text-gray-500 hover:text-gray-100"
            >
              <InfoIcon className="h-4 w-4" />
            </ToolTip>
            <span className="text-red-500">*</span>
          </Label>
          <Popover open={modalOpen} onOpenChange={setModalOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={modalOpen}
                className={cn("justify-between rounded-xl border-0 bg-baltic-sea px-2.5 hover:text-gray-100", {
                  "ring-2 ring-boulder": modalOpen,
                })}
              >
                <span
                  className={cn("flex items-center font-normal text-muted-foreground", {
                    "text-gray-200": !!state.name,
                  })}
                >
                  {state.name && (
                    <Avatar
                      className="mr-2 h-5 w-5 rounded-full"
                      fallbackClassName="h-5 w-5 mr-2"
                      fallback={paymentMethods.find((pm) => pm.value === state.name)?.label.substring(0, 1) ?? ""}
                      rootClassName="h-5"
                      src={paymentMethods.find((pm) => pm.value === state.name)?.logoUrl ?? ""}
                    />
                  )}

                  {state.name ? paymentMethods.find((pm) => pm.value === state.name)?.label : "Choose"}
                </span>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="border-boulder/50 bg-mirage p-0">
              <Command className="bg-mirage text-white">
                <div className="border-b border-boulder/50">
                  <CommandInput placeholder="Search a bank or wallet provider" className="" />
                </div>
                <CommandList>
                  <CommandEmpty>No payment method found.</CommandEmpty>
                  <CommandGroup>
                    {paymentMethods.map((pm) => (
                      <CommandItem
                        key={pm.value}
                        value={pm.value}
                        className="rounded-lg bg-mirage px-1 text-white"
                        onSelect={(currentValue) => {
                          setState({
                            ...state,
                            name: currentValue === state.name ? "" : currentValue,
                          });
                          setModalOpen(false);
                        }}
                      >
                        <Avatar
                          className="mr-2 h-5 w-5 rounded-full"
                          fallbackClassName="h-5 w-5 mr-2"
                          fallback={pm.label.substring(0, 1)}
                          rootClassName="h-5"
                          src={pm.logoUrl ?? ""}
                        />
                        {pm.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {pm && pm.type == 2 && (
          <div className="flex flex-col gap-2">
            <FormInput
              fieldName="accountId"
              value={state.accountId}
              label="Acoount ID"
              tip="The account ID is the unique identifier for your account with the selected bank or wallet provider. It can be string of numbers, letters, email address or phone number."
              placeholder="000123456789 "
              onChange={(e) => setState({ ...state, accountId: e.target.value })}
              errMsg={state.errMsg}
              errField={state.errField}
            />
          </div>
        )}

        {(!pm || pm.type == 1) && (
          <div className="contents">
            <div className="flex flex-col gap-2">
              <FormInput
                fieldName="bankAccountName"
                value={state.bankAccountName}
                label="Bank Account Name"
                tip="The full bank account name as it appears on your bank statement. It should match your KYC name if you have completed one."
                placeholder="John Doe"
                onChange={(e) => setState({ ...state, bankAccountName: e.target.value })}
                required
                errMsg={state.errMsg}
                errField={state.errField}
              />
            </div>

            <div className="flex flex-col gap-2">
              <FormInput
                fieldName="bankAccountNumber"
                value={state.bankAccountNumber}
                label="Bank Account Number"
                tip="The bank account number provided by the bank."
                placeholder="1234567890"
                onChange={(e) => setState({ ...state, bankAccountNumber: e.target.value })}
                required
                errMsg={state.errMsg}
                errField={state.errField}
              />
            </div>

            <div className="flex flex-col gap-2">
              <FormInput
                fieldName="routingNumber"
                value={state.routingNumber}
                label="Routing Number"
                tip="The bank routing number is a code used to identify the bank and the branch where the account is held. It is used for domestic payments."
                placeholder="1234567890"
                onChange={(e) => setState({ ...state, routingNumber: e.target.value })}
                errMsg={state.errMsg}
                errField={state.errField}
              />
            </div>

            <div className="flex flex-col gap-2">
              <FormInput
                fieldName="swiftCode"
                value={state.swiftCode}
                label="Swift Code"
                tip="The SWIFT code is a unique identifier for the bank and the branch where the account is held. It is used for international payments."
                placeholder="1234567890"
                onChange={(e) => setState({ ...state, swiftCode: e.target.value })}
                errMsg={state.errMsg}
                errField={state.errField}
              />
            </div>
          </div>
        )}
        <div className="col-span-2 flex flex-col gap-2">
          <FormInput
            fieldName="additionalInfo"
            value={state.additionalInfo}
            label="Additional Info"
            topRightText={
              state.additionalInfo ? state.additionalInfo.length.toString() + "/" + maxAdditionalInfoLength : ""
            }
            tip="Provider any additional information or instructions for the counterparty."
            placeholder="Do this and that..."
            onChange={(e) =>
              setState({ ...state, additionalInfo: e.target.value.substring(0, maxAdditionalInfoLength) })
            }
            errMsg={state.errMsg}
            errField={state.errField}
          />
        </div>
      </div>

      {existingPaymentMethods.length > 0 && (
        <div className="flex items-center gap-2">
          <Checkbox
            id="terms"
            checked={state.useAsDefault}
            onCheckedChange={(checked) => setState({ ...state, useAsDefault: checked as boolean })}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Use as default
          </label>
        </div>
      )}

      <div>
        {token && (
          <Button
            variant="secondary"
            onClick={doAddPaymentMethod}
            disabled={!state.name || state.isLoading}
            className={cn(
              "mb-3 h-[55px] w-full rounded-2xl text-xl font-medium text-black duration-500 animate-in fade-in-10 hover:scale-[1.01]",
              {},
            )}
          >
            {!state.isLoading && "Add"}
            {state.isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          </Button>
        )}

        {!token && (
          <LinkAccountButton onLoading={(loading) => setState({ ...state, isLinking: loading })}>
            <Button
              variant="secondary"
              className={cn(
                "mb-3 h-[55px] w-full rounded-2xl text-xl font-medium text-black duration-500 animate-in fade-in-10 hover:scale-[1.01]",
              )}
              disabled={state.isLinking}
            >
              {!state.isLinking && "Link Wallet"}
              {state.isLinking && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            </Button>
          </LinkAccountButton>
        )}
      </div>
    </div>
  );
}

function PaymentMethodItem({
  pm,
  mutDeletePaymentMethod,
  onSelected,
  setModalOpen,
}: {
  pm: PaymentMethod;
  mutDeletePaymentMethod: any;
  onSelected: (pm: PaymentMethod) => void;
  setModalOpen: (open: boolean) => void;
}) {
  const { token } = useSession();
  return (
    <Button
      variant="ghost"
      key={pm.id}
      className={cn(
        "flex h-auto w-full cursor-pointer items-center justify-between rounded-3xl px-2 py-2 text-left transition-all duration-300 hover:scale-[1.01] hover:bg-baltic-sea/50 hover:text-white",
        {
          "scale-[1.01] bg-baltic-sea/70 text-white": pm.isDefault,
        },
      )}
      onClick={() => {
        if (pm.isDefault) return;
        onSelected?.(pm);
      }}
    >
      <div className="flex items-center">
        <Avatar
          className="mr-2 h-6 w-6 rounded-full"
          fallbackClassName="h-6 w-6 mr-2"
          fallback={pm.name.substring(0, 1)}
          rootClassName="h-6"
          src={getLogoUrl(pm.name) || ""}
        />
        <span className="text-sm">{pm.name}</span>
        {pm.type == 1 && (
          <>
            <span className="ml-2 text-xs text-gray-400">
              {pm.bankAccountName} {pm.bankAccountNumber}
            </span>
            {pm.additionalInfo && (
              <span className="ml-2 text-xs text-gray-400">
                <ToolTip tip={pm.additionalInfo}>
                  <Info className="h-4 w-4" />
                </ToolTip>
              </span>
            )}
          </>
        )}
        {pm.type == 2 && (
          <>
            <span className="ml-2 text-xs text-gray-400">{pm.accountId}</span>
            {pm.additionalInfo && (
              <span className="ml-2 text-xs text-gray-400">
                <ToolTip tip={pm.additionalInfo}>
                  <Info className="h-4 w-4" />
                </ToolTip>
              </span>
            )}
          </>
        )}
      </div>
      <div className="flex items-center">
        <span className="flex items-center gap-3">
          {pm.isDefault && (
            <span>
              <ToolTip tip="Default payment method">
                <CheckCircle2 className="h-4 w-4 text-light-green" />
              </ToolTip>
            </span>
          )}

          {!!token && (
            <span>
              <ConfirmDialog
                tip="Delete"
                title="Delete this payment method?"
                description="Are you sure?"
                confirmBtnText="Delete"
                cancelBtnText="Cancel"
                onOpenChange={(open) => {
                  setModalOpen(open);
                }}
                onConfirm={() => {
                  mutDeletePaymentMethod.mutateAsync({ id: pm.id });
                }}
              >
                <a href="#" className="opacity-80 transition-all duration-300 hover:opacity-100">
                  <Trash className="relative h-4 w-4 text-gray-500" />
                </a>
              </ConfirmDialog>
            </span>
          )}
        </span>
      </div>
    </Button>
  );
}
