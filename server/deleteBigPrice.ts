import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function run() {
  const deleted = await prisma.product.deleteMany({
    where: {
      price: {
        gt: 2147483647 // bigger than max Prisma Int (2^31 - 1)
      }
    }
  })

  console.log(`Deleted ${deleted.count} products with BIGINT price.`)
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
