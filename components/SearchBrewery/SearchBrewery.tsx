// app/components/SearchBrewery.tsx
"use client";

import { useState, useEffect } from 'react';

interface Brewery {
  id: number,
  name: string,
  description: string
}

const SearchBrewery = () => {
  const [query, setQuery] = useState<string>('');
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [suggestions, setSuggestions] = useState<Brewery[]>([]);
  const [selectedBrewery, setSelectedBrewery] = useState<Brewery | null>(null);

  // Load all brewery data when mounting the component
  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const response = await fetch(`/api/breweries`);
        const data = await response.json();
        setBreweries(data); // Stocker toutes les données dans un état local
      } catch (error) {
        console.error("Erreur lors du chargement des données de brasseries:", error);
      }
    };

    fetchBreweries();
  }, []);

  // Filter suggestions locally based on query
  useEffect(() => {
    if (query) {
      const filteredSuggestions = breweries.filter(brewery =>
        brewery.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query, breweries]);

  const handleSelectSuggestion = (brewery: Brewery) => {
    setQuery(brewery.name);
    setSuggestions([]);
    setSelectedBrewery(brewery);
  };

  const handleSearchClick = () => {
    if (suggestions.length > 0) {
      handleSelectSuggestion(suggestions[0]);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSelectSuggestion(suggestions[0]);
      setSuggestions([]);
    }
  };

  return (
    <div className='mt-32'>
      <h1 className='mb-3 text-2xl font-semibold'>Rechercher une Brasserie</h1>
      <div className="flex flex-col items-center justify-center mt-32 relative w-full">
        <input
          type="text"
          placeholder="Entrez le nom d'une brasserie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          className="shadow appearance-none border border-blue-500 rounded w-50 py-3 px-5 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />

        <button
          onClick={handleSearchClick}
          className="bg-gray-500 hover:text-black text-white px-4 py-3 rounded hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Rechercher
        </button>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border text-black border-gray-300 rounded mt-5 w-100 z-10">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => handleSelectSuggestion(suggestion)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Show details of the selected brewery */}
      <div className="mt-5">
        {selectedBrewery ? (
          <div className='mb-32 grid text-center lg:mb-0 lg:max-w-md lg:grid-cols-1 lg:text-center mx-auto'>
            <h2 className='mb-10'>{selectedBrewery.name}</h2>
            <p className='w-50'>{selectedBrewery.description}</p>
          </div>
        ) : (
          <p>Aucune brasserie sélectionnée</p>
        )}
      </div>
    </div>
  );
};

export default SearchBrewery;
