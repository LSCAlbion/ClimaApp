import type { HourlyForecast as HourlyForecastType } from '../types/weather';
import { getWeatherIcon } from '../utils/weatherIcons';
import { Clock } from 'lucide-react';
import { useUnit } from '../contexts/UnitContext';

interface HourlyForecastProps {
  items: HourlyForecastType[];
}

export function HourlyForecast({ items }: HourlyForecastProps) {
  const { formatTemp } = useUnit();

  return (
    <section className="w-full max-w-md bg-slate-800/80 backdrop-blur-md rounded-3xl p-6 border border-slate-700/60 shadow-xl mt-4">
      <header className="flex items-center gap-2 mb-4 text-slate-300">
        <Clock className="w-4 h-4 text-blue-400" />
        <h3 className="text-sm font-semibold uppercase tracking-wider">
          Previsão por Horas
        </h3>
      </header>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {items.map((hour, index) => (
          <div
            key={`${hour.time}-${index}`}
            className="flex flex-col items-center justify-between min-w-[72px] bg-slate-900/50 p-3 rounded-2xl border border-slate-800 shrink-0 text-center"
          >
            <span className="text-xs text-slate-400 font-medium">
              {hour.time}
            </span>

            <div className="my-2">
              {getWeatherIcon(hour.conditionCode, 'w-8 h-8')}
            </div>

            <span className="text-sm font-bold text-white">
              {formatTemp(hour.temp)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}