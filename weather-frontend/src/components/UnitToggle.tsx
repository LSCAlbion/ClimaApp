import { useUnit } from '../contexts/UnitContext';

export function UnitToggle() {
  const { unit, toggleUnit } = useUnit();

  return (
    <button
      type="button"
      onClick={toggleUnit}
      title="Alternar entre Celsius e Fahrenheit"
      className="flex items-center bg-slate-800/90 border border-slate-700/60 rounded-full p-1 cursor-pointer transition-all hover:border-slate-500 shadow-md"
    >
      <span
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
          unit === 'C'
            ? 'bg-blue-600 text-white shadow'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        °C
      </span>
      <span
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
          unit === 'F'
            ? 'bg-blue-600 text-white shadow'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        °F
      </span>
    </button>
  );
}