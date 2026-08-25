import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { getWeatherData, getWeatherDataByCoords } from './weatherService.js';
import { weatherCache } from '../config/cache.js';

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

describe('WeatherService', () => {
  beforeEach(() => {
    weatherCache.flushAll(); 
    vi.clearAllMocks();
  });

  const mockForecastApiResponse = {
    data: {
      current: {
        temperature_2m: 28.5,
        apparent_temperature: 29.0,
        relative_humidity_2m: 50,
        wind_speed_10m: 12,
        weather_code: 0,
      },
      hourly: {
        time: [
          new Date(Date.now() + 3600000).toISOString(),
          new Date(Date.now() + 7200000).toISOString(),
        ],
        temperature_2m: [28.0, 27.5],
        weather_code: [0, 1],
      },
      daily: {
        time: ['2026-08-21', '2026-08-22'],
        temperature_2m_max: [30.0, 31.0],
        temperature_2m_min: [18.0, 19.0],
        weather_code: [0, 2],
      },
    },
  };

  it('deve buscar dados climáticos por nome de cidade com sucesso e salvar em cache', async () => {
    
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        results: [
          {
            id: 1,
            name: 'Anápolis',
            latitude: -16.32,
            longitude: -48.95,
            country_code: 'br',
          },
        ],
      },
    });

    mockedAxios.get.mockResolvedValueOnce(mockForecastApiResponse);

    const result = await getWeatherData('Anápolis');

    expect(result.city).toBe('Anápolis');
    expect(result.country).toBe('BR');
    expect(result.temperature).toBe(28.5);
    expect(result.condition).toBe('Céu Limpo');
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);

    const cached = weatherCache.get('weather:city:anápolis');
    expect(cached).toBeDefined();
  });

  it('deve retornar dados do cache sem fazer chamadas HTTP adicionais (Cache Hit)', async () => {
    
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        results: [{ id: 1, name: 'Goiânia', latitude: -16.68, longitude: -49.26, country_code: 'br' }],
      },
    });
    mockedAxios.get.mockResolvedValueOnce(mockForecastApiResponse);

    await getWeatherData('Goiânia');
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);

    const cachedResult = await getWeatherData('Goiânia');

    expect(cachedResult.city).toBe('Goiânia');
    expect(mockedAxios.get).toHaveBeenCalledTimes(2); 
  });

  it('deve lançar erro quando a cidade não for encontrada na geocodificação', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        results: [],
      },
    });

    await expect(getWeatherData('CidadeInexistenteXYZ')).rejects.toThrow(
      'Cidade "CidadeInexistenteXYZ" não encontrada.'
    );
  });

  it('deve buscar dados climáticos diretamente por coordenadas (GPS)', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockForecastApiResponse);

    const result = await getWeatherDataByCoords(-16.32, -48.95);

    expect(result.city).toBe('Sua Localização');
    expect(result.country).toBe('GPS');
    expect(result.temperature).toBe(28.5);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1); 
  });
});