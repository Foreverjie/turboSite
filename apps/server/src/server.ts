import { v4 as uuidv4 } from 'uuid'
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const PROTO_PATH = 'src/news.proto'

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
}
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options)
const newsProto = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server()
let news = [
  { id: '1', title: 'Note 1', body: 'Content 1', postImage: 'Post image 1' },
  { id: '2', title: 'Note 2', body: 'Content 2', postImage: 'Post image 2' },
]

server.addService(newsProto.NewsService.service, {
  getAllNews: (_: any, callback: any) => {
    callback(null, news)
  },
  getNews: (_: any, callback: any) => {
    const newsId = _.request.id
    const newsItem = news.find(({ id }) => newsId == id)
    callback(null, newsItem)
  },
  deleteNews: (_: any, callback: any) => {
    const newsId = _.request.id
    news = news.filter(({ id }) => id !== newsId)
    callback(null, {})
  },
  editNews: (_: any, callback: any) => {
    const newsId = _.request.id
    const newsItem = news.find(({ id }) => newsId == id)
    if (!newsItem) {
      return
    }
    newsItem.body = _.request.body
    newsItem.postImage = _.request.postImage
    newsItem.title = _.request.title
    callback(null, newsItem)
  },
  addNews: (call: any, callback: any) => {
    let _news = { id: Date.now(), ...call.request }
    news.push(_news)
    callback(null, _news)
  },
})

server.bindAsync(
  '127.0.0.1:50051',
  grpc.ServerCredentials.createInsecure(),
  (error: any, port: any) => {
    console.log('Server at port:', port)
    console.log('Server running at http://127.0.0.1:50051')
    server.start()
  },
)
