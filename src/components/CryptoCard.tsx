import React from 'react';
import { Link } from 'react-router-dom';
import { useCryptoStore } from '../store/useCryptoStore'; // Importamos el store

interface CryptoCardProps {
  id: string;
  name: string;
  price: number;
}

export const CryptoCard: React.FC<CryptoCardProps> = ({ id, name, price }) => {
  // Usamos los selectores del store tal como pide la consigna
  const isFavorite = useCryptoStore((state) => state.isFavorite(id));
  const toggleFavorite = useCryptoStore((state) => state.toggleFavorite);

  return (
    <div className="crypto-card" style={{ border: '1px solid #444', padding: '1rem', borderRadius: '8px', margin: '1rem 0', textAlign: 'center', position: 'relative' }}>
      
      {/* Botón de favoritos */}
      <button 
        onClick={() => toggleFavorite(id)} 
        style={{ 
          position: 'absolute', 
          top: '10px', 
          right: '10px', 
          background: 'transparent', 
          border: 'none', 
          fontSize: '1.2rem', 
          cursor: 'pointer' 
        }}
        title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        {isFavorite ? '★' : '☆'}
      </button>

      <h3 style={{ margin: '0.5rem 0' }}>{name}</h3>
      <p style={{ margin: '0.5rem 0' }}>Precio: ${price.toLocaleString()} USD</p>
      <Link to={`/criptomonedas/${id}`} style={{ color: '#646cff', textDecoration: 'underline' }}>
        Ver detalle
      </Link>
    </div>
  );
};