import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import SearchControls from './components/SearchControls';
import BreweryList from './components/BreweryList';
import BreweryDetails from './components/BreweryDetails';

function App() {

  const [breweries, setBreweries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState(''); // search text
  const [typeFilter, setTypeFilter] = useState('all'); // brevery_type
  const [sortOrder, setSortOrder] = useState('name-asc'); 
  const [favorites, setFavorites] = useState([]); // IDs
  const [selected, setSelected] = useState(null); // details
  const [showFavorites, setShowFavorites] = useState(false)

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchBreweries = async () => {
      try {
        const response = await fetch('https://api.openbrewerydb.org/v1/breweries')
        if (!response.ok) throw new Error(`HTTP ${response.status}`)

        const json = await response.json()
        setBreweries(json);
      } catch (err) {
        setError(err.message || 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchBreweries()
  }, []);

  // store favs id
  const toggleFavorite=(id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  const clear = () => {
    setSelected(null)
    setSortOrder("name-asc")
    setTypeFilter('all')
    setQuery('')
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />

      <main className="max-w-6xl mx-auto p-4">
        <SearchControls
          query={query}
          setQuery={setQuery}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          clearSelection={clear}
          showFavorites={showFavorites}
          setShowFavorites={setShowFavorites}
          favorites={favorites}
        />

        {loading && <p className="text-center py-6">Loading data...</p>}
        {error && <p className="text-center text-red-600 py-6">Error: {error}</p>}

        {selected && (
          <div className="mt-6">
            <BreweryDetails brewery={selected} isFavorite={favorites.includes(selected.id)} toggleFavorite={toggleFavorite} />
            <div className="mt-4">
              <button
                className="px-4 py-2 mb-4 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setSelected(null)}
              >
                Close details
              </button>
            </div>
          </div>
        )}

        {!loading && !error && (
          <BreweryList
            breweries={breweries}
            query={query}
            typeFilter={typeFilter}
            sortOrder={sortOrder}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            setSelected={setSelected}
            showFavorites={showFavorites}
          />
        )}


      </main>
    </div>
  );
}

export default App;

