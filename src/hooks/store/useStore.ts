import Chains, { ChainInfo } from "@jointlabs/meta";
import { create } from "zustand";
export interface IStore {
  user?: User;
  setUser: (user?: User) => void;

  token: string;
  setToken: (token: string) => void;

  browserCountryCode: string;
  setBrowserCountryCode: (code: string) => void;

  openSwapConfirmation: boolean;
  setOpenSwapConfirmation: (open: boolean) => void;

  openAdjustAmount: boolean;
  setOpenAdjustAmount: (open: boolean) => void;

  selectedChain: ChainInfo;
  setSelectedChain: (chain: ChainInfo) => void;
}

const useStore = create<IStore>((set) => ({
  user: undefined,
  setUser: (user?: User) => set({ user }),

  token: "",
  setToken: (token: string) => set({ token }),

  browserCountryCode: "",
  setBrowserCountryCode: (code: string) => set({ browserCountryCode: code }),

  openSwapConfirmation: false,
  setOpenSwapConfirmation: (open: boolean) => set({ openSwapConfirmation: open }),

  openAdjustAmount: false,
  setOpenAdjustAmount: (open: boolean) => set({ openAdjustAmount: open }),

  selectedChain: Chains[0],
  setSelectedChain: (chain: ChainInfo) => set({ selectedChain: chain }),
}));

export default useStore;
