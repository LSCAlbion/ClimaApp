import { History, X } from 'lucide-react';

interface SearchHistoryProps {
  history: string[];
  onSelectCity: (city: string) => void;
  onClearHistory: () => void;
}

export function SearchHistory({ history, onSelectCity, onClearHistory }: SearchHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-md mt-3 flex items-center justify-between text-xs text-slate-400">
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <History className="w-3.5 h-3.5 text-slate-500 shrink-0" />
        <span className="shrink-0 text-slate-500 mr-1">Recentes:</span>

        {history.map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => onSelectCity(city)}
            className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white rounded-full border border-slate-700/50 transition-colors shrink-0 cursor-pointer"
          >
            {city}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onClearHistory}
        title="Limpar histórico"
        className="text-slate-500 hover:text-red-400 transition-colors ml-2 shrink-0 p-1 cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}