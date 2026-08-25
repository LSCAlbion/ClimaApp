import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { SearchHistory } from './components/SearchHistory';
import { CurrentWeather } from './components/CurrentWeather';
import { HourlyForecast } from './components/HourlyForecast';
import { DailyForecast } from './components/DailyForecast';
import { WeatherSkeleton } from './components/WeatherSkeleton';
import { ErrorMessage } from './components/ErrorMessage';
import { UnitToggle } from './components/UnitToggle';
import { UnitProvider } from './contexts/UnitContext';
import { fetchWeatherByCity, fetchWeatherByCoords } from './services/weatherService';
import type { WeatherData } from './types/weather';

const STORAGE_KEY = '@climaApp:history';

function WeatherAppContent() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const saveToHistory = (cityName: string) => {
    setHistory((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== cityName.toLowerCase());
      const updated = [cityName, ...filtered].slice(0, 5);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  };

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const data = await fetchWeatherByCity(city);
      setWeather(data);
      saveToHistory(data.city);
    } catch (err) {
      setWeather(null);
      setErrorMessage(err instanceof Error ? err.message : 'Erro ao buscar dados.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) return;

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await fetchWeatherByCoords(latitude, longitude);
          setWeather(data);
        } catch (err) {
          console.warn('Não foi possível carregar clima via GPS:', err);
        } finally {
          setIsLoading(false);
        }
      },
      (geoError) => {
        console.info('Permissão de geolocalização não concedida:', geoError.message);
        setIsLoading(false);
      },
      { timeout: 7000, enableHighAccuracy: false }
    );
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-start p-6 pt-12 pb-16">
      <header className="w-full max-w-md flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Previsão do Tempo</h1>
          <p className="text-slate-400 text-xs">Condições climáticas em tempo real</p>
        </div>
        <UnitToggle />
      </header>

      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

      <SearchHistory
        history={history}
        onSelectCity={handleSearch}
        onClearHistory={handleClearHistory}
      />

      {isLoading && <WeatherSkeleton />}

      {!isLoading && errorMessage && <ErrorMessage message={errorMessage} />}

      {!isLoading && !errorMessage && weather && (
        <>
          <CurrentWeather data={weather} />
          <HourlyForecast items={weather.hourly} />
          <DailyForecast items={weather.daily} />
        </>
      )}

      {!isLoading && !errorMessage && !weather && (
        <p className="mt-12 text-slate-500 text-sm">
          Digite o nome de uma cidade acima para visualizar a previsão.
        </p>
      )}
    </main>
  );
}

export default function App() {
  return (
    <UnitProvider>
      <WeatherAppContent />
    </UnitProvider>
  );
}