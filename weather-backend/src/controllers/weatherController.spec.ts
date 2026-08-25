import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import axios from 'axios';
import { app } from '../app.js';
import { weatherCache } from '../config/cache.js';

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

describe('GET /api/weather (Integration)', () => {
  beforeEach(() => {
    weatherCache.flushAll();
    vi.clearAllMocks();
  });

  const mockForecastApiResponse = {
    data: {
      current: {
        temperature_2m: 25.0,
        apparent_temperature: 26.0,
        relative_humidity_2m: 60,
        wind_speed_10m: 10,
        weather_code: 1,
      },
      hourly: {
        time: [
          new Date(Date.now() + 3600000).toISOString(),
          new Date(Date.now() + 7200000).toISOString(),
        ],
        temperature_2m: [24.0, 23.0],
        weather_code: [1, 2],
      },
      daily: {
        time: ['2026-08-21', '2026-08-22'],
        temperature_2m_max: [27.0, 28.0],
        temperature_2m_min: [17.0, 18.0],
        weather_code: [1, 2],
      },
    },
  };

  it('deve retornar status 200 e payload completo ao buscar por cidade', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        results: [{ id: 1, name: 'Anápolis', latitude: -16.32, longitude: -48.95, country_code: 'br' }],
      },
    });
    mockedAxios.get.mockResolvedValueOnce(mockForecastApiResponse);

    const response = await request(app).get('/api/weather?city=Anápolis');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('city', 'Anápolis');
    expect(response.body).toHaveProperty('temperature', 25.0);
    expect(response.body.hourly).toHaveLength(2);
    expect(response.body.daily).toHaveLength(2);
  });

  it('deve retornar status 200 ao buscar por coordenadas de geolocalização', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockForecastApiResponse);

    const response = await request(app).get('/api/weather?lat=-16.32&lon=-48.95');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('city', 'Sua Localização');
    expect(response.body).toHaveProperty('country', 'GPS');
    expect(response.body).toHaveProperty('humidity', 60);
  });

  it('deve retornar status 400 se nenhum parâmetro for fornecido', async () => {
    const response = await request(app).get('/api/weather');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      'error',
      'Envie o parâmetro "city" ou as coordenadas "lat" e "lon".'
    );
  });

  it('deve retornar status 400 se as coordenadas forem valores inválidos (NaN)', async () => {
    const response = await request(app).get('/api/weather?lat=abc&lon=def');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      'error',
      'Latitude e Longitude devem ser valores numéricos válidos.'
    );
  });

  it('deve retornar status 404 quando a cidade não existir', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { results: [] },
    });

    const response = await request(app).get('/api/weather?city=CidadeFantasma123');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      'error',
      'Cidade "CidadeFantasma123" não encontrada.'
    );
  });

  it('deve responder status 200 no health check', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'ok',
      message: 'BFF de Clima operando normalmente',
    });
  });
});