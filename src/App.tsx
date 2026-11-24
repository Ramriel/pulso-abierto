import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchCryptoPrices } from './services/cryptoService';
import { cryptoPricesSchema } from './schemas/cryptoSchema';
import { CryptoCard } from './components/CryptoCard';
import { CryptoDetail } from './components/CryptoDetail';
import { CryptoSearchForm } from './components/CryptoSearchForm';
import { NotFound } from './components/NotFound';
import { useCryptoStore } from './store/useCryptoStore'; // 1. Importamos el store de Zustand

interface CryptoPricesMap {
  bitcoin: number;
  ethereum: number;
  solana: number;
}

interface CryptoItem {
  id: 'bitcoin' | 'ethereum' | 'solana';
  name: string;
  price: number;
}

function buildCryptoList(prices: CryptoPricesMap | null): CryptoItem[] {
  return [
    { id: 'bitcoin', name: 'Bitcoin', price: prices?.bitcoin ?? 0 },
    { id: 'ethereum', name: 'Ethereum', price: prices?.ethereum ?? 0 },
    { id: 'solana', name: 'Solana', price: prices?.solana ?? 0 },
  ];
}

function Home() {
  const [prices, setPrices] = useState<CryptoPricesMap | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para el filtrado controlado por el formulario
  const [filterQuery, setFilterQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // 2. Estado local para alternar la vista de solo favoritos y lectura del store
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const favorites = useCryptoStore((state) => state.favorites);

  const loadData = async () => {
    try {
      setLoading(true);
      const rawData = await fetchCryptoPrices();
      const parsedData = cryptoPricesSchema.parse(rawData);

      setPrices({
        bitcoin: parsedData.bitcoin.usd,
        ethereum: parsedData.ethereum.usd,
        solana: parsedData.solana.usd,
      });
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Error al obtener o validar los datos de criptomonedas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = (term: string, category: string) => {
    setFilterQuery(term.toLowerCase());
    setFilterCategory(category);
  };

  // Datos derivados: calculamos las criptomonedas a mostrar según los filtros activos
  const allCryptos = buildCryptoList(prices);

  const filteredCryptos = allCryptos.filter((crypto) => {
    const matchesQuery = crypto.name.toLowerCase().includes(filterQuery);
    const matchesCategory = filterCategory === 'all' || crypto.id === filterCategory;

    // 3. Aplicamos también el filtro de favoritos si está activado
    const matchesFavorites = !showOnlyFavorites || favorites.includes(crypto.id);

    return matchesQuery && matchesCategory && matchesFavorites;
  });

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '700px', margin: '0 auto' }}>
      <h1>Pulso Abierto - Criptomonedas</h1>
      <p style={{ marginBottom: '1.5rem' }}>Monitoreo en tiempo real y gestión avanzada</p>

      {/* Formulario controlado con validación Zod */}
      <CryptoSearchForm onSearch={handleSearch} />

      {/* 4. Botón interactivo para alternar la vista de favoritos */}
      <div style={{ margin: '1rem 0' }}>
        <button
          onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
          style={{
            background: showOnlyFavorites ? '#646cff' : '#252525',
            color: '#fff',
            border: '1px solid #646cff',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
        >
          {showOnlyFavorites ? '★ Ver todas las monedas' : '☆ Ver solo favoritos'}
        </button>
      </div>

      {loading && <p>Cargando cotizaciones...</p>}

      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          <p>{error}</p>
          <button onClick={loadData} style={{ marginTop: '0.5rem', padding: '0.4rem 0.8rem', cursor: 'pointer' }}>
            Volver a intentar
          </button>
        </div>
      )}

      {!loading && !error && prices && (
        <div>
          <h3>Resultados ({filteredCryptos.length})</h3>
          {filteredCryptos.length === 0 ? (
            <p style={{ color: '#aaa', fontStyle: 'italic', marginTop: '1rem' }}>
              No se encontraron resultados para los filtros aplicados.
            </p>
          ) : (
            filteredCryptos.map((crypto) => (
              <CryptoCard key={crypto.id} id={crypto.id} name={crypto.name} price={crypto.price} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/criptomonedas/:id" element={<CryptoDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;