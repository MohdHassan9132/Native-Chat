import {PrismaClient} from '../generated/prisma/client.js'
import {PrismaPg} from '@prisma/adapter-pg'
const adapter = new PrismaPg({
     connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
    adapter
})

async function connectDB() {
  try {
    await prisma.$connect()
    await prisma.$queryRaw`SELECT 1`  // actually verifies the connection
    console.log('Database connected successfully')
  } catch (error) {
    console.error('Database connection failed:', error)
    process.exit(1) // stop the app if DB is unreachable
  }
}

await connectDB()

export {prisma}