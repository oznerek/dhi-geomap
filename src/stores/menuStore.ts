import { create } from "zustand";

interface MenuState {
  openMenu: boolean;
  setOpenMenu: (val: boolean) => void;
}

export const useOpenMenu = create<MenuState>((set) => ({
  openMenu: false,
  setOpenMenu: (val) => set({ openMenu: val }),
}));
