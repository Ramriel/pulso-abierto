import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCryptoStore } from '../store/useCryptoStore'; // 1. Importamos el store

export const CryptoDetail: React.FC = () => {
  // Capturamos el parámetro 'id' que viene en la URL (ej: bitcoin, ethereum, solana)
  const { id } = useParams<{ id: string }>();
  
  // Si no hay id, manejamos un valor por defecto seguro
  const cryptoId = id || '';

  // 2. Usamos los selectores del store de Zustand
  const isFavorite = useCryptoStore((state) => state.isFavorite(cryptoId));
  const toggleFavorite = useCryptoStore((state) => state.toggleFavorite);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ textTransform: 'capitalize', margin: 0 }}>Detalle de {id}</h2>
        
        {/* 3. Botón de favoritos en la vista de detalle */}
        <button 
          onClick={() => toggleFavorite(cryptoId)}
          style={{ 
            background: 'transparent', 
            border: '1px solid #646cff', 
            color: '#fff', 
            padding: '0.5rem 1rem', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          {isFavorite ? '★ Quitar de favoritos' : '☆ Agregar a favoritos'}
        </button>
      </div>

      <div style={{ border: '1px solid #444', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem', background: '#252525' }}>
        <p style={{ fontSize: '1.1rem', margin: '0.5rem 0', textTransform: 'capitalize' }}>
          Estás visualizando la información detallada de la criptomoneda: <strong>{id}</strong>
        </p>
        <p style={{ color: '#aaa', fontSize: '0.9rem', marginTop: '1rem' }}>
          Vista de detalle generada mediante rutas dinámicas y parámetros de React Router.
        </p>
      </div>

      <br />
      <Link to="/" style={{ color: '#646cff', textDecoration: 'underline', display: 'inline-block', marginTop: '1rem' }}>
        ← Volver al inicio
      </Link>
    </div>
  );
};