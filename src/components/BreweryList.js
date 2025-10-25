import React from 'react';
import BreweryCard from './BreweryCard';

// Helper: check if brewery matches query
function matchesQuery(brewery, q) {
  if (!q) return true;
  const s = q.toLowerCase();
  return (
    (brewery.name && brewery.name.toLowerCase().includes(s)) ||
    (brewery.city && brewery.city.toLowerCase().includes(s)) ||
    (brewery.state && brewery.state.toLowerCase().includes(s))
  );
}

export default function BreweryList({ breweries, query, typeFilter, sortOrder, favorites, toggleFavorite, setSelected, showFavorites }) {

  let processed = breweries.slice();

  if (typeFilter && typeFilter != 'all') {
    processed = processed.filter((b) => b.brewery_type === typeFilter)
  }

  processed = processed.filter((b) => matchesQuery(b, query));

  if (sortOrder === 'name-asc') processed.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  if (sortOrder === 'name-desc') processed.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
  if (sortOrder === 'state-asc') processed.sort((a, b) => (a.state || '').localeCompare(b.state || ''));

  if (showFavorites) {processed = processed.filter((b)=>favorites.includes(b.id))}

  if (processed.length == 0) {
    return <p className="text-center py-8">Nie znaleziono wyników.</p>;
  }

  return (
    <div id='brevery-list' className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {
        processed.map((b) => (
          <BreweryCard key={b.id} brewery={b} isFavorite={favorites.includes(b.id)} toggleFavorite={toggleFavorite} setSelected={setSelected}/>
        ))
      }
    </div>
  );
}
