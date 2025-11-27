import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors';
import config from './config';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import { CategoryRoutes } from './modules/category/category.route';
import { ProductRoutes } from './modules/product/product.route';
import { SliderRoutes } from './modules/slider/slider.route';
import { TeamRoutes } from './modules/team/team.route';

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
app.use('/api/categories', CategoryRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/sliders', SliderRoutes);
app.use('/api/team', TeamRoutes);

// Error Handlers
app.use(notFound);
app.use(globalErrorHandler);

export default app;