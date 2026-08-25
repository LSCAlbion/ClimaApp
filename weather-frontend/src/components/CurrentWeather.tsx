import { Droplets, Wind, Thermometer } from 'lucide-react';
import type { WeatherData } from '../types/weather';
import { getWeatherIcon } from '../utils/weatherIcons';
import { useUnit } from '../contexts/UnitContext';

interface CurrentWeatherProps {
  data: WeatherData;
}

export function CurrentWeather({ data }: CurrentWeatherProps) {
  const { formatTemp } = useUnit();

  return (
    <section className="w-full max-w-md bg-slate-800/80 backdrop-blur-md rounded-3xl p-6 border border-slate-700/60 shadow-xl mt-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">{data.city}</h2>
          <span className="text-xs font-medium text-blue-400 bg-blue-950/60 border border-blue-800/40 px-2 py-0.5 rounded-full inline-block mt-1">
            {data.country}
          </span>
        </div>
        <div>{getWeatherIcon(data.conditionCode, 'w-12 h-12')}</div>
      </div>

      <div className="my-6">
        <div className="text-5xl font-extrabold text-white tracking-tighter">
          {formatTemp(data.temperature)}
        </div>
        <p className="text-slate-400 text-sm mt-1">{data.condition}</p>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-700/50">
        <div className="flex items-center gap-2 bg-slate-900/50 p-2.5 rounded-2xl border border-slate-800">
          <Thermometer className="w-4 h-4 text-orange-400 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Sensação</span>
            <span className="text-xs font-semibold text-white">{formatTemp(data.feelsLike)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/50 p-2.5 rounded-2xl border border-slate-800">
          <Droplets className="w-4 h-4 text-blue-400 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Umidade</span>
            <span className="text-xs font-semibold text-white">{data.humidity}%</span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/50 p-2.5 rounded-2xl border border-slate-800">
          <Wind className="w-4 h-4 text-teal-400 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Vento</span>
            <span className="text-xs font-semibold text-white">{data.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </section>
  );
}