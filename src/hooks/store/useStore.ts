import { create } from "zustand";
import { User } from "../../types/api";
export interface IStore {
  user?: User;
  setUser: (user: User) => void;

  token: string;
  setToken: (token: string) => void;
}

const useStore = create<IStore>((set) => ({
  user: undefined,
  setUser: (user: User) => set({ user }),

  token: "",
  setToken: (token: string) => set({ token }),

}));

export default useStore;
