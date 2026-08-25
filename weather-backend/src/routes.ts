import { Router } from 'express';
import { handleGetWeather } from './controllers/weatherController.js';

export const routes = Router();

/**
 * @openapi
 * /api/weather:
 *   get:
 *     summary: Consulta dados climáticos atuais e previsões
 *     description: Retorna o clima atual, sensação térmica, vento, umidade, previsão horária (6h) e previsão diária (5 dias). Permite busca por nome de cidade ou coordenadas geográficas.
 *     tags:
 *       - Weather
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         required: false
 *         description: Nome da cidade pesquisada (ex: Anápolis, Goiânia, Tokyo)
 *       - in: query
 *         name: lat
 *         schema:
 *           type: number
 *         required: false
 *         description: Latitude geográfica (ex: -16.32)
 *       - in: query
 *         name: lon
 *         schema:
 *           type: number
 *         required: false
 *         description: Longitude geográfica (ex: -48.95)
 *     responses:
 *       200:
 *         description: Dados meteorológicos obtidos com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WeatherData'
 *       400:
 *         description: Parâmetros de consulta ausentes ou inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Cidade informada não foi localizada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

routes.get('/weather', handleGetWeather);