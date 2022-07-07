require('dotenv').config()
import express, { Express, NextFunction, Request, Response } from 'express'
import config from 'config'
import cookieParser from 'cookie-parser'
import connectDB from './utils/connectDB'
import morgan from 'morgan'
import authRouter from './routes/auth.route'
import userRouter from './routes/user.route'
import cors from 'cors'
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
import { v4 as uuidv4 } from 'uuid'

const PROTO_PATH = './customers.proto'

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
  defaults: true,
  oneofs: true,
})

const customersProto = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server()

const customers = [
  {
    id: 'a68b823c-7ca6-44bc-b721-fb4d5312cafc',
    name: 'John Bolton',
    age: 23,
    address: 'Address 1',
  },
  {
    id: '34415c7c-f82d-4e44-88ca-ae2a1aaa92b7',
    name: 'Mary Anne',
    age: 45,
    address: 'Address 2',
  },
]

server.addService(customersProto.CustomerService.service, {
  getAll: (_: any, callback: any) => {
    callback(null, { customers })
  },

  get: (call: any, callback: any) => {
    let customer = customers.find(n => n.id == call.request.id)

    if (customer) {
      callback(null, customer)
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: 'Not found',
      })
    }
  },

  insert: (call: any, callback: any) => {
    let customer = call.request

    customer.id = uuidv4()
    customers.push(customer)
    callback(null, customer)
  },

  update: (call: any, callback: any) => {
    let existingCustomer = customers.find(n => n.id == call.request.id)

    if (existingCustomer) {
      existingCustomer.name = call.request.name
      existingCustomer.age = call.request.age
      existingCustomer.address = call.request.address
      callback(null, existingCustomer)
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: 'Not found',
      })
    }
  },

  remove: (call: any, callback: any) => {
    let existingCustomerIndex = customers.findIndex(
      n => n.id == call.request.id,
    )

    if (existingCustomerIndex != -1) {
      customers.splice(existingCustomerIndex, 1)
      callback(null, {})
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: 'Not found',
      })
    }
  },
})

server.bind('127.0.0.1:30043', grpc.ServerCredentials.createInsecure())
console.log('Server running at http://127.0.0.1:30043')
server.start()

const app: Express = express()

const port = config.get('port') || 8080

// 1. Body Parser
app.use(express.json({ limit: '10kb' }))

// 2. Cookie Parser
app.use(cookieParser())

// 3. Logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

// 4. Cors
app.use(
  cors({
    origin: config.get<string>('origin'),
    credentials: true,
  }),
)

// 5. Routes
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)

// Testing
app.get('/healthChecker', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to TurboSite Server😂😂👈👈',
  })
})

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any
  err.statusCode = 404
  next(err)
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

app.listen(port, () => {
  connectDB()
  console.log(`Server started on port ${port}`)
})
