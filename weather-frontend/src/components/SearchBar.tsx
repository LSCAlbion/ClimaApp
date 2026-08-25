import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [cityInput, setCityInput] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedCity = cityInput.trim();
    
    if (!trimmedCity) return;
    
    onSearch(trimmedCity);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full max-w-md flex items-center gap-2 bg-slate-800 p-2 rounded-2xl border border-slate-700 shadow-md focus-within:border-blue-500 transition-colors"
    >
      <div className="pl-3 text-slate-400">
        <Search className="w-5 h-5" />
      </div>

      <input
        type="text"
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
        placeholder="Buscar cidade..."
        disabled={isLoading}
        className="w-full bg-transparent text-white placeholder-slate-400 px-2 py-1 outline-none text-sm disabled:opacity-50"
      />

      <button
        type="submit"
        disabled={isLoading || !cityInput.trim()}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors cursor-pointer"
      >
        {isLoading ? 'Buscando...' : 'Buscar'}
      </button>
    </form>
  );
}