// const grpc = require('@grpc/grpc-js')
// const protoLoader = require('@grpc/proto-loader')
import * as grpcWeb from 'grpc-web'
// const packageDefinition = protoLoader.loadSync('./proto/bookStore.proto', {})
// const bookStorePackage =
//   grpc.loadPackageDefinition(packageDefinition).bookStorePackage

import { BookClient } from './proto/BookStoreServiceClientPb'

import { BookItem } from 'proto/bookStore_pb'

export const bookService = new BookClient('http://localhost:50051', null, null)

const bookRequest = new BookItem()
bookRequest.setBook('asd')
bookService.createBook(
  bookRequest,
  {},
  (err: grpcWeb.RpcError, response: BookItem) => {
    if (err && err.code !== grpcWeb.StatusCode.OK) {
      console.log('errrr', err)
    } else {
      console.log('qqqqq', response)
    }
  },
)

// const client = new bookStorePackage.Book(
//   'localhost:50051',
//   grpc.credentials.createInsecure(),
// )

// client.createBook({ id: 'ss', book: null }, (err, response) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(`From server`, JSON.stringify(response))
//   }
// })

// client.readBooks(null, (err, response) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(`From server`, JSON.stringify(response))
//   }
// })
