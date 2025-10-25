
export default function BreweryDetails({ brewery, isFavorite, toggleFavorite }) {
  if (!brewery) return null;

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{brewery.name}</h2>
          <p className="text-sm text-gray-600">{brewery.brewery_type} - {brewery.city}, {brewery.state}</p>
        </div>
        <div>
          <button onClick={() => toggleFavorite(brewery.id)} className={`px-3 py-1 rounded ${isFavorite ? 'bg-yellow-300' : 'bg-gray-100'}`}>
            {isFavorite ? 'Unfavorite' : 'Favorite'}
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p><strong>Address:</strong> {brewery.street || '—'}</p>
          <p><strong>City:</strong> {brewery.city || '—'}</p>
          <p><strong>State:</strong> {brewery.state || '—'}</p>
          <p><strong>Postal:</strong> {brewery.postal_code || '—'}</p>
        </div>

        <div>
          <p><strong>Phone:</strong> {brewery.phone || '—'}</p>
          <p><strong>Website:</strong> {brewery.website_url ? <a className="text-indigo-600" href={brewery.website_url} target="_blank" rel="noreferrer">Visit site</a> : '—'}</p>
          <p className="mt-2 text-sm text-gray-500">ID: {brewery.id}</p>
        </div>
      </div>
    </div>
  );
}
