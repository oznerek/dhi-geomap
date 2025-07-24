import { create } from "zustand";

interface DrawState {
  drawPolygon: boolean;
  setDrawPolygon: (val: boolean) => void;
}

export const useDrawStore = create<DrawState>((set) => ({
  drawPolygon: false,
  setDrawPolygon: (val) => set({ drawPolygon: val }),
}));
