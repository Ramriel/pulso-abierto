import React, { useState } from 'react';
import { cryptoFormSchema } from '../schemas/cryptoSchema';

interface CryptoSearchFormProps {
  onSearch: (searchTerm: string, selectedCrypto: string) => void;
}

export const CryptoSearchForm: React.FC<CryptoSearchFormProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('all');
  const [errors, setErrors] = useState<{ searchTerm?: string; selectedCrypto?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validamos con Zod usando safeParse
    const result = cryptoFormSchema.safeParse({ searchTerm, selectedCrypto });

    if (!result.success) {
      // Extraemos los errores de Zod y los asignamos al estado local
      const fieldErrors: { searchTerm?: string; selectedCrypto?: string } = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as 'searchTerm' | 'selectedCrypto';
        fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Si pasa la validación, limpiamos errores y ejecutamos la acción
    setErrors({});
    onSearch(result.data.searchTerm, result.data.selectedCrypto);
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#252525', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #444' }}>
      <h3>Filtrar Criptomonedas</h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="searchTerm" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Buscar por nombre:
        </label>
        <input
          id="searchTerm"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Ej. Bit..."
          style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #666', background: '#1a1a1a', color: '#fff' }}
        />
        {errors.searchTerm && (
          <p style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.3rem' }}>
            ⚠️ {errors.searchTerm}
          </p>
        )}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="selectedCrypto" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Categoría / Opción:
        </label>
        <select
          id="selectedCrypto"
          value={selectedCrypto}
          onChange={(e) => setSelectedCrypto(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #666', background: '#1a1a1a', color: '#fff' }}
        >
          <option value="all">Todas las monedas</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="solana">Solana</option>
        </select>
        {errors.selectedCrypto && (
          <p style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.3rem' }}>
            ⚠️ {errors.selectedCrypto}
          </p>
        )}
      </div>

      <button
        type="submit"
        style={{ background: '#646cff', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Aplicar Filtro
      </button>
    </form>
  );
};