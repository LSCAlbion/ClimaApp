import type { DailyForecast as DailyForecastType } from '../types/weather';
import { getWeatherIcon } from '../utils/weatherIcons';
import { CalendarDays } from 'lucide-react';
import { useUnit } from '../contexts/UnitContext';

interface DailyForecastProps {
  items: DailyForecastType[];
}

export function DailyForecast({ items }: DailyForecastProps) {
  const { formatTemp } = useUnit();

  return (
    <section className="w-full max-w-md bg-slate-800/80 backdrop-blur-md rounded-3xl p-6 border border-slate-700/60 shadow-xl mt-4">
      <header className="flex items-center gap-2 mb-4 text-slate-300">
        <CalendarDays className="w-4 h-4 text-blue-400" />
        <h3 className="text-sm font-semibold uppercase tracking-wider">
          Previsão para os Próximos Dias
        </h3>
      </header>

      <div className="flex flex-col divide-y divide-slate-700/50">
        {items.map((day, index) => (
          <div
            key={`${day.date}-${index}`}
            className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
          >
            <span className="w-24 text-sm font-medium text-slate-200">
              {day.date}
            </span>

            <div className="flex items-center gap-2 flex-1 justify-center">
              {getWeatherIcon(day.conditionCode, 'w-6 h-6')}
              <span className="text-xs text-slate-400 hidden sm:inline">
                {day.condition}
              </span>
            </div>

            <div className="flex items-center gap-2 justify-end w-28 text-sm">
              <span className="font-semibold text-white">
                {formatTemp(day.maxTemp)}
              </span>
              <span className="text-slate-500 font-medium">
                {formatTemp(day.minTemp)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}