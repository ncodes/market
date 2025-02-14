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
}));

export default useStore;
