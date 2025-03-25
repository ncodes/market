import { defaultNetwork } from "@/constants";
import Chains from "@jointlabs/meta";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const defaultChain = Chains.find((chain) => chain.queryName == defaultNetwork) ?? Chains[0];