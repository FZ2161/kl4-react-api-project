import React, { useMemo } from 'react';
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

export default function BreweryList({ breweries, query, typeFilter, sortOrder, favorites, toggleFavorite, onSelect }) {
  // Filter and sort the breweries list using useMemo for perf
  const processed = useMemo(() => {
    let list = breweries.slice();

    // Filter by type
    if (typeFilter && typeFilter !== 'all') {
      list = list.filter((b) => b.brewery_type === typeFilter);
    }

    // Search
    list = list.filter((b) => matchesQuery(b, query));

    // Sort
    if (sortOrder === 'name-asc') list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    if (sortOrder === 'name-desc') list.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
    if (sortOrder === 'state-asc') list.sort((a, b) => (a.state || '').localeCompare(b.state || ''));

    return list;
  }, [breweries, query, typeFilter, sortOrder]);

  if (processed.length === 0) {
    return <p className="text-center py-8">Nie znaleziono wyników.</p>;
  }

  return (
    <div id='brevery-list' className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {processed.map((b) => (
        <BreweryCard key={b.id} brewery={b} isFavorite={favorites.includes(b.id)} toggleFavorite={toggleFavorite} onSelect={onSelect} />
      ))}
    </div>
  );
}
