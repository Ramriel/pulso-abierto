import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div style={{ padding: '3rem', textAlign: 'center', color: '#fff', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
      <h2>Página no encontrada</h2>
      <p style={{ color: '#aaa', margin: '1rem 0' }}>
        La dirección que intentas visitar no existe o el recurso solicitado no está disponible.
      </p>
      <Link to="/" style={{ color: '#646cff', textDecoration: 'underline', fontSize: '1.1rem' }}>
        ← Volver al inicio
      </Link>
    </div>
  );
};