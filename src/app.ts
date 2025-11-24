import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors';
import config from './config';

const app: Application = express();

// Middlewares
app.use(
  cors({
    origin: config.cors_origin,
    credentials: true,
  }),
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
if (config.node_env === 'development') {
  app.use(morgan('dev'));
}

// Health check route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'E-commerce API is running 🚀',
  });
});

// API Routes
// TODO: Add module routes here
// app.use('/api/products', productRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/sliders', sliderRoutes);

export default app;