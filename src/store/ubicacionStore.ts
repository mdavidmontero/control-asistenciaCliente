// src/store/useUbicacionStore.ts
import { create } from "zustand";

type Coords = { lat: number; lng: number };

interface UbicacionState {
  coords: Coords | null;
  cargarUbicacion: () => void;
}

export const useUbicacionStore = create<UbicacionState>((set) => ({
  coords: null,
  cargarUbicacion: () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        set({
          coords: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          },
        });
      },
      () => alert("Debes permitir acceso a tu ubicación")
    );
  },
}));
