import mongoose from 'mongoose'
import config from 'config'

const dbUrl = `mongodb://${config.get('dbName')}:${config.get(
  'dbPass',
)}@localhost:27017/turboBack?authSource=admin`

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl)
    console.log('dbUrl', dbUrl)
    console.log('Database connected...')
  } catch (error: any) {
    console.log(error.message)
    setTimeout(connectDB, 5000)
  }
}

export default connectDB
