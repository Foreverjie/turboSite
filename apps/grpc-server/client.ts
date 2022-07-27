const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const packageDefinition = protoLoader.loadSync('./proto/bookStore.proto', {})
const bookStorePackage =
  grpc.loadPackageDefinition(packageDefinition).bookStorePackage

const client = new bookStorePackage.Book(
  'localhost:50051',
  grpc.credentials.createInsecure(),
)

client.createBook({ id: 'ss', book: null }, (err, response) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`From server`, JSON.stringify(response))
  }
})

// client.readBook({ id: 1 }, (err, response) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(`From server`, JSON.stringify(response))
//   }
// })

client.readBooks(null, (err, response) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`From server`, JSON.stringify(response))
  }
})
