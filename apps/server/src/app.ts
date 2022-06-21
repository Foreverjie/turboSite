require('dotenv').config();
import express, {Express, NextFunction, Request, Response } from 'express';
import config from 'config';
import cookieParser from 'cookie-parser';
import connectDB from './utils/connectDB';

const app: Express = express();

const port = config.get('port') || 8080;

// 1. Body Parser
app.use(express.json({ limit: '10kb' }));

// 2. Cookie Parser
app.use(cookieParser());

// Testing
app.get('/healthChecker', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to TurboSite Server😂😂👈👈',
  });
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});


app.listen(port, () => {
  connectDB();
  console.log(`Server started on port ${port}`);
});