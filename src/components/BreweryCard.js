
export default function BreweryCard({ brewery, isFavorite, toggleFavorite, setSelected }) {
  return (
    <div className="brevery-card bg-white p-4 rounded shadow hover:shadow-md transition">
      <h2 className="text-lg font-semibold">{brewery.name || '—'}</h2>
      <p className="text-sm text-gray-600">Type: {brewery.brewery_type || '—'}</p>
      <p className="text-sm text-gray-600">Location: {brewery.city || '—'}, {brewery.state || '—'}</p>
      <p className="text-sm text-gray-600">Website: {brewery.website_url ? <a className="text-indigo-600" href={brewery.website_url} target="_blank" rel="noreferrer">Visit</a> : '—'}</p>

      <div className="mt-3 flex items-center space-x-2">
        <button onClick={() => setSelected(brewery)} className="px-3 py-1 bg-gray-100 rounded">Details</button>
        <button onClick={() => toggleFavorite(brewery.id)} className={`px-3 py-1 rounded ${isFavorite ? 'bg-yellow-300' : 'bg-gray-100'}`}>
          {isFavorite ? 'Unfavorite' : 'Favorite'}
        </button>
      </div>
    </div>
  );
}
