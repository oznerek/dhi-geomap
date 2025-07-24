import { create } from "zustand";

interface PolygonState {
  polygonPoints: [number, number][];
  setPolygonPoints: (val: [number, number][]) => void;
}

export const usePolygonStore = create<PolygonState>((set) => ({
  polygonPoints: [],
  setPolygonPoints: (val) => set({ polygonPoints: val }),
}));

interface PolygonListState {
  polygonList: [number, number][][];
  setPolygonList: (val: [number, number][][]) => void;
}

export const usePolygonListStore = create<PolygonListState>((set) => ({
  polygonList: [],
  setPolygonList: (val) => set({ polygonList: val }),
}));

interface InitialMapState {
  initialMap: { longitude: number; latitude: number; zoom: number };
  setInitialMap: (val: {
    longitude: number;
    latitude: number;
    zoom: number;
  }) => void;
}

export const useInitialMapStore = create<InitialMapState>((set) => ({
  initialMap: { longitude: 19.2364, latitude: 52.1804, zoom: 6 },
  setInitialMap: (val) => set({ initialMap: val }),
}));

interface PointState {
  points: any;
  setPoints: (val: any) => void;
}

export const usePointStore = create<PointState>((set) => ({
  points: null,
  setPoints: (val) => set({ points: val }),
}));
