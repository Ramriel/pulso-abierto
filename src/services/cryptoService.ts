import type { CryptoPrices } from '../types/crypto';

export async function fetchCryptoPrices(): Promise<CryptoPrices> {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd'
  );

  if (!response.ok) {
    throw new Error('Error al consultar la API de CoinGecko');
  }

  const data: CryptoPrices = await response.json();
  return data;
}