import { create } from "zustand";

interface TableState {
  showTable: boolean;
  setShowTable: (val: boolean) => void;
}

export const useShowTableStore = create<TableState>((set) => ({
  showTable: false,
  setShowTable: (val) => set({ showTable: val }),
}));
