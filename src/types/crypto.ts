export interface CryptoData {
  usd: number;
}

export interface CryptoPrices {
  bitcoin: CryptoData;
  ethereum: CryptoData;
  solana: CryptoData;
  [key: string]: CryptoData;
}