const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const packageDefinition = protoLoader.loadSync('./proto/bookStore.proto', {})
const bookStorePackage =
  grpc.loadPackageDefinition(packageDefinition).bookStorePackage

// Create a server
const server = new grpc.Server()

// Add the service
server.addService(bookStorePackage.Book.service, {
  createBook: createBook,
  readBook: readBook,
  readBooks: readBooks,
})

server.bindAsync(
  '0.0.0.0:50051',
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log('Server running at http://127.0.0.1:50051')
    server.start()
  },
) // our sever is insecure, no ssl configuration

// Uhm, this is going to mirror our database, but we can change it to use an actual database.
const books = []

function createBook(call, callback) {
  const book = call.request.book
  const bookObject = {
    id: books.length + 1,
    book: book,
  }
  books.push(bookObject)
  callback(null, bookObject)
}

function readBook(call, callback) {
  const id = call.request.id
  const book = books.find(book => book.id === id)
  callback(null, book)
}

function readBooks(call, callback) {
  callback(null, { books: books })
}
