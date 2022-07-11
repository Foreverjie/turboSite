import express, { Application } from 'express'
import cors from 'cors'
import * as trpcExpress from '@trpc/server/adapters/express'
import appRouter from './router'
// import { createContext } from './context'

const app: Application = express()

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return { req, res, isFromExpress: true }
}

app.use(express.json())
app.use(cors())
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
)

app.listen(8080, () => {
  console.log('Server running on port 8080')
})
