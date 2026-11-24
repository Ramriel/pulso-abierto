import { z } from 'zod';

// Esquema para validar que el precio de cada criptomoneda sea un número positivo
export const cryptoItemSchema = z.object({
  usd: z.number().positive(),
});

// Esquema global para validar la respuesta completa de la API
export const cryptoPricesSchema = z.object({
  bitcoin: cryptoItemSchema,
  ethereum: cryptoItemSchema,
  solana: cryptoItemSchema,
});

export type CryptoPricesValidated = z.infer<typeof cryptoPricesSchema>;

// Esquema para validar el formulario de búsqueda (permite vacío para restablecer el filtro; si escribe algo, exige >= 2 caracteres)
export const cryptoFormSchema = z.object({
  searchTerm: z
    .string()
    .trim()
    .refine((val) => val.length === 0 || val.length >= 2, {
      message: 'El término de búsqueda debe tener al menos 2 caracteres.',
    }),
  selectedCrypto: z.enum(['all', 'bitcoin', 'ethereum', 'solana'], {
    message: 'Debe seleccionar una opción válida.',
  }),
});

export type CryptoFormValues = z.infer<typeof cryptoFormSchema>;