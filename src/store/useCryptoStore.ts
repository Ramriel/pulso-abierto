import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CryptoStore {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useCryptoStore = create<CryptoStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id: string) => {
        const { favorites } = get();
        const exists = favorites.includes(id);
        set({
          favorites: exists
            ? favorites.filter((fav) => fav !== id)
            : [...favorites, id],
        });
      },
      isFavorite: (id: string) => {
        return get().favorites.includes(id);
      },
    }),
    {
      name: 'crypto-favorites-storage', // Nombre para el localStorage del navegador
    }
  )
);