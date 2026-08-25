import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { routes } from './routes.js';
import { swaggerSpec } from './config/swagger.js';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', routes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'BFF de Clima operando normalmente' });
});