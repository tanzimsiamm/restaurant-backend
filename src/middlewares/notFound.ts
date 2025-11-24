import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const notFound = (req: Request, res: Response): void => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'API Route Not Found',
    error: `Cannot ${req.method} ${req.originalUrl}`,
  });
};

export default notFound;