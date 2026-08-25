import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Weather BFF API',
      version: '1.0.0',
      description: 'Backend for Frontend (BFF) que consome e orquestra dados meteorológicos da Open-Meteo.',
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Servidor Local de Desenvolvimento',
      },
    ],
    components: {
      schemas: {
        HourlyForecast: {
          type: 'object',
          properties: {
            time: { type: 'string', example: '14:00' },
            temp: { type: 'number', example: 28.5 },
            conditionCode: { type: 'integer', example: 0 },
          },
        },
        DailyForecast: {
          type: 'object',
          properties: {
            date: { type: 'string', example: 'Hoje' },
            minTemp: { type: 'number', example: 18.0 },
            maxTemp: { type: 'number', example: 29.5 },
            condition: { type: 'string', example: 'Céu Limpo' },
            conditionCode: { type: 'integer', example: 0 },
          },
        },
        WeatherData: {
          type: 'object',
          properties: {
            city: { type: 'string', example: 'Anápolis' },
            country: { type: 'string', example: 'BR' },
            temperature: { type: 'number', example: 28.5 },
            feelsLike: { type: 'number', example: 29.0 },
            humidity: { type: 'integer', example: 45 },
            windSpeed: { type: 'number', example: 12.4 },
            condition: { type: 'string', example: 'Céu Limpo' },
            conditionCode: { type: 'integer', example: 0 },
            hourly: {
              type: 'array',
              items: { $ref: '#/components/schemas/HourlyForecast' },
            },
            daily: {
              type: 'array',
              items: { $ref: '#/components/schemas/DailyForecast' },
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Cidade "XYZ" não encontrada.' },
          },
        },
      },
    },
  },
  apis: ['./src/routes.ts', './src/app.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);