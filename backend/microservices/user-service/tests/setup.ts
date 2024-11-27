import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

beforeAll(async () => {
  // Clean up database before tests
  await prisma.$connect()
  await prisma.user.deleteMany()
})

afterAll(async () => {
  await prisma.user.deleteMany()
  await prisma.$disconnect()
})