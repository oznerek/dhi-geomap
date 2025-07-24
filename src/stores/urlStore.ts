import { create } from "zustand";

interface SearchState {
  showSearch: boolean;
  setShowSearch: (val: boolean) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  showSearch: false,
  setShowSearch: (val) => set({ showSearch: val }),
}));

interface LoadUrlState {
  showLoadUrl: boolean;
  setLoadUrl: (val: boolean) => void;
}

export const useLoadUrlStore = create<LoadUrlState>((set) => ({
  showLoadUrl: false,
  setLoadUrl: (val) => set({ showLoadUrl: val }),
}));

interface ErrorState {
  showError: { display: boolean; error: string };
  setShowError: (val: { display: boolean; error: string }) => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
  showError: { display: false, error: "" },
  setShowError: (val) => set({ showError: val }),
}));
