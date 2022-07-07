import { v4 as uuidv4 } from 'uuid'
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const PROTO_PATH = 'src/customers.proto'

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
}

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options)

const CustomersService =
  grpc.loadPackageDefinition(packageDefinition).CustomerService

const client = new CustomersService(
  'localhost:50051',
  grpc.credentials.createInsecure(),
)

module.exports = client
