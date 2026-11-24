import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchCryptoPrices } from './cryptoService';

describe('cryptoService - Capa de Red', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('debería retornar los datos correctamente ante una respuesta HTTP exitosa', async () => {
    const mockResponse = { bitcoin: { usd: 50000 } };
    
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const data = await fetchCryptoPrices();
    expect(data).toEqual(mockResponse);
  });

  it('debería lanzar un error cuando la respuesta HTTP tiene ok: false', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    await expect(fetchCryptoPrices()).rejects.toThrow();
  });
});