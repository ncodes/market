import { create } from "zustand";
export interface IStore {
  user?: User;
  setUser: (user?: User) => void;

  token: string;
  setToken: (token: string) => void;

  browserCountryCode: string;
  setBrowserCountryCode: (code: string) => void;

  openConnectWalletSheet: boolean;
  setOpenConnectWalletSheet: (open: boolean) => void;
}

const useStore = create<IStore>((set) => ({
  user: undefined,
  setUser: (user?: User) => set({ user }),

  token: "",
  setToken: (token: string) => set({ token }),

  browserCountryCode: "",
  setBrowserCountryCode: (code: string) => set({ browserCountryCode: code }),

  openConnectWalletSheet: false,
  setOpenConnectWalletSheet: (shouldOpen: boolean) => set({ openConnectWalletSheet: shouldOpen }),
}));

export default useStore;
