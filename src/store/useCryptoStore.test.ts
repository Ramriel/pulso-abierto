import { describe, it, expect, beforeEach } from 'vitest';
import { useCryptoStore } from './useCryptoStore';

describe('useCryptoStore - Favoritos', () => {
  beforeEach(() => {
    // Limpiamos los favoritos antes de cada prueba
    useCryptoStore.setState({ favorites: [] });
  });

  it('debería permitir agregar y quitar una criptomoneda de favoritos', () => {
    const store = useCryptoStore.getState();

    // Al inicio está vacío
    expect(store.favorites).toHaveLength(0);

    // Agregamos bitcoin
    store.toggleFavorite('bitcoin');
    expect(useCryptoStore.getState().favorites).toContain('bitcoin');
    expect(useCryptoStore.getState().isFavorite('bitcoin')).toBe(true);

    // Quitamos bitcoin
    store.toggleFavorite('bitcoin');
    expect(useCryptoStore.getState().favorites).not.toContain('bitcoin');
    expect(useCryptoStore.getState().isFavorite('bitcoin')).toBe(false);
  });
});