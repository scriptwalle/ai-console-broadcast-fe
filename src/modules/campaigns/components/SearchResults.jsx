import React, { useState } from 'react';
import { Search, X, Plus } from 'lucide-react';

const SearchResults = ({ 
  type, 
  searchState = {}, 
  onSearch, 
  onSelect, 
  onLoadMore,
  onClear 
}) => {
  const [query, setQuery] = useState(searchState?.query || '');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query, 1);
  };

  const handleLoadMore = () => {
    if (searchState?.hasMore && !searchState?.loading) {
      const nextPage = Math.floor((searchState?.results?.length || 0) / 10) + 1;
      onSearch(searchState?.query || '', nextPage);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${type}...`}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
        </div>
        <button
          type="submit"
          disabled={searchState.loading}
          className="px-4 py-2 bg-slate-700 text-white rounded-xl hover:bg-slate-800 disabled:opacity-50"
        >
          Search
        </button>
        {searchState?.query && (
          <button
            type="button"
            onClick={() => { setQuery(''); onClear(); }}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      {searchState?.loading && (
        <div className="text-center py-4 text-slate-500">
          Searching...
        </div>
      )}

      {(searchState?.results || []).length > 0 && (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {(searchState?.results || []).map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              <div>
                <div className="font-medium">{item.name}</div>
                {item.phone && <div className="text-sm text-slate-600">{item.phone}</div>}
                {item.email && <div className="text-sm text-slate-600">{item.email}</div>}
                {item.contactCount && <div className="text-sm text-slate-600">{item.contactCount} contacts</div>}
              </div>
              <button
                onClick={() => onSelect(item)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ))}
          {searchState?.hasMore && (
            <button
              onClick={handleLoadMore}
              disabled={searchState?.loading}
              className="w-full py-2 text-center text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              {searchState?.loading ? 'Loading...' : 'Load More'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
