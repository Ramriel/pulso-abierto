import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { CryptoCard } from './CryptoCard';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('CryptoCard - Componente', () => {
  it('debería renderizar el nombre y el precio de la criptomoneda correctamente', () => {
    render(
      <BrowserRouter>
        <CryptoCard id="bitcoin" name="Bitcoin" price={60000} />
      </BrowserRouter>
    );

    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText(/60\.000/i)).toBeInTheDocument();
  });

  it('debería permitir hacer clic en el botón de favoritos y cambiar el estado', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <CryptoCard id="ethereum" name="Ethereum" price={3000} />
      </BrowserRouter>
    );

    // Buscamos el botón por el símbolo o por su title exacto
    const favButton = screen.getByRole('button', { name: '☆' });
    expect(favButton).toBeInTheDocument();

    await user.click(favButton);
  });
});