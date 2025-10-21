import React from 'react';

export default function SearchControls({ query, setQuery, typeFilter, setTypeFilter, sortOrder, setSortOrder, randomBrewery, clearSelection }) {
  return (
    <div id='search-controls' className="bg-white p-4 rounded shadow mb-4">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, city, state..."
          className="flex-1 p-2 border rounded mb-2 md:mb-0"
        />

        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="p-2 border rounded">
          <option value="all">All types</option>
          <option value="micro">Micro</option>
          <option value="regional">Regional</option>
          <option value="brewpub">Brewpub</option>
          <option value="large">Large</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="p-2 border rounded">
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
          <option value="state-asc">State A-Z</option>
        </select>

        {/* <button onClick={randomBrewery} className="ml-auto px-3 py-2 bg-indigo-600 text-white rounded">Random</button> */}
        <button onClick={clearSelection} className="ml-2 px-3 py-2 bg-gray-200 rounded">Clear</button>
      </div>
    </div>
  );
}
