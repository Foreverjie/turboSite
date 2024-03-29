import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import * as trpcExpress from '@trpc/server/adapters/express'
import appRouter from './routes/router'
import config from 'config'
import morgan from 'morgan'
import { createContext } from './context'
import { createOpenApiExpressMiddleware } from 'trpc-openapi'
import { openApiDocument } from './openapi'
import swaggerUi from 'swagger-ui-express'

const app: Application = express()

// Body Parser
app.use(express.json({ limit: '10kb' }))
// Logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

app.use(
  cors({
    origin: config.get<string>('origin'),
    credentials: true,
  }),
)

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
)

app.use(
  '/api',
  createOpenApiExpressMiddleware({ router: appRouter, createContext }),
)

app.use('/', swaggerUi.serve)
app.get('/', swaggerUi.setup(openApiDocument))

// Testing
app.get('/healthChecker', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to TurboSite Server😂😂👈👈',
  })
})
// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 'error'
  err.statusCode = err.statusCode || 500

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  })
})

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any
  err.statusCode = 404
  next(err)
})

app.listen(9797, () => {
  console.log('Server running on port 9797')
})
