import mongoose from 'mongoose'

export const connectDatabase = async () => {
  // Tránh tạo kết nối lặp lại trong môi trường Serverless
  if (mongoose.connection.readyState >= 1) return
  try {
    await mongoose.connect(process.env.MONGODB_URL || '')
    console.log('Connect Success!')
  } catch (error) {
    console.log('Connect Error:', error)
  }
}